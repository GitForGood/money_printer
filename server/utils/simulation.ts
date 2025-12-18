import type { PublicCompany } from '../../types/market'

/**
 * Simulates a single market tick (day/quarter) for a list of companies.
 * Applies weighted randomness based on volatility to update share prices.
 * 
 * @param companies List of companies to update
 * @param globalTrend A value between -0.05 (Bear) and 0.05 (Bull). Default 0.
 * @returns Updated list of companies (new array)
 */
export const simulateMarketTick = (companies: PublicCompany[], globalTrend: number = 0): PublicCompany[] => {
    return companies.map(company => {
        // Random factor between -1.0 and 1.0
        const randomFactor = (Math.random() * 2) - 1;

        // Volatility scales the impact. 
        // Example: Volatility 0.8 * Factor 0.5 = +/- 4% swing max per tick base
        const volatilityImpact = company.volatility * 0.05;

        // Calculate percentage change
        const percentChange = (randomFactor * volatilityImpact) + globalTrend;

        // Update price
        let newPrice = company.sharePrice * (1 + percentChange);

        // Safety floor: stocks shouldn't hit 0 easily in this simple model
        if (newPrice < 0.01) newPrice = 0.01;

        // Round to 2 decimals
        newPrice = Math.round(newPrice * 100) / 100;

        return {
            ...company,
            prevSharePrice: company.sharePrice,
            sharePrice: newPrice
        }
    })
}
