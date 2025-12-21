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

    // Fetch Assets
    const { data: assetsData, error } = await client
        .from('assets')
        .select('*')
        .eq('owner_id', user.id) as { data: AssetRow[] | null, error: any }

    if (error) throw createError({ statusCode: 500, statusMessage: error.message })

    if (!assetsData || assetsData.length === 0) {
        return { assets: [] }
    }

    // Helper: Bulk fetch company info for stocks
    const stockAssets = assetsData.filter((a) => a.type === AssetType.Stock && a.company_id)
    const companyIds = stockAssets.map((a) => a.company_id as string).filter(Boolean)
    let companyMap: Record<string, CompanyRow> = {}

    if (companyIds.length > 0) {
        const { data: companies } = await client
            .from('companies')
            .select('*')
            .in('id', companyIds) as { data: CompanyRow[] | null }

        if (companies) {
            companies.forEach((c) => companyMap[c.id] = c)
        }
    }

    // Map DB entities to GameAsset types
    const compiledAssets: GameAsset[] = assetsData.map((asset) => {
        const props = (asset.properties as Record<string, any>) || {}

        // Base mapping
        const base = {
            id: asset.id,
            ownerId: asset.owner_id || '',
            type: asset.type as AssetType,
            name: asset.name || 'Unknown',
            acquiredAt: asset.acquired_at || new Date().toISOString(),
            baseValue: Number(asset.base_value || 0),
            currentValue: Number(asset.current_value || asset.base_value || 0)
        }

        // Type specific overrides
        if (asset.type === AssetType.Stock && asset.company_id) {
            const company = companyMap[asset.company_id]
            const shares = Number(asset.shares || asset.count || 0)
            const currentPrice = company ? Number(company.share_price || 0) : (base.currentValue / (shares || 1))

            return {
                ...base,
                type: AssetType.Stock as const,
                name: company ? company.name : base.name,
                ticker: company ? company.ticker : (asset.id.split('_')[0] || '???'),
                shares: shares,
                currentValue: shares * currentPrice,
                costBasisPerShare: Number(asset.cost_basis_per_share) || (base.baseValue / (shares || 1))
            }
        } else if (asset.type === AssetType.RealEstate) {
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

        return base as GameAsset
    })

    return { assets: compiledAssets }
})
