
INSERT INTO storage.buckets (id, name, public) VALUES ('planilhas', 'planilhas', false);

CREATE POLICY "Anyone can upload planilhas"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'planilhas');

CREATE POLICY "Anyone can view planilhas"
ON storage.objects FOR SELECT
USING (bucket_id = 'planilhas');
