CREATE TABLE public.leads_data (
  id text PRIMARY KEY DEFAULT 'helisse-bastos',
  data jsonb NOT NULL DEFAULT '[]'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.leads_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON public.leads_data FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON public.leads_data FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON public.leads_data FOR UPDATE USING (true);