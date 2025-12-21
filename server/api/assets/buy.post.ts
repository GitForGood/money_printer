import { defineEventHandler, readBody, createError } from 'h3'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
import type { Database } from '../../../types/database.types'

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event)
    const client = await serverSupabaseClient<Database>(event)

    if (!user) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    const body = await readBody(event)
    const { assetType, companyId, shares, amount } = body

    if (!assetType) {
        throw createError({ statusCode: 400, statusMessage: 'Missing assetType' })
    }

    // 1. Fetch Player Balance
    const { data: stats, error: statsError } = await (client.from('player_stats') as any)
        .select('cash')
        .eq('user_id', user.id)
        .maybeSingle()

    if (statsError || !stats) throw createError({ statusCode: 500, statusMessage: 'Failed to fetch player stats' })

    let cost = 0
    let assetName = 'New Asset'
    let properties: any = {}

    // 2. Logic based on type
    if (assetType === 'stock') {
        if (!companyId || !shares) throw createError({ statusCode: 400, statusMessage: 'Missing stock details' })

        const { data: company } = await (client.from('companies') as any)
            .select('*')
            .eq('id', companyId)
            .single()

        if (!company) throw createError({ statusCode: 404, statusMessage: 'Company not found' })

        cost = Number(company.share_price) * shares
        assetName = company.name
        properties = { ticker: company.ticker, company_id: company.id }
    } else {
        // Other types (real estate etc.) usually handled by specific flow
        cost = amount || 0
    }

    if (stats.cash < cost) {
        throw createError({ statusCode: 400, statusMessage: 'Insufficient funds' })
    }

    // 3. Update DB
    // Deduct Cash
    await (client.from('player_stats') as any).update({ cash: (stats?.cash || 0) - cost }).eq('user_id', user.id)

    // Create Asset
    const { data: newAsset, error: assetError } = await (client.from('assets') as any)
        .insert({
            owner_id: user.id,
            type: assetType,
            name: assetName,
            base_value: cost,
            current_value: cost,
            company_id: companyId,
            shares: shares,
            properties: properties
        })
        .select()
        .single() as any

    if (assetError) throw createError({ statusCode: 500, statusMessage: 'Failed to create asset' })

    return {
        success: true,
        asset: newAsset,
        cost
    }
})
