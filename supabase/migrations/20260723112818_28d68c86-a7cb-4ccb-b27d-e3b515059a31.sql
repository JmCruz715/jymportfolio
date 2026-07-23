
DROP POLICY IF EXISTS "Public can view receipts" ON storage.objects;
DROP POLICY IF EXISTS "Public can upload receipts" ON storage.objects;

CREATE POLICY "Anyone can upload receipts" ON storage.objects
  FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'receipts');

CREATE POLICY "Admins can view receipts" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'receipts' AND public.has_role(auth.uid(), 'admin'));
