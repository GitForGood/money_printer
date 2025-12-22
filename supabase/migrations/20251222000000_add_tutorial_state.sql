-- Add tutorial_state table to track which tutorials each player has completed
CREATE TABLE IF NOT EXISTS public.tutorial_state (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    page_id TEXT NOT NULL,
    completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- Ensure one record per user per page
    UNIQUE(user_id, page_id)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_tutorial_state_user_id ON public.tutorial_state(user_id);
CREATE INDEX IF NOT EXISTS idx_tutorial_state_page_id ON public.tutorial_state(page_id);

-- Function to initialize tutorial state for a new user
CREATE OR REPLACE FUNCTION initialize_tutorial_state(p_user_id UUID)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
    -- Insert tutorial state for all known pages
    INSERT INTO public.tutorial_state (user_id, page_id, completed)
    VALUES 
        (p_user_id, 'dashboard', false),
        (p_user_id, 'assets', false),
        (p_user_id, 'loans', false),
        (p_user_id, 'search', false)
    ON CONFLICT (user_id, page_id) DO NOTHING;
END;
$$;

-- Function to reset tutorial state (for bankruptcy)
CREATE OR REPLACE FUNCTION reset_tutorial_state(p_user_id UUID)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE public.tutorial_state
    SET completed = false, completed_at = NULL
    WHERE user_id = p_user_id;
END;
$$;
