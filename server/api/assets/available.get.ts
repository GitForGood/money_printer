import { defineEventHandler, createError } from 'h3'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
import { AssetType, type GameAsset } from '../../../types/assets'
import type { Database } from '../../../types/database.types'

type AssetRow = Database['public']['Tables']['assets']['Row']
type CompanyRow = Database['public']['Tables']['companies']['Row']

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event)
    const client = await serverSupabaseClient<Database>(event)

    if (!user) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

    // 1. Fetch all companies for the stock market
    const { data: companies, error: companiesError } = await client
        .from('companies')
        .select('*')
        .order('ticker') as any as { data: CompanyRow[] | null, error: any }

    if (companiesError) throw createError({ statusCode: 500, statusMessage: companiesError.message })

    // 2. Fetch available non-stock assets (Real Estate, Business)
    const { data: availableAssets, error: assetsError } = await client
        .from('assets')
        .select('*')
        .is('owner_id', null)
        .neq('type', 'stock') as any as { data: AssetRow[] | null, error: any }

    if (assetsError) throw createError({ statusCode: 500, statusMessage: assetsError.message })

    // 3. Fetch user's current stock positions to calculate ownership %
    const { data: userStocks } = await client
        .from('assets')
        .select('company_id, shares')
        .eq('owner_id', user.id)
        .eq('type', 'stock') as any as { data: Pick<AssetRow, 'company_id' | 'shares'>[] | null }

    const userStockMap: Record<string, number> = {}
    if (userStocks) {
        userStocks.forEach(s => {
            if (s.company_id) {
                userStockMap[s.company_id] = (userStockMap[s.company_id] || 0) + Number(s.shares || 0)
            }
        })
    }

    // 4. Format everything
    const listings = {
        stocks: companies?.map(c => ({
            ...c,
            share_price: Number(c.share_price),
            prev_share_price: Number(c.prev_share_price || c.share_price),
            owned_shares: userStockMap[c.id] || 0,
            ownership_percent: ((userStockMap[c.id] || 0) / Number(c.total_shares || 1)) * 100
        })),
        assets: availableAssets?.map(asset => {
            const props = (asset.properties as Record<string, any>) || {}
            const base = {
                id: asset.id,
                ownerId: '',
                type: asset.type as AssetType,
                name: asset.name || 'Unknown',
                acquiredAt: asset.acquired_at || new Date().toISOString(),
                baseValue: Number(asset.base_value || 0),
                currentValue: Number(asset.current_value || asset.base_value || 0)
            }

            if (asset.type === AssetType.RealEstate) {
                return {
                    ...base,
                    type: AssetType.RealEstate as const,
                    location: (props.location as string) || asset.location || 'Unknown',
                    condition: Number(props.condition ?? 100),
                    isRenovating: Boolean(props.is_renovating ?? false)
                }
            } else if (asset.type === AssetType.Business) {
                return {
                    ...base,
                    type: AssetType.Business as const,
                    sector: (props.sector as string) || 'Generic',
                    level: Number(props.level ?? 1),
                    employees: Number(props.employees ?? 0),
                    revenuePerQuarter: Number(props.revenue_per_quarter ?? 0),
                    expensePerQuarter: Number(props.expense_per_quarter ?? 0)
                }
            }
            return base
        })
    }

    return listings
})
