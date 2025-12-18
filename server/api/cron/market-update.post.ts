import { defineEventHandler } from 'h3'
import { fetchRealMarketData } from '../../utils/realMarket'
import type { PublicCompany } from '../../../types/market'

// In-memory cache for demo purposes. In prod, update Supabase.
// We export this so we can import it in companies.get.ts for a "Live" view if we wanted.
// For now, this endpoint just proves we can fetch it.
export let cachedRealCompanies: PublicCompany[] = []

export default defineEventHandler(async (event) => {
    const companies = await fetchRealMarketData()

    if (companies.length > 0) {
        cachedRealCompanies = companies
        // TODO: Save to database
    }

    return {
        success: true,
        updated: companies.length,
        companies: companies.map(c => ({ ticker: c.ticker, price: c.sharePrice }))
    }
})
