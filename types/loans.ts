export interface Loan {
    id: string;
    borrowerId: string;
    lenderName: string; // 'Iron Bank', 'Sharky'
    principal: number;
    remainingPrincipal: number;
    interestRateDaily: number;
    originationDate: string;
    termDays: number; // -1 for indefinite/margin
    collateralAssetId?: string; // If secured
}

export interface LoanOffer {
    id: string;
    lenderName: string;
    maxPrincipal: number;
    interestRateDaily: number;
    ltvRatio: number; // 0.0 - 1.0 (e.g. 0.5 for 50% LTV)
    termDays: number;
    requiredCollateralType?: string[]; // ['real_estate', 'stock']
}
