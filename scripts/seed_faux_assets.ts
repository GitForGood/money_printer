import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';
import { StockEngine } from '../server/utils/stockMarket';
import { AssetType } from '../types/assets';

// Load environment variables
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NUXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY || process.env.NUXT_SUPABASE_SECRET_KEY;

if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
    console.error('Missing SUPABASE_URL or SUPABASE_SECRET_KEY in environment or .env file');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY);

// Arguments
const args = process.argv.slice(2);
const targetStocks = parseInt(args.find(a => a.startsWith('--stocks='))?.split('=')[1] || '100');
const targetRE = parseInt(args.find(a => a.startsWith('--re='))?.split('=')[1] || '50');
const targetBus = parseInt(args.find(a => a.startsWith('--bus='))?.split('=')[1] || '50');

async function seedStocks() {
    console.log(`--- Seeding Stocks (Target: ${targetStocks}) ---`);

    // 1. Fetch existing system stocks
    const { data: existing, error: fetchError } = await supabase
        .from('companies')
        .select('id, ticker')
        .is('creator_id', null);

    if (fetchError) throw fetchError;

    const currentCount = existing?.length || 0;
    console.log(`Current system stocks: ${currentCount}`);

    if (currentCount < targetStocks) {
        const toCreate = targetStocks - currentCount;
        console.log(`Generating ${toCreate} new stocks...`);

        const newCompanies = [];
        for (let i = 0; i < toCreate; i++) {
            const sectors = StockEngine.getInitialSectors();
            const sector = sectors[Math.floor(Math.random() * sectors.length)];
            const ticker = generateTicker();
            const company = StockEngine.generateCompany(`${sector} Corp ${i + currentCount}`, ticker, sector);

            newCompanies.push({
                id: company.id,
                name: company.name,
                ticker: company.ticker,
                sector: company.sector,
                description: company.description,
                share_price: company.sharePrice,
                prev_share_price: company.prevSharePrice,
                total_shares: company.totalShares,
                volatility: company.volatility,
                dividend_yield: company.dividendYield,
                creator_id: null // Explicitly identify as system
            });
        }

        const { error: insertError } = await supabase.from('companies').insert(newCompanies);
        if (insertError) throw insertError;
        console.log(`Successfully added ${newCompanies.length} stocks.`);
    } else if (currentCount > targetStocks) {
        const toDelete = currentCount - targetStocks;
        console.log(`Pruning ${toDelete} excess stocks...`);

        // Delete oldest or random? Let's just take the first N from existing.
        const idsToDelete = existing.slice(0, toDelete).map(c => c.id);
        const { error: deleteError } = await supabase.from('companies').delete().in('id', idsToDelete);

        if (deleteError) throw deleteError;
        console.log(`Successfully pruned ${idsToDelete.length} stocks.`);
    } else {
        console.log('Stock count matches target. No changes needed.');
    }
}

async function seedAssets(type: AssetType, target: number, label: string) {
    console.log(`--- Seeding ${label} (Target: ${target}) ---`);

    // 1. Fetch existing system assets of this type
    // We check BOTH creator_id IS NULL AND owner_id IS NULL to be safe
    const { data: existing, error: fetchError } = await supabase
        .from('assets')
        .select('id')
        .eq('type', type)
        .is('creator_id', null)
        .is('owner_id', null);

    if (fetchError) throw fetchError;

    const currentCount = existing?.length || 0;
    console.log(`Current system ${label.toLowerCase()}: ${currentCount}`);

    if (currentCount < target) {
        const toCreate = target - currentCount;
        console.log(`Generating ${toCreate} new ${label.toLowerCase()}...`);

        const newAssets = [];
        for (let i = 0; i < toCreate; i++) {
            if (type === AssetType.RealEstate) {
                newAssets.push(generateRealEstate());
            } else if (type === AssetType.Business) {
                newAssets.push(generateBusiness());
            }
        }

        const { error: insertError } = await supabase.from('assets').insert(newAssets);
        if (insertError) throw insertError;
        console.log(`Successfully added ${newAssets.length} ${label.toLowerCase()}.`);
    } else if (currentCount > target) {
        const toDelete = currentCount - target;
        console.log(`Pruning ${toDelete} excess ${label.toLowerCase()}...`);

        const idsToDelete = existing.slice(0, toDelete).map(a => a.id);
        const { error: deleteError } = await supabase.from('assets').delete().in('id', idsToDelete);

        if (deleteError) throw deleteError;
        console.log(`Successfully pruned ${idsToDelete.length} ${label.toLowerCase()}.`);
    } else {
        console.log(`${label} count matches target. No changes needed.`);
    }
}

// Helpers
function generateTicker() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let ticker = '';
    for (let i = 0; i < 4; i++) {
        ticker += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return ticker;
}

// Smart rounding: rounds to approximately 1% of the value
function smartRound(value: number): number {
    if (value < 10000) {
        return Math.round(value / 100) * 100; // Round to nearest $100
    } else if (value < 1000000) {
        return Math.round(value / 1000) * 1000; // Round to nearest $1,000
    } else {
        return Math.round(value / 10000) * 10000; // Round to nearest $10,000
    }
}

function generateRealEstate() {
    const cities = ['Neo-Tokyo', 'New York Alpha', 'London Metro', 'Mars Colony', 'Crypto Valley'];
    const city = cities[Math.floor(Math.random() * cities.length)];
    // Range: $20,000 to $10,000,000
    const rawValue = 20000 + Math.random() * 9980000;
    const value = smartRound(rawValue);

    return {
        id: uuidv4(),
        type: AssetType.RealEstate,
        name: `${city} Property #${Math.floor(Math.random() * 1000)}`,
        base_value: value,
        current_value: value,
        location: city,
        properties: {
            condition: 70 + Math.floor(Math.random() * 30),
            is_renovating: false
        },
        creator_id: null,
        owner_id: null
    };
}

function generateBusiness() {
    const sectors = ['Retail', 'Service', 'Technology', 'Manufacturing', 'Cyber-Security'];
    const sector = sectors[Math.floor(Math.random() * sectors.length)];
    const value = 100000 + Math.random() * 2000000;

    return {
        id: uuidv4(),
        type: AssetType.Business,
        name: `${sector} Venture ${generateTicker()}`,
        base_value: value,
        current_value: value,
        properties: {
            sector: sector.toLowerCase(),
            level: 1,
            employees: 1 + Math.floor(Math.random() * 10),
            revenue_per_quarter: value * 0.1,
            expense_per_quarter: value * 0.05
        },
        creator_id: null,
        owner_id: null
    };
}

async function main() {
    try {
        await seedStocks();
        await seedAssets(AssetType.RealEstate, targetRE, 'Real Estate');
        await seedAssets(AssetType.Business, targetBus, 'Businesses');
        console.log('\n--- Seeding Complete ---');
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
}

main();
