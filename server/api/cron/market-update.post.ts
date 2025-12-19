import { defineEventHandler } from 'h3'
import { StockEngine } from '../../utils/stockMarket'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)

    try {
        const result = await StockEngine.stepMarket(client)
        return {
            success: true,
            ...result
        }
    } catch (e: any) {
        return {
            success: false,
            error: e.message
        }
    }
})
