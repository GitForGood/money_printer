import { describe, it, expect } from 'vitest'
import { calculateSlippage } from '../../../server/utils/market'

describe('market utils', () => {
    describe('calculateSlippage', () => {
        const mockCompany = {
            id: '1',
            name: 'Test Corp',
            ticker: 'TEST',
            sector: 'Technology',
            marketCap: 1000000,
            sharePrice: 100,
            totalShares: 10000,
            priceHistory: [],
            volatility: 0.1,
            description: 'Test Description',
            dividendYield: 0.05
        }

        it('should return original price when selling <= 1% of total shares', () => {
            // 1% of 10000 is 100
            const price = calculateSlippage(100, mockCompany)
            expect(price).toBe(100)

            const priceSmall = calculateSlippage(50, mockCompany)
            expect(priceSmall).toBe(100)
        })

        it('should apply slippage when selling > 1% of total shares', () => {
            // Selling 200 shares (2%)
            // Excess is 1% (0.01)
            // Slippage factor = 0.01 * 0.5 = 0.005 (0.5%)
            // Expected price = 100 * (1 - 0.005) = 99.5
            const price = calculateSlippage(200, mockCompany)
            expect(price).toBe(99.5)
        })

        it('should cap max slippage at 50%', () => {
            // Selling all shares (100%)
            // Excess is 99% (0.99)
            // Slippage factor = 0.99 * 0.5 = 0.495
            // Wait, 0.495 is less than 0.5 cap.
            // Let's force a larger factor if possible, or test the math directly.
            // If we sell 200% (impossible in reality but function allows number),
            // Excess 199% -> ~0.995 factor -> capped at 0.5

            const price = calculateSlippage(20000, mockCompany)
            // Excess = 2.0 - 0.01 = 1.99
            // Factor = 1.99 * 0.5 = 0.995
            // Discount = min(0.995, 0.5) = 0.5
            // Price = 100 * 0.5 = 50
            expect(price).toBe(50)
        })
    })
})
