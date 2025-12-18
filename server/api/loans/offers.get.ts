import { defineEventHandler } from 'h3'
import type { LoanOffer } from '../../../types/loans'

export default defineEventHandler(async (event) => {
    const offers: LoanOffer[] = [
        {
            id: 'offer_fast_cash',
            lenderName: 'QuickCred',
            maxPrincipal: 10000,
            interestRateDaily: 0.001, // 0.1% daily
            ltvRatio: 0.0,
            termDays: 30
        },
        {
            id: 'offer_margin',
            lenderName: 'Iron Bank',
            maxPrincipal: 500000,
            interestRateDaily: 0.0002, // 0.02% daily
            ltvRatio: 0.5,
            termDays: -1
        }
    ]
    return { offers }
})
