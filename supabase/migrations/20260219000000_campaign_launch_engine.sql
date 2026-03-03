-- Campaign Launch Engine Migration
-- Adds campaigns and campaign_offers tables
-- Adds intelligence fields to profiles

-- 1. Create Campaigns Table
CREATE TABLE IF NOT EXISTS public.campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    brand_id UUID REFERENCES public.profiles(id),
    title TEXT NOT NULL,
    description TEXT,
    budget BIGINT NOT NULL DEFAULT 0,
    total_budget BIGINT,
    niche TEXT,
    status TEXT NOT NULL DEFAULT 'draft',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Create Campaign Offers Table
CREATE TABLE IF NOT EXISTS public.campaign_offers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
    creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    offer_price BIGINT NOT NULL,
    offer_tier TEXT NOT NULL,
    creator_score NUMERIC NOT NULL,
    risk_level TEXT NOT NULL,
    reliability_level TEXT NOT NULL,
    on_time_probability NUMERIC NOT NULL,
    upfront_percentage NUMERIC NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    priority_type TEXT NOT NULL DEFAULT 'standard',
    creator_username TEXT,
    creator_display_name TEXT,
    creator_avatar_url TEXT,
    deal_score NUMERIC,
    offered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    metadata JSONB,
    UNIQUE(campaign_id, creator_id)
);

-- 3. Create Payment Reminders Table
-- Ensure brand_deals exists first (usually it does)
CREATE TABLE IF NOT EXISTS public.payment_reminders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    deal_id UUID NOT NULL REFERENCES public.brand_deals(id) ON DELETE CASCADE,
    creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    reminder_type TEXT NOT NULL,
    scheduled_for TIMESTAMPTZ NOT NULL,
    sent_at TIMESTAMPTZ,
    status TEXT NOT NULL DEFAULT 'scheduled',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Add Intelligence fields to Profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS deal_score NUMERIC,
ADD COLUMN IF NOT EXISTS deal_intelligence JSONB,
ADD COLUMN IF NOT EXISTS facebook_followers INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS goals JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS platforms JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS referral_code TEXT,
ADD COLUMN IF NOT EXISTS tiktok_followers INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS twitter_followers INTEGER DEFAULT 0;

-- 5. Indexes for Campaign Matching
CREATE INDEX IF NOT EXISTS idx_profiles_deal_score ON public.profiles(deal_score) WHERE role = 'creator';
CREATE INDEX IF NOT EXISTS idx_campaign_offers_campaign_creator ON public.campaign_offers(campaign_id, creator_id);
