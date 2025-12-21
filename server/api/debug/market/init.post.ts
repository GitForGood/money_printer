import { defineEventHandler, createError, readBody } from 'h3'
import { serverSupabaseClient } from '#supabase/server'
import { StockEngine } from '../../../utils/stockMarket'
import type { Database } from '../../../../types/database.types'

type CompanyInsert = Database['public']['Tables']['companies']['Insert']

export default defineEventHandler(async (event) => {
    // Optional: Protect with admin check or dev flag

    const client = await serverSupabaseClient<Database>(event)
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
    const companiesToInsert: CompanyInsert[] = []

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
                price_history: company.priceHistory as any,
                created_at: new Date().toISOString()
            })
        }
    }

    // Using 'as any' here because the Supabase client's generated types can sometimes fail 
    // to correctly resolve the table schema, leading to an incorrect 'never' type inference.
    const { error: insertError } = await client.from('companies').insert(companiesToInsert as any)

    if (insertError) throw createError({ statusCode: 500, statusMessage: insertError.message })

    return {
        message: `Initialized ${companiesToInsert.length} companies across ${sectors.length} sectors.`,
        companies: companiesToInsert.length
    }
})
