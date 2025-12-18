export enum AssetType {
    Stock = 'stock',
    RealEstate = 'real_estate',
    Business = 'business',
    Crypto = 'crypto' // Future proofing?
}

export interface BaseAsset {
    id: string;
    ownerId: string;
    type: AssetType;
    name: string;
    acquiredAt: string; // ISO Date
    baseValue: number; // Purchase price or base valuation
    currentValue: number;
}

export interface StockPosition extends BaseAsset {
    type: AssetType.Stock;
    ticker: string;
    shares: number;
    costBasisPerShare: number;
}

export interface RealEstateAsset extends BaseAsset {
    type: AssetType.RealEstate;
    location: string;
    condition: number; // 0-100
    isRenovating: boolean;
}

export interface BusinessVenture extends BaseAsset {
    type: AssetType.Business;
    sector: string; // 'retail', 'service', etc.
    level: number;
    employees: number;
    revenuePerQuarter: number;
    expensePerQuarter: number;
}

export type GameAsset = StockPosition | RealEstateAsset | BusinessVenture;
