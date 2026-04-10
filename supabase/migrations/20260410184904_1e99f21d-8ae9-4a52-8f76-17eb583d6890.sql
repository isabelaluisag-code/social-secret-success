-- Drop old permissive policies
DROP POLICY IF EXISTS "Allow public read" ON public.leads_data;
DROP POLICY IF EXISTS "Authenticated users can insert" ON public.leads_data;
DROP POLICY IF EXISTS "Authenticated users can update" ON public.leads_data;

-- New per-user policies
CREATE POLICY "Users can view own leads"
ON public.leads_data FOR SELECT
TO authenticated
USING (id = auth.uid()::text);

CREATE POLICY "Users can insert own leads"
ON public.leads_data FOR INSERT
TO authenticated
WITH CHECK (id = auth.uid()::text);

CREATE POLICY "Users can update own leads"
ON public.leads_data FOR UPDATE
TO authenticated
USING (id = auth.uid()::text);

-- Allow admins to see all leads
CREATE POLICY "Admins can view all leads"
ON public.leads_data FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));