import { defineEventHandler, createError, readBody } from 'h3'
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { StockEngine } from '../../utils/stockMarket'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const user = await serverSupabaseUser(event)
    const body = await readBody(event)

    if (!user) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

    const { name, ticker, sector } = body || {}

    if (!name || !ticker || !sector) {
        throw createError({ statusCode: 400, statusMessage: 'Missing Input: name, ticker, sector' })
    }

    // Cost to list?
    // For now, free.

    // 1. Generate Company
    const company = StockEngine.generateCompany(name, ticker, sector)

    // Override description and volatility?
    company.description = `Founded by player.`

    // 2. Insert into DB
    const { error: insertError } = await client.from('companies').insert({
        id: company.id,
        name: company.name,
        ticker: company.ticker,
        sector: company.sector,
        description: company.description,
        share_price: company.sharePrice,
        prev_share_price: company.prevSharePrice,
        total_shares: company.totalShares,
        volatility: company.volatility,
        dividend_yield: company.dividendYield,
        // creator_id: user.id // If schema supports it
    })

    if (insertError) throw createError({ statusCode: 500, statusMessage: insertError.message })

    // 3. Grant player some shares? (IPO)
    // Optional.

    return {
        message: 'Company successfully listed.',
        company
    }
})
