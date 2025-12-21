-- Add 3-tier Action Points (AP) to player_stats
ALTER TABLE public.player_stats 
ADD COLUMN IF NOT EXISTS ap_instant INT DEFAULT 10,
ADD COLUMN IF NOT EXISTS max_ap_instant INT DEFAULT 10,
ADD COLUMN IF NOT EXISTS ap_quarterly INT DEFAULT 5,
ADD COLUMN IF NOT EXISTS max_ap_quarterly INT DEFAULT 5,
ADD COLUMN IF NOT EXISTS ap_long_term INT DEFAULT 2,
ADD COLUMN IF NOT EXISTS max_ap_long_term INT DEFAULT 2;

-- Update existing rows to ensure they have the defaults if not already set (re-run safety)
UPDATE public.player_stats 
SET 
    ap_instant = COALESCE(ap_instant, 10),
    max_ap_instant = COALESCE(max_ap_instant, 10),
    ap_quarterly = COALESCE(ap_quarterly, 5),
    max_ap_quarterly = COALESCE(max_ap_quarterly, 5),
    ap_long_term = COALESCE(ap_long_term, 2),
    max_ap_long_term = COALESCE(max_ap_long_term, 2)
WHERE ap_instant IS NULL OR ap_quarterly IS NULL OR ap_long_term IS NULL;
