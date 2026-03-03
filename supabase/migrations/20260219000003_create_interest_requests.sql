CREATE TABLE IF NOT EXISTS interest_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  instagram_username TEXT NOT NULL,
  brand_name TEXT NOT NULL,
  brand_email TEXT NOT NULL,
  brand_website TEXT,
  collab_type TEXT,
  budget_range TEXT,
  exact_budget NUMERIC,
  message TEXT,
  status TEXT DEFAULT 'pending', -- pending, claimed, notified
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_interest_requests_username ON interest_requests(instagram_username);
