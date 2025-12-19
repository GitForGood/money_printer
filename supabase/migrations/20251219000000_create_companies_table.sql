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
    price_history JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Optional: Create an index on ticker for faster lookups
CREATE INDEX IF NOT EXISTS idx_companies_ticker ON public.companies (ticker);
