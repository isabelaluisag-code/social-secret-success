
-- Fix leads_data overly permissive policies
DROP POLICY IF EXISTS "Allow public insert" ON public.leads_data;
DROP POLICY IF EXISTS "Allow public update" ON public.leads_data;

CREATE POLICY "Authenticated users can insert"
  ON public.leads_data FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update"
  ON public.leads_data FOR UPDATE
  TO authenticated
  USING (true);
