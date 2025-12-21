-- Add creator_id to companies and assets for discrimination of system-generated vs player-created content
ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS creator_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE public.assets ADD COLUMN IF NOT EXISTS creator_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Index for faster filtering of system-generated content
CREATE INDEX IF NOT EXISTS idx_companies_creator_id ON public.companies (creator_id);
CREATE INDEX IF NOT EXISTS idx_assets_creator_id ON public.assets (creator_id);
