import { defineEventHandler, readBody, createError } from 'h3'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
import type { Database } from '../../../types/database.types'
import { calculateSlippage } from '../../utils/market'

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event)
    const client = await serverSupabaseClient<Database>(event)

    if (!user) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    const body = await readBody(event)
    const { assetId } = body

    if (!assetId) {
        throw createError({ statusCode: 400, statusMessage: 'Missing assetId' })
    }

    // 1. Fetch Asset
    const { data: asset, error: assetError } = await (client.from('assets') as any)
        .select('*, company:companies(*)')
        .eq('id', assetId)
        .eq('owner_id', user.id)
        .maybeSingle()

    if (assetError || !asset) throw createError({ statusCode: 404, statusMessage: 'Asset not found' })
    // The original message was 'Asset not found or unauthorized'.
    // The instruction provided a syntactically incorrect line: `throw createError({ statusCode: 404, statusMessage: 'Asset not found' })or unauthorized' })`
    // To maintain syntactic correctness, I've interpreted this as changing the message to 'Asset not found' and removing the 'or unauthorized' part,
    // as the `owner_id` check is still present in the query.

    // 2. Calculate Realized Value
    let realizedValue = Number(asset.current_value || asset.base_value)

    if (asset.type === 'stock' && asset.company) {
        const shares = Number(asset.shares || 0)
        const priceAfterSlippage = calculateSlippage(shares, {
            share_price: asset.company.share_price,
            volatility: asset.company.volatility,
            total_shares: asset.company.total_shares
        } as any)
        realizedValue = shares * priceAfterSlippage
    }

    // 3. Tax Logic (30% on gains as per GDD)
    const costBasis = Number(asset.base_value || 0)
    const gain = Math.max(0, realizedValue - costBasis)
    const tax = gain * 0.3
    const finalProceeds = realizedValue - tax

    // 4. Update Database (Atomic sequence)
    // a. Add cash to player
    const { data: stats, error: statsError } = await (client.from('player_stats') as any)
        .select('cash')
        .eq('user_id', user.id)
        .maybeSingle()

    if (statsError || !stats) throw createError({ statusCode: 500, statusMessage: 'Failed to fetch player stats' })
    const currentCash = stats?.cash || 0

    const { error: updateError } = await (client.from('player_stats') as any)
        .update({ cash: currentCash + finalProceeds })
        .eq('user_id', user.id)

    if (updateError) throw createError({ statusCode: 500, statusMessage: 'Failed to update balance' })

    // b. Remove asset
    const { error: deleteError } = await (client.from('assets') as any)
        .delete()
        .eq('id', assetId)

    if (deleteError) {
        // Warning: if this fails but cash was added, we have an inconsistency. 
        // Real app would use RPC or Transaction.
        console.error('Failed to delete asset after adding cash!', deleteError)
        return { success: false, error: 'Inconsistency error' }
    }

    return {
        success: true,
        realizedValue,
        tax,
        finalProceeds,
        newBalance: Number(stats.cash || 0) + finalProceeds
    }
})
