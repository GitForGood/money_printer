import { defineEventHandler, createError } from 'h3'
import { serverSupabaseClient } from '#supabase/server'
import { simulateMarketTick } from '../../utils/simulation'
import type { PublicCompany } from '../../../types/market'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)

    // 1. Fetch Companies
    const { data: companies, error: fetchError } = await client
        .from('companies')
        .select('*')

    if (fetchError) {
        throw createError({ statusCode: 500, statusMessage: fetchError.message })
    }

    if (!companies || companies.length === 0) {
        return {
            tick: Date.now(),
            globalTrend: 0,
            marketState: [],
            message: 'No active companies found'
        }
    }

    // Map DB (snake_case) to App (camelCase)
    const currentMarketState: PublicCompany[] = companies.map((c: any) => ({
        id: c.id,
        name: c.name,
        ticker: c.ticker,
        sector: c.sector,
        description: c.description,
        sharePrice: Number(c.share_price),
        prevSharePrice: Number(c.prev_share_price || c.share_price),
        totalShares: c.total_shares,
        volatility: c.volatility,
        dividendYield: c.dividend_yield,
        lastDividendDate: c.last_dividend_date
    }))

    // 2. Simulate Market
    // Bias slight positive for "Stonks only go up" meme, or random
    const globalTrend = (Math.random() * 0.02) - 0.01; // +/- 1% trend
    const updatedMarketState = simulateMarketTick(currentMarketState, globalTrend)

    // 3. Update DB
    // Map back to snake_case for DB
    const updates = updatedMarketState.map(c => ({
        id: c.id,
        name: c.name,
        ticker: c.ticker,
        sector: c.sector,
        description: c.description,
        share_price: c.sharePrice,
        prev_share_price: c.prevSharePrice,
        total_shares: c.totalShares,
        volatility: c.volatility,
        dividend_yield: c.dividendYield,
        last_dividend_date: c.lastDividendDate
    }))

    const { error: updateError } = await client
        .from('companies')
        .upsert(updates)

    if (updateError) {
        throw createError({ statusCode: 500, statusMessage: updateError.message })
    }

    // 4. Return Report
    return {
        tick: Date.now(),
        globalTrend,
        marketState: updatedMarketState,
        message: 'Market updated'
    }
})
