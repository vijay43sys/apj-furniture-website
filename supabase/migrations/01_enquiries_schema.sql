-- ==============================================================================
-- APJ Furniture & Interior - Supabase Transactional Schema: Enquiries
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor)
-- ==============================================================================

-- 1. Create enquiries table
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT NOT NULL,
    service_type TEXT DEFAULT 'General Enquiry',
    message TEXT NOT NULL,
    product_reference TEXT,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'archived')),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- 2. Indexes for efficient dashboard querying
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries (status);

-- 3. Enable Row-Level Security (RLS)
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policy: Allow ANY public unauthenticated visitor (anon) to INSERT an enquiry
-- (They cannot read, modify, or delete any records)
DROP POLICY IF EXISTS "Allow public insert into enquiries" ON public.enquiries;
CREATE POLICY "Allow public insert into enquiries" 
ON public.enquiries 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- 5. RLS Policy: Allow authenticated staff / admin users to SELECT all enquiries
DROP POLICY IF EXISTS "Allow authenticated staff to view enquiries" ON public.enquiries;
CREATE POLICY "Allow authenticated staff to view enquiries" 
ON public.enquiries 
FOR SELECT 
TO authenticated 
USING (true);

-- 6. RLS Policy: Allow authenticated staff / admin users to UPDATE enquiries (e.g. status)
DROP POLICY IF EXISTS "Allow authenticated staff to update enquiries" ON public.enquiries;
CREATE POLICY "Allow authenticated staff to update enquiries" 
ON public.enquiries 
FOR UPDATE 
TO authenticated 
USING (true)
WITH CHECK (true);

-- 7. Add comments for clarity
COMMENT ON TABLE public.enquiries IS 'Customer contact and consultation enquiries submitted from the APJ Furniture & Interior website.';
COMMENT ON COLUMN public.enquiries.status IS 'Lifecycle state: new, contacted, in_progress, completed, archived';
