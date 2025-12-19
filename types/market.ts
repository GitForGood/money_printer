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

    // Simulation Data
    priceHistory: number[]; // Store last N ticks
}

export type InfluenceType = 'sector_mod' | 'global_mod' | 'company_mod';

export interface MarketInfluence {
    id: string;
    name: string;
    description: string;
    type: InfluenceType;
    target?: string; // key of sector or ticker
    duration: number; // Remaining quarters
    strength: number; // Multiplier or additive effect
    eventSourceId?: string; // If this came from a specific event
}

export interface MarketState {
    lastTick: string; // ISO Date of last market step
    quarter: number; // Current game quarter
    activeInfluences: MarketInfluence[];
}
