import { defineEventHandler } from 'h3'
import { serverSupabaseClient } from '#supabase/server'
import type { PublicCompany } from '../../../types/market'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)

    let companies: any[] = []
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
                dividend_yield: 0.005
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
                dividend_yield: 0.04
            }
        ]
    }

    const formattedCompanies: PublicCompany[] = companies.map((c: any) => ({
        id: c.id,
        name: c.name,
        ticker: c.ticker,
        sector: c.sector,
        description: c.description,
        sharePrice: Number(c.share_price),
        prevSharePrice: Number(c.prev_share_price || c.share_price),
        totalShares: c.total_shares,
        volatility: Number(c.volatility),
        dividendYield: Number(c.dividend_yield),
        priceHistory: []
    }))

    return { companies: formattedCompanies, source: usedMock ? 'mock' : 'db' }
})
