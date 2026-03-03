-- Create draft_offers table
CREATE TABLE IF NOT EXISTS public.draft_offers (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    reservation_id UUID NOT NULL REFERENCES public.deal_pre_reservations(id) ON DELETE CASCADE,
    suggested_price NUMERIC NOT NULL,
    pricing_tier TEXT NOT NULL, -- safe, market, premium
    payment_terms TEXT NOT NULL,
    expected_start_window TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft',
    creator_notified BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(reservation_id) -- Safeguard: one draft offer per reservation
);

-- Enable RLS
ALTER TABLE public.draft_offers ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
-- Creators can view their own draft offers
CREATE POLICY "Creators can view their own draft offers" 
ON public.draft_offers 
FOR SELECT 
USING (auth.uid() = creator_id);

-- Admins can do everything
CREATE POLICY "Admins can manage all draft offers" 
ON public.draft_offers 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_draft_offers_creator_id ON public.draft_offers(creator_id);
CREATE INDEX IF NOT EXISTS idx_draft_offers_reservation_id ON public.draft_offers(reservation_id);
CREATE INDEX IF NOT EXISTS idx_draft_offers_status ON public.draft_offers(status);
