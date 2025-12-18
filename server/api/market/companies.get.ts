import { defineEventHandler } from 'h3'
import type { PublicCompany } from '../../../types/market'
import { cachedRealCompanies } from '../cron/market-update.post'

export default defineEventHandler(async (event) => {
    // Start with mock, overwrite with real if available
    let companies: PublicCompany[] = [
        {
            id: 'comp_tech_001',
            name: 'OmniCorp Tech',
            ticker: 'OMNI',
            sector: 'Technology',
            description: 'A global conglomerate in AI and robotics.',
            sharePrice: 150.25,
            totalShares: 100000000,
            volatility: 0.8, // High volatility
            dividendYield: 0.005 // 0.5%
        },
        {
            id: 'comp_re_002',
            name: 'BuildRight Real Estate',
            ticker: 'BLDR',
            sector: 'Real Estate',
            description: 'Commercial real estate trust.',
            sharePrice: 45.10,
            totalShares: 50000000,
            volatility: 0.2, // Low volatility
            dividendYield: 0.04 // 4%
        }
    ]


    // Merge real data
    if (cachedRealCompanies.length > 0) {
        companies = [...companies, ...cachedRealCompanies]
    }

    return { companies }
})
