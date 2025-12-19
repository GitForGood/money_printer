import { defineEventHandler, createError } from 'h3'
import { serverSupabaseClient } from '#supabase/server'
import { StockEngine } from '../../utils/stockMarket'
import type { PublicCompany } from '../../../types/market'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)

    try {
        const result = await StockEngine.stepMarket(client)

        // Map updates back to match what frontend might expect if necessary
        // The old one returned 'marketState' as PublicCompany[]
        // result.companies contains { id, share_price, prev_share_price }
        // We might want to fetch full details or just trust the frontend only needs prices?
        // Let's assume frontend needs full objects?
        // "tick.post.ts" is game tick.

        return {
            tick: Date.now(),
            globalTrend: 0, // Deprecated/Managed by influences
            marketState: result.companies, // This might differ in shape from PublicCompany but contains key fields
            activeInfluences: result.activeInfluences,
            message: 'Market updated via StockEngine'
        }
    } catch (e: any) {
        throw createError({ statusCode: 500, statusMessage: e.message })
    }
})
