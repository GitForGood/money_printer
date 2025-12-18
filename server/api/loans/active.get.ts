import { defineEventHandler } from 'h3'
import type { Loan } from '../../../types/loans'

export default defineEventHandler(async (event) => {
    // Mock active loans
    const loops: Loan[] = [
        {
            id: 'ln_001',
            borrowerId: 'usr_001',
            lenderName: 'Iron Bank',
            principal: 500000,
            remainingPrincipal: 480000,
            interestRateDaily: 0.0002, // 0.02%
            originationDate: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
            termDays: -1, // Margin
            collateralAssetId: 'ast_001'
        },
        {
            id: 'ln_002',
            borrowerId: 'usr_001',
            lenderName: 'QuickCred',
            principal: 10000,
            remainingPrincipal: 8500,
            interestRateDaily: 0.001,
            originationDate: new Date(Date.now() - 86400000 * 5).toISOString(),
            termDays: 30
        }
    ]

    return { loans: loops }
})
