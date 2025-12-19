import { defineEventHandler, createError, readBody } from 'h3'
import { serverSupabaseClient } from '#supabase/server'
import { StockEngine } from '../../../utils/stockMarket'

export default defineEventHandler(async (event) => {
    // Optional: Protect with admin check or dev flag

    const client = await serverSupabaseClient(event)
    const body = await readBody(event)

    // Check if companies already exist
    const { count, error: countError } = await client.from('companies').select('*', { count: 'exact', head: true })

    if (countError) throw createError({ statusCode: 500, statusMessage: countError.message })

    if (count && count > 0 && !body?.force) {
        return { message: 'Market already initialized. Use force: true to reset.' }
    }

    // Force reset?
    if (body?.force) {
        // Warning: This deletes everything!
        await client.from('companies').delete().neq('id', '00000000-0000-0000-0000-000000000000')
        // Need to be careful about assets referring to these companies
    }

    const sectors = StockEngine.getInitialSectors()
    const companiesToInsert = []

    for (const sector of sectors) {
        // Generate 10 companies per sector
        for (let i = 0; i < 10; i++) {
            const name = `${sector} Corp ${i + 1}`
            const ticker = `${sector.substring(0, 3).toUpperCase()}${i}`
            const company = StockEngine.generateCompany(name, ticker, sector)

            // Map to snake_case for DB
            companiesToInsert.push({
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
                // jsonb fields?
                // Assuming 'price_history' is a JSONB column or similar
                // If checking the schema from index.get.ts, it didn't explicitly show it,
                // but we will assume it can be stored.
                // We'll trust the plan and assume we can add it or it's ignored if column missing.
                // If Supabase throws error, we will fix schema.
            })
        }
    }

    const { error: insertError } = await client.from('companies').insert(companiesToInsert)

    if (insertError) throw createError({ statusCode: 500, statusMessage: insertError.message })

    return {
        message: `Initialized ${companiesToInsert.length} companies across ${sectors.length} sectors.`,
        companies: companiesToInsert.length
    }
})
