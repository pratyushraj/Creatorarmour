-- Create deal_pre_reservations table
CREATE TABLE IF NOT EXISTS public.deal_pre_reservations (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    brand_name TEXT NOT NULL,
    email TEXT NOT NULL,
    campaign_vision TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.deal_pre_reservations ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
-- Public can insert (from the collab link page)
CREATE POLICY "Public can insert pre-reservations" 
ON public.deal_pre_reservations 
FOR INSERT 
WITH CHECK (true);

-- Creators can view their own pre-reservations
CREATE POLICY "Creators can view their own pre-reservations" 
ON public.deal_pre_reservations 
FOR SELECT 
USING (auth.uid() = creator_id);

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_deal_pre_reservations_creator_id ON public.deal_pre_reservations(creator_id);
CREATE INDEX IF NOT EXISTS idx_deal_pre_reservations_status ON public.deal_pre_reservations(status);
