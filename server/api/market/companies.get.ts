import { defineEventHandler } from 'h3'
import { serverSupabaseClient } from '#supabase/server'
import type { PublicCompany } from '../../../types/market'
import type { Database } from '../../../types/database.types'

type CompanyRow = Database['public']['Tables']['companies']['Row']

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient<Database>(event)

    let companies: CompanyRow[] = []
    let usedMock = false

    try {
        const { data, error } = await client.from('companies').select('*').order('ticker')
        if (error || !data || data.length === 0) throw error || new Error('No data')
        companies = data
    } catch (e) {
        console.warn('Failed to fetch companies from Supabase, failing back to mock data:', e)
        usedMock = true
        // Mock data
        companies = [
            {
                id: 'comp_tech_001',
                name: 'OmniCorp Tech',
                ticker: 'OMNI',
                sector: 'Technology',
                description: 'A global conglomerate in AI and robotics.',
                share_price: 150.25,
                prev_share_price: 148.50,
                total_shares: 100000000,
                volatility: 0.8,
                dividend_yield: 0.005,
                price_history: null,
                created_at: new Date().toISOString()
            },
            {
                id: 'comp_re_002',
                name: 'BuildRight Real Estate',
                ticker: 'BLDR',
                sector: 'Real Estate',
                description: 'Commercial real estate trust.',
                share_price: 45.10,
                prev_share_price: 45.00,
                total_shares: 50000000,
                volatility: 0.2,
                dividend_yield: 0.04,
                price_history: null,
                created_at: new Date().toISOString()
            }
        ]
    }

    const formattedCompanies: PublicCompany[] = companies.map((c) => ({
        id: c.id,
        name: c.name,
        ticker: c.ticker,
        sector: c.sector || 'Unknown',
        description: c.description || '',
        sharePrice: Number(c.share_price || 0),
        prevSharePrice: Number(c.prev_share_price || c.share_price || 0),
        totalShares: c.total_shares || 0,
        volatility: Number(c.volatility || 0),
        dividendYield: Number(c.dividend_yield || 0),
        priceHistory: []
    }))

    return { companies: formattedCompanies, source: usedMock ? 'mock' : 'db' }
})
