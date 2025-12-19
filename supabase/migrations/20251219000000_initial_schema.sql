-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Companies (Market)
CREATE TABLE IF NOT EXISTS public.companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    ticker TEXT NOT NULL UNIQUE,
    sector TEXT,
    description TEXT,
    share_price NUMERIC,
    prev_share_price NUMERIC,
    total_shares BIGINT,
    volatility NUMERIC,
    dividend_yield NUMERIC,
    price_history JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_companies_ticker ON public.companies (ticker);

-- 2. Player Stats
CREATE TABLE IF NOT EXISTS public.player_stats (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    cash NUMERIC DEFAULT 10000, -- Start with some cash
    heat NUMERIC DEFAULT 0,
    ap NUMERIC DEFAULT 10,
    reputation NUMERIC DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Game Actions
CREATE TABLE IF NOT EXISTS public.game_actions (
    id TEXT PRIMARY KEY,
    type TEXT,
    label TEXT,
    description TEXT,
    requirements JSONB DEFAULT '[]'::jsonb,
    cooldown_days INT DEFAULT 0,
    base_success_rate NUMERIC DEFAULT 1.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Assets
CREATE TABLE IF NOT EXISTS public.assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    name TEXT,
    acquired_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    base_value NUMERIC DEFAULT 0,
    current_value NUMERIC DEFAULT 0,
    company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
    shares NUMERIC DEFAULT 0,
    count NUMERIC DEFAULT 1,
    cost_basis_per_share NUMERIC,
    location TEXT,
    properties JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seeding some initial game actions
INSERT INTO public.game_actions (id, type, label, description, requirements, base_success_rate)
VALUES 
('act_hire_analyst', 'hire', 'Hire Analyst', 'Hire a market analyst to reveal trends.', '[{"resource": "cash", "cost": 500, "min": 500}]', 1.0),
('act_insider_info', 'espionage', 'Buy Insider Info', 'Purchase illegal market information.', '[{"resource": "cash", "cost": 2000, "min": 2000}, {"resource": "heat", "cost": -10}]', 0.8)
ON CONFLICT (id) DO NOTHING;
