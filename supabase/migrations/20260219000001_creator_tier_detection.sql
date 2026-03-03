-- Add Creator Tier Detection Layer columns to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS creator_tier TEXT DEFAULT 'Standard',
ADD COLUMN IF NOT EXISTS pricing_multiplier NUMERIC DEFAULT 1.0;

-- Index for faster filtering in matching
CREATE INDEX IF NOT EXISTS idx_profiles_creator_tier ON public.profiles(creator_tier);

-- Update existing profiles based on follower count (initial run)
UPDATE public.profiles
SET 
  creator_tier = CASE 
    WHEN instagram_followers >= 20000000 THEN 'Celebrity'
    WHEN instagram_followers >= 5000000 THEN 'Mega'
    WHEN instagram_followers >= 500000 THEN 'Macro'
    ELSE 'Standard'
  END,
  pricing_multiplier = CASE 
    WHEN instagram_followers >= 20000000 THEN 10
    WHEN instagram_followers >= 5000000 THEN 3
    WHEN instagram_followers >= 500000 THEN 1.5
    ELSE 1
  END;
