-- Migration to create the loans table
CREATE TABLE IF NOT EXISTS public.loans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    borrower_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    lender_name TEXT NOT NULL,
    principal NUMERIC NOT NULL,
    remaining_principal NUMERIC NOT NULL,
    interest_rate_daily NUMERIC NOT NULL,
    origination_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    term_days INT DEFAULT -1, -- -1 for indefinite/margin
    collateral_asset_id UUID REFERENCES public.assets(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_loans_borrower ON public.loans (borrower_id);
CREATE INDEX IF NOT EXISTS idx_loans_collateral ON public.loans (collateral_asset_id);
