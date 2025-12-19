import type { PublicCompany, MarketInfluence, MarketState } from '../../types/market'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import path from 'path'

// Persistence path
const STATE_FILE = path.resolve(process.cwd(), 'server/data/market_state.json');

export class StockEngine {

    static loadState(): MarketState {
        try {
            if (fs.existsSync(STATE_FILE)) {
                const data = fs.readFileSync(STATE_FILE, 'utf-8');
                return JSON.parse(data);
            }
        } catch (e) {
            console.error('Failed to load market state', e);
        }
        return { lastTick: new Date().toISOString(), quarter: 0, activeInfluences: [] };
    }

    static saveState(state: MarketState) {
        try {
            // Ensure directory exists
            const dir = path.dirname(STATE_FILE);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
        } catch (e) {
            console.error('Failed to save market state', e);
        }
    }

    // Generates a random price movement based on volatility and influences
    static calculateNewPrice(currentPrice: number, volatility: number, influences: MarketInfluence[], company: PublicCompany): number {
        // Base drift: Stocks tend to go up slightly over time (0.5% per tick)
        const baseDrift = 0.005;

        // Volatility shock
        const randomShock = (Math.random() - 0.5) * 2 * volatility;

        // Apply influences
        let influenceFactor = 1.0;

        for (const inf of influences) {
            if (StockEngine.isApplicable(inf, company)) {
                // Strength 1.1 means +10% boost pressure
                // We add (strength - 1) to the percent change
                // e.g. Strength 1.1 -> adds 0.1 to change
                // Strength 0.8 -> substracts 0.2 from change
                influenceFactor += (inf.strength - 1.0);
            }
        }

        const percentChange = baseDrift + randomShock + (influenceFactor - 1.0);

        // Ensure price doesn't go negative
        let newPrice = currentPrice * (1 + percentChange);
        if (newPrice < 0.01) newPrice = 0.01;

        return Number(newPrice.toFixed(2));
    }

    static isApplicable(inf: MarketInfluence, company: PublicCompany): boolean {
        if (inf.type === 'global_mod') return true;
        if (inf.type === 'sector_mod' && inf.target === company.sector) return true;
        if (inf.type === 'company_mod' && inf.target === company.ticker) return true;
        return false;
    }

    static async stepMarket(client: any) {
        // 1. Load State
        const state = StockEngine.loadState();

        // 2. Fetch Companies
        const { data: companies, error } = await client.from('companies').select('*');
        if (error || !companies) throw new Error('Failed to fetch companies');

        // 3. Process Influences
        // Decrement duration
        state.activeInfluences.forEach(inf => inf.duration--);
        // Remove expired
        state.activeInfluences = state.activeInfluences.filter(inf => inf.duration > 0);

        // Chance to spawn NEW influences
        StockEngine.spawnRandomInfluences(state);

        const updates = [];

        for (const c of companies) {
            const companyStruct: PublicCompany = {
                id: c.id,
                name: c.name,
                ticker: c.ticker,
                sector: c.sector,
                description: c.description,
                sharePrice: Number(c.share_price),
                prevSharePrice: Number(c.prev_share_price || c.share_price),
                totalShares: c.total_shares,
                volatility: Number(c.volatility),
                dividendYield: Number(c.dividend_yield),
                priceHistory: []
            };

            const newPrice = StockEngine.calculateNewPrice(companyStruct.sharePrice, companyStruct.volatility, state.activeInfluences, companyStruct);

            updates.push({
                id: c.id,
                share_price: newPrice,
                prev_share_price: companyStruct.sharePrice
            });
        }

        // 4. Batch Update DB
        if (updates.length > 0) {
            const { error: updateError } = await client.from('companies').upsert(updates);
            if (updateError) throw updateError;
        }

        // 5. Save State
        state.lastTick = new Date().toISOString();
        state.quarter++;
        StockEngine.saveState(state);

        return {
            quarter: state.quarter,
            updatedCount: updates.length,
            activeInfluences: state.activeInfluences,
            companies: updates // Return the updated states (id, price, prevPrice)
        };
    }

    static spawnRandomInfluences(state: MarketState) {
        // Simple random spawner
        if (Math.random() < 0.15) { // 15% chance per tick
            const sectors = StockEngine.getInitialSectors();
            const sector = sectors[Math.floor(Math.random() * sectors.length)];
            const isBoom = Math.random() > 0.5;

            const inf: MarketInfluence = {
                id: uuidv4(),
                name: `${sector} ${isBoom ? 'Boom' : 'Slump'}`,
                description: `The ${sector} sector is experiencing a ${isBoom ? 'surge' : 'downturn'}.`,
                type: 'sector_mod',
                target: sector,
                duration: 4 + Math.floor(Math.random() * 4), // 4-8 quarters
                strength: isBoom ? 1.05 : 0.95 // +5% or -5% per tick force
            };

            state.activeInfluences.push(inf);
        }
    }

    // Helper to generate a new company
    static generateCompany(name: string, ticker: string, sector: string): PublicCompany {
        const startPrice = 10 + Math.random() * 190; // $10 - $200
        return {
            id: uuidv4(),
            name,
            ticker,
            sector,
            description: `A generic ${sector} company.`,
            sharePrice: Number(startPrice.toFixed(2)),
            prevSharePrice: Number(startPrice.toFixed(2)),
            totalShares: 1000000 + Math.floor(Math.random() * 9000000),
            volatility: 0.05 + Math.random() * 0.15, // 5% to 20% volatility
            dividendYield: Math.random() > 0.3 ? (Math.random() * 0.05) : 0, // 70% chance of dividend
            priceHistory: [Number(startPrice.toFixed(2))]
        }
    }

    static getInitialSectors() {
        return ['Technology', 'Healthcare', 'Finance', 'Energy', 'Consumer'];
    }
}
