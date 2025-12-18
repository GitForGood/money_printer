export interface PublicCompany {
    id: string; // e.g. 'comp_tech_001'
    name: string;
    ticker: string;
    sector: string;
    description: string;

    // Market Data
    sharePrice: number;
    prevSharePrice?: number; // Previous tick's close
    totalShares: number; // For calculating percentage ownership
    volatility: number; // 0.0 to 1.0, affects price swings

    // Dividends
    dividendYield: number; // Annual %
    lastDividendDate?: string;
}
