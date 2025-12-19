import { defineEventHandler, createError } from 'h3'
import { serverSupabaseClient } from '#supabase/server'
import { StockEngine } from '../../../utils/stockMarket'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)

    try {
        const result = await StockEngine.stepMarket(client);
        return {
            message: 'Market stepped successfully.',
            ...result
        }
    } catch (e: any) {
        throw createError({ statusCode: 500, statusMessage: e.message })
    }
})
