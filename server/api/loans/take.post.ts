import { defineEventHandler, readBody, createError } from 'h3'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
import type { Database } from '../../../types/database.types'

type AssetRow = Database['public']['Tables']['assets']['Row']
type LoanRow = Database['public']['Tables']['loans']['Row']
type PlayerStatsRow = Database['public']['Tables']['player_stats']['Row']

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event)
    const client = await serverSupabaseClient<Database>(event)

    if (!user) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    const body = await readBody(event)
    const { lenderName, principal, interestRateDaily, termDays, collateralAssetId } = body

    if (!principal || !lenderName || interestRateDaily === undefined) {
        throw createError({ statusCode: 400, statusMessage: 'Missing loan details' })
    }

    // 1. Verify Collateral (if provided)
    if (collateralAssetId) {
        const { data: asset, error: assetError } = await (client.from('assets') as any)
            .select('*')
            .eq('id', collateralAssetId)
            .eq('owner_id', user.id)
            .maybeSingle() as { data: AssetRow | null, error: any }

        if (assetError || !asset) {
            throw createError({ statusCode: 400, statusMessage: 'Invalid or unauthorized collateral asset' })
        }

        // LTV Check (Simple: principal <= assetValue * 0.7)
        const assetValue = Number(asset.current_value || asset.base_value || 0)
        if (principal > assetValue * 0.8) { // 80% Max LTV for now
            throw createError({ statusCode: 400, statusMessage: 'Principal exceeds max LTV for collateral' })
        }
    }

    // 2. Add Cash to Player
    const { data: stats, error: statsError } = await (client.from('player_stats') as any)
        .select('cash')
        .eq('user_id', user.id)
        .maybeSingle() as { data: Pick<PlayerStatsRow, 'cash'> | null, error: any }

    if (statsError || !stats) throw createError({ statusCode: 500, statusMessage: 'Failed to fetch player stats' })
    const currentCash = stats?.cash || 0

    await (client.from('player_stats') as any)
        .update({ cash: currentCash + Number(principal) })
        .eq('user_id', user.id)

    // 3. Create Loan Record
    const { data: loan, error: loanError } = await (client.from('loans') as any)
        .insert({
            borrower_id: user.id,
            lender_name: lenderName,
            principal: Number(principal),
            remaining_principal: Number(principal),
            interest_rate_daily: Number(interestRateDaily),
            term_days: termDays || -1,
            collateral_asset_id: collateralAssetId
        })
        .select()
        .single() as { data: LoanRow | null, error: any }

    if (loanError) throw createError({ statusCode: 500, statusMessage: 'Failed to create loan record' })

    return {
        success: true,
        loan
    }
})
