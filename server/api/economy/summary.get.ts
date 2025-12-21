import { defineEventHandler, createError } from 'h3'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
import type { EconomySummaryResponse, FinancialState, AssetValuation } from '../../../types/economy'
import type { Database } from '../../../types/database.types'

type AssetRow = Database['public']['Tables']['assets']['Row']
type LoanRow = Database['public']['Tables']['loans']['Row']
type CompanyRow = Database['public']['Tables']['companies']['Row']
type PlayerStatsRow = Database['public']['Tables']['player_stats']['Row']

export default defineEventHandler(async (event): Promise<EconomySummaryResponse> => {
    const user = await serverSupabaseUser(event)
    const client = await serverSupabaseClient<Database>(event)

    if (!user) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    // 1. Fetch Cash from player_stats
    const { data: stats } = await (client.from('player_stats') as any)
        .select('cash')
        .eq('user_id', user.id)
        .single() as { data: Pick<PlayerStatsRow, 'cash'> | null }

    const cash = stats?.cash || 0

    // 2. Fetch Assets
    const { data: assets } = await (client.from('assets') as any)
        .select('*')
        .eq('owner_id', user.id) as { data: AssetRow[] | null }

    let totalAssetValue = 0
    let liquidStockValue = 0
    const assetValuations: AssetValuation[] = []

    if (assets && assets.length > 0) {
        // Identify stock assets
        const stockAssets = assets.filter((a) => a.type === 'stock' && a.company_id)
        const companyIds = stockAssets.map((a) => a.company_id as string).filter(Boolean)

        let companyMap: Record<string, CompanyRow> = {}
        if (companyIds.length > 0) {
            const { data: companies } = await (client.from('companies') as any)
                .select('*')
                .in('id', companyIds) as { data: CompanyRow[] | null }

            if (companies) {
                companies.forEach((c) => companyMap[c.id] = c)
            }
        }

        for (const asset of assets) {
            let currentValue = asset.current_value || asset.base_value || 0

            // Recalculate if it's a stock with a linked company
            if (asset.type === 'stock' && asset.company_id && companyMap[asset.company_id]) {
                currentValue = (asset.shares || 0) * (companyMap[asset.company_id].share_price || 0)
            }

            totalAssetValue += currentValue

            if (asset.type === 'stock') {
                liquidStockValue += currentValue
            }

            assetValuations.push({
                assetId: asset.id,
                name: asset.name || 'Unknown Asset',
                currentValue,
                ltv: 0.5, // Default LTV
                maxLoanable: currentValue * 0.5
            })
        }
    }

    // 3. Fetch Debt (Loans)
    const { data: loans } = await (client.from('loans') as any)
        .select('*')
        .eq('borrower_id', user.id) as { data: LoanRow[] | null }

    let totalPrincipal = 0

    if (loans) {
        totalPrincipal = loans.reduce((sum: number, loan) => sum + (loan.remaining_principal || 0), 0)
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
