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

    // 1. Fetch Cash and Stats from player_stats
    const { data: statsRow } = await client
        .from('player_stats')
        .select('*')
        .eq('user_id', user.id)
        .single() as any as { data: PlayerStatsRow | null }

    const cash = statsRow?.cash || 0

    // 2. Fetch Assets
    const { data: assets } = await (client.from('assets') as any)
        .select('*')
        .eq('owner_id', user.id) as { data: AssetRow[] | null }

    let totalAssetValue = 0
    let liquidStockValue = 0
    const assetValuations: AssetValuation[] = []
    let companyMap: Record<string, CompanyRow> = {}

    if (assets && assets.length > 0) {
        // Identify stock assets
        const stockAssets = assets.filter((a) => a.type === 'stock' && a.company_id)
        const companyIds = stockAssets.map((a) => a.company_id as string).filter(Boolean)

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
    let qtrIncome = 0
    let qtrExpense = 0

    // 4. Calculate Income/Expenses from Assets
    if (assets) {
        for (const asset of assets) {
            if (asset.type === 'stock' && asset.company_id && companyMap[asset.company_id]) {
                const company = companyMap[asset.company_id]
                qtrIncome += (asset.shares || 0) * (company.dividend_yield || 0) * (company.share_price || 0)
            } else if (asset.type === 'business') {
                const props = (asset.properties as Record<string, any>) || {}
                qtrIncome += Number(props.revenue_per_quarter || 0)
                qtrExpense += Number(props.expense_per_quarter || 0)
            }
        }
    }

    // 5. Calculate Expenses from Loans
    if (loans) {
        for (const loan of loans) {
            // Assuming 90 days per quarter for interest calculation
            qtrExpense += (loan.remaining_principal || 0) * (loan.interest_rate_daily || 0) * 90
        }
    }

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
        assets: assetValuations,
        stats: statsRow ? {
            heat: statsRow.heat,
            karma: statsRow.karma,
            reputation: statsRow.reputation,
            insiderLevel: statsRow.insider_level,
            apInstant: statsRow.ap_instant,
            maxApInstant: statsRow.max_ap_instant,
            apQuarterly: statsRow.ap_quarterly,
            maxApQuarterly: statsRow.max_ap_quarterly,
            apLongTerm: statsRow.ap_long_term,
            maxApLongTerm: statsRow.max_ap_long_term
        } : undefined,
        qtrIncome,
        qtrExpense
    }

    return {
        tick: Date.now(),
        date: new Date().toISOString().split('T')[0],
        state
    }
})
