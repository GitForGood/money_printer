import { defineEventHandler, readBody, createError } from 'h3'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
import type { ActionType, ActionRequirement } from '../../../types/actions'

interface PerformActionBody {
    actionId: string;
    type: ActionType;
    targetId?: string;
}

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event)
    const client = await serverSupabaseClient(event)
    const body = await readBody<PerformActionBody>(event)

    if (!user) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    if (!body || !body.actionId) throw createError({ statusCode: 400, statusMessage: 'Missing actionId' })

    // 1. Fetch Action Definition
    const { data: actionDef, error: actionError } = await client
        .from('game_actions')
        .select('*')
        .eq('id', body.actionId)
        .single()

    if (actionError || !actionDef) {
        // Fallback or error
        throw createError({ statusCode: 404, statusMessage: 'Action definition not found' })
    }

    // 2. Fetch Player Stats for resource checks
    const { data: stats, error: statsError } = await client
        .from('player_stats')
        .select('*')
        .eq('user_id', user.id)
        .single()

    if (statsError || !stats) {
        throw createError({ statusCode: 500, statusMessage: 'Failed to retrieve player stats' })
    }

    // 3. Verify Requirements & Calculate Costs
    const requirements: ActionRequirement[] = actionDef.requirements || [] // JSONB
    const updates: Record<string, number> = {}
    const changes: any[] = []

    for (const req of requirements) {
        const currentVal = stats[req.resource] ?? 0

        // Min check
        if (req.min !== undefined && currentVal < req.min) {
            throw createError({ statusCode: 400, statusMessage: `Insufficient ${req.resource} (Required: ${req.min})` })
        }

        // Cost deduction
        if (req.cost) {
            if (currentVal < req.cost) {
                throw createError({ statusCode: 400, statusMessage: `Not enough ${req.resource} to pay cost` })
            }
            // Track update
            const newVal = currentVal - req.cost
            updates[req.resource] = newVal // Assumes 'stats' object has keys matching 'resource'

            // Should verify that updates[req.resource] is not overwritten by multiple reqs?
            // Simple accumulation logic:
            if (req.resource in updates) {
                // If we already touched it, use the dirty value
                updates[req.resource] -= req.cost
                if (updates[req.resource] < 0) throw createError({ statusCode: 400, statusMessage: 'Cost exceeds balance' })
            } else {
                updates[req.resource] = currentVal - req.cost
            }

            changes.push({ path: `player.${req.resource}`, value: -req.cost, operation: 'add' })
        }
    }

    // 4. Execute Mechanics (Success roll, Effects)
    let success = true
    let message = 'Action performed successfully'

    if (actionDef.base_success_rate !== undefined) {
        if (Math.random() > actionDef.base_success_rate) {
            success = false
            message = 'Action failed'
            // Keep costs? Usually yes.
        }
    }

    // TODO: Implement specific effects (e.g. modify target)

    // 5. Commit Resource Deductions
    if (Object.keys(updates).length > 0) {
        const { error: updateError } = await client
            .from('player_stats')
            .update(updates)
            .eq('user_id', user.id)

        if (updateError) {
            throw createError({ statusCode: 500, statusMessage: updateError.message })
        }
    }

    return {
        success,
        message,
        changes
    }
})
