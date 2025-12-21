import { defineEventHandler, createError } from 'h3'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
import type { EconomySummaryResponse, FinancialState, AssetValuation } from '../../../types/economy'

import type { Database } from '../../../types/database.types'

export default defineEventHandler(async (event): Promise<EconomySummaryResponse> => {
    const user = await serverSupabaseUser(event)
    const client = await serverSupabaseClient<Database>(event)

    if (!user) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    // 1. Fetch Cash from player_stats
    const { data: stats } = await client
        .from('player_stats')
        .select('cash')
        .eq('user_id', user.id)
        .single() as { data: { cash: number } | null }

    const cash = stats?.cash || 0

    // 2. Fetch Assets
    const { data: assets } = await client
        .from('assets')
        .select('*')
        .eq('owner_id', user.id)

    let totalAssetValue = 0
    let liquidStockValue = 0
    const assetValuations: AssetValuation[] = []

    if (assets && assets.length > 0) {
        // Optimization: For stocks, we might need real-time price from 'companies' table.
        // Identify stock assets
        const stockAssets = assets.filter((a: any) => a.type === 'stock' && a.company_id)
        const companyIds = stockAssets.map((a: any) => a.company_id)

        let companyMap: Record<string, any> = {}
        if (companyIds.length > 0) {
            const { data: companies } = await client
                .from('companies')
                .select('id, share_price')
                .in('id', companyIds)

            if (companies) {
                companies.forEach((c: any) => companyMap[c.id] = c)
            }
        }

        for (const asset of (assets as any[])) {
            let currentValue = asset.current_value || asset.base_value || 0

            // Recalculate if it's a stock with a linked company
            if (asset.type === 'stock' && asset.company_id && companyMap[asset.company_id]) {
                currentValue = (asset.shares || 0) * companyMap[asset.company_id].share_price
            }

            totalAssetValue += currentValue

            if (asset.type === 'stock') {
                liquidStockValue += currentValue
            }

            assetValuations.push({
                assetId: asset.id,
                name: asset.name || asset.ticker || 'Unknown Asset',
                currentValue,
                ltv: asset.ltv || 0.5,
                maxLoanable: currentValue * (asset.ltv || 0.5)
            })
        }
    }

    // 3. Fetch Debt (Loans)
    const { data: loans } = await client
        .from('loans' as any)
        .select('*')
        .eq('borrower_id', user.id)

    let totalPrincipal = 0

    if (loans) {
        totalPrincipal = loans.reduce((sum: number, loan: any) => sum + (loan.remaining_principal || 0), 0)
    }

    // Construct State
    const state: FinancialState = {
        netWorth: cash + totalAssetValue - totalPrincipal,
        liquidity: {
            cash,
            liquidStockValue,
            liquidationPenalty: liquidStockValue * 0.01 // Assume 1% slippage/fees
        },
        debt: {
            totalPrincipal,
            dailyInterestRate: 0, // Would need weighted average calculation
            nextPaymentDue: new Date(Date.now() + 86400000 * 7).toISOString() // Placeholder mechanism for now
        },
        assets: assetValuations
    }

    return {
        tick: Date.now(),
        date: new Date().toISOString().split('T')[0],
        state
    }
})
