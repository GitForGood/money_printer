export interface AssetValuation {
    assetId: string;
    name: string;
    currentValue: number;
    ltv: number; // Loan to Value ratio allowed (0.0 to 1.0)
    maxLoanable: number;
}

export interface DebtState {
    totalPrincipal: number;
    dailyInterestRate: number; // calculated aggregate
    nextPaymentDue: string; // ISO Date
}

export interface LiquidityState {
    cash: number;
    liquidStockValue: number; // Value if sold immediately
    liquidationPenalty: number; // The 'slippage' or penalty cost included in liquidStockValue
}

export interface FinancialState {
    netWorth: number;
    liquidity: LiquidityState;
    debt: DebtState;
    assets: AssetValuation[];
}

export interface EconomySummaryResponse {
    tick: number; // Current game tick/day
    date: string; // In-game date
    state: FinancialState;
}
