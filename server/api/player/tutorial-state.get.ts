import { defineEventHandler, createError } from 'h3'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
import type { Database } from '../../../types/database.types'
import type { TutorialStateResponse } from '../../../types/tutorial'

/**
 * Get tutorial completion state for the current user
 */
export default defineEventHandler(async (event): Promise<TutorialStateResponse> => {
    const user = await serverSupabaseUser(event)
    const client = await serverSupabaseClient<Database>(event)

    if (!user) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    // Fetch all tutorial states for this user
    const { data: states, error } = await client
        .from('tutorial_state')
        .select('*')
        .eq('user_id', user.id)
        .order('page_id')

    if (error) {
        console.error('Error fetching tutorial state:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to fetch tutorial state'
        })
    }

    // If no states exist, initialize them
    if (!states || states.length === 0) {
        const { error: initError } = await client
            .rpc('initialize_tutorial_state', { p_user_id: user.id })

        if (initError) {
            console.error('Error initializing tutorial state:', initError)
            throw createError({
                statusCode: 500,
                statusMessage: 'Failed to initialize tutorial state'
            })
        }

        // Fetch again after initialization
        const { data: newStates } = await client
            .from('tutorial_state')
            .select('*')
            .eq('user_id', user.id)
            .order('page_id')

        return { states: newStates || [] }
    }

    return { states }
})
