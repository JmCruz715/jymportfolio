
-- Album photos
CREATE TABLE public.album_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  caption TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.album_photos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view album" ON public.album_photos FOR SELECT USING (true);
CREATE POLICY "Admin insert album" ON public.album_photos FOR INSERT WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "Admin update album" ON public.album_photos FOR UPDATE USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "Admin delete album" ON public.album_photos FOR DELETE USING (has_role(auth.uid(),'admin'));

-- Highlights (myday)
CREATE TABLE public.highlights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  media_url TEXT NOT NULL,
  media_type TEXT NOT NULL DEFAULT 'image',
  title TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.highlights ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view highlights" ON public.highlights FOR SELECT USING (true);
CREATE POLICY "Admin insert highlights" ON public.highlights FOR INSERT WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "Admin update highlights" ON public.highlights FOR UPDATE USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "Admin delete highlights" ON public.highlights FOR DELETE USING (has_role(auth.uid(),'admin'));

-- Notes (FB-style posts)
CREATE TABLE public.notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  content TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT 'from-pink-500 to-purple-500',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view notes" ON public.notes FOR SELECT USING (true);
CREATE POLICY "Admin insert notes" ON public.notes FOR INSERT WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "Admin update notes" ON public.notes FOR UPDATE USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "Admin delete notes" ON public.notes FOR DELETE USING (has_role(auth.uid(),'admin'));

-- Storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('profile-media','profile-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read profile-media" ON storage.objects FOR SELECT USING (bucket_id = 'profile-media');
CREATE POLICY "Admin upload profile-media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'profile-media' AND has_role(auth.uid(),'admin'));
CREATE POLICY "Admin update profile-media" ON storage.objects FOR UPDATE USING (bucket_id = 'profile-media' AND has_role(auth.uid(),'admin'));
CREATE POLICY "Admin delete profile-media" ON storage.objects FOR DELETE USING (bucket_id = 'profile-media' AND has_role(auth.uid(),'admin'));
