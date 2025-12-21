import { defineEventHandler, createError } from 'h3'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
import { AssetType, type GameAsset } from '../../../types/assets'

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event)
    const client = await serverSupabaseClient(event)

    if (!user) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

    // Fetch Assets
    // We assume 'assets' table exists with flexible columns or JSONB 'properties'
    const { data: assetsData, error } = await client
        .from('assets')
        .select('*')
        .eq('owner_id', user.id)

    if (error) throw createError({ statusCode: 500, statusMessage: error.message })

    if (!assetsData || assetsData.length === 0) {
        return { assets: [] }
    }

    // Helper: Bulk fetch company info for stocks
    const stockAssets = assetsData.filter((a: any) => a.type === AssetType.Stock && a.company_id)
    const companyIds = stockAssets.map((a: any) => a.company_id)
    let companyMap: Record<string, any> = {}

    if (companyIds.length > 0) {
        const { data: companies } = await client
            .from('companies')
            .select('id, ticker, share_price, name')
            .in('id', companyIds)

        if (companies) {
            companies.forEach((c: any) => companyMap[c.id] = c)
        }
    }

    // Map DB entities to GameAsset types
    const compiledAssets: GameAsset[] = assetsData.map((asset: any) => {
        const props = asset.properties || {} // specific type properties often stored in JSONB

        // Base mapping
        const base = {
            id: asset.id,
            ownerId: asset.owner_id,
            type: asset.type as AssetType,
            name: asset.name || 'Unknown',
            acquiredAt: asset.acquired_at || new Date().toISOString(),
            baseValue: Number(asset.base_value || 0),
            currentValue: Number(asset.current_value || asset.base_value || 0)
        }

        // Type specific overrides
        if (asset.type === AssetType.Stock) {
            const company = companyMap[asset.company_id]
            const shares = Number(asset.shares || asset.count || 0)
            const currentPrice = company ? Number(company.share_price) : (base.currentValue / (shares || 1))

            return {
                ...base,
                type: AssetType.Stock,
                name: company ? company.name : base.name,
                ticker: company ? company.ticker : (asset.ticker || '???'),
                shares: shares,
                currentValue: shares * currentPrice,
                costBasisPerShare: Number(asset.cost_basis_per_share) || (base.baseValue / (shares || 1))
            }
        } else if (asset.type === AssetType.RealEstate) {
            return {
                ...base,
                type: AssetType.RealEstate,
                location: props.location || asset.location || 'Unknown',
                condition: Number(props.condition ?? asset.condition ?? 100),
                isRenovating: Boolean(props.is_renovating ?? asset.is_renovating ?? false)
            }
        } else if (asset.type === AssetType.Business) {
            return {
                ...base,
                type: AssetType.Business,
                sector: props.sector || asset.sector || 'Generic',
                level: Number(props.level ?? asset.level ?? 1),
                employees: Number(props.employees ?? asset.employees ?? 0),
                revenuePerQuarter: Number(props.revenue_per_quarter ?? 0),
                expensePerQuarter: Number(props.expense_per_quarter ?? 0)
            }
        }

        return base as GameAsset
    })

    return { assets: compiledAssets }
})
