import type { PublicCompany } from '../../types/market'

/**
 * Calculates the price penalty (slippage) when selling a large block of shares.
 * Rule: Selling > 1% of total shares incurs slippage.
 * Formula: proportional penalty based on excess over 1%.
 * 
 * @param sharesToSell Number of shares to sell
 * @param company The company data
 * @returns Average Price Per Share after slippage
 */
export const calculateSlippage = (sharesToSell: number, company: PublicCompany): number => {
    const percentage = sharesToSell / company.totalShares;
    const threshold = 0.01; // 1%

    if (percentage <= threshold) {
        return company.sharePrice;
    }

    // Simple linear slippage model: for every 1% over threshold, price drops by 0.5% (example)
    const excessPercentage = percentage - threshold;
    const slippageFactor = excessPercentage * 0.5; // coefficient 0.5

    // Validating bounds: max drop logic could be added here
    // The price reduction applies to the whole block effectively, or we average it.
    // Let's basically say the realized price is Discounted.

    const discount = Math.min(slippageFactor, 0.5); // Cap max slippage at 50% for sanity
    return company.sharePrice * (1 - discount);
}
