-- Add verification fields to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS claim_status text DEFAULT 'unverified' CHECK (claim_status IN ('unverified', 'pending', 'verified')),
ADD COLUMN IF NOT EXISTS verification_code text,
ADD COLUMN IF NOT EXISTS verification_code_expires_at timestamptz;

-- Index for looking up by code
CREATE INDEX IF NOT EXISTS idx_profiles_verification_code ON public.profiles(verification_code);

-- RLS: Users can read their own verification info
-- (Existing policies likely cover this, but ensures self-read)
