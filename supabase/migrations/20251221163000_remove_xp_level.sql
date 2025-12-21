-- Remove level and xp from player_stats
ALTER TABLE public.player_stats 
DROP COLUMN IF EXISTS level,
DROP COLUMN IF EXISTS xp;
