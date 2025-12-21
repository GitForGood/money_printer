-- Function to regenerate AP for all players
CREATE OR REPLACE FUNCTION public.regenerate_player_ap()
RETURNS void AS $$
BEGIN
    UPDATE public.player_stats
    SET 
        ap_instant = max_ap_instant,
        ap_quarterly = max_ap_quarterly;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
