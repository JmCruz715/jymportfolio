-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Anyone can view roles"
  ON public.user_roles FOR SELECT
  USING (true);

CREATE POLICY "Admins manage roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Site settings (singleton)
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT 'jmcruz',
  role_label TEXT NOT NULL DEFAULT 'Developer',
  bio TEXT NOT NULL DEFAULT 'jmcruz builds clean tools, curated links, shop drops, and anime picks in one smooth liquid-glass space.',
  avatar_url TEXT NOT NULL DEFAULT '/lovable-uploads/f77014f9-190b-49ff-902d-3d1981b8391e.jpg',
  phrases JSONB NOT NULL DEFAULT '[
    {"text":"Stay consistent.","color":"text-primary"},
    {"text":"Protect your energy.","color":"text-green-400"},
    {"text":"Mahalin moko.","color":"text-pink-400"},
    {"text":"Focus on your life.","color":"text-yellow-400"},
    {"text":"Never beg someone to love you.","color":"text-red-400"},
    {"text":"pinaka pogi sa balat ng lupa.","color":"text-cyan-400"}
  ]'::jsonb,
  socials JSONB NOT NULL DEFAULT '[
    {"label":"Facebook","icon":"facebook","href":"https://www.facebook.com/jm.born67"},
    {"label":"TikTok","icon":"tiktok","href":"https://www.tiktok.com/@kaizenjym"},
    {"label":"GitHub","icon":"github","href":"https://github.com/JmCruz715"},
    {"label":"Messenger","icon":"messenger","href":"https://m.me/jm.born67"}
  ]'::jsonb,
  websites JSONB NOT NULL DEFAULT '[
    {"title":"PremKaizenJym","description":"My connected portfolio site","href":"https://premkaizenjym.vercel.app"}
  ]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site settings"
  ON public.site_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can update site settings"
  ON public.site_settings FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert site settings"
  ON public.site_settings FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER site_settings_touch
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Auto-promote the admin email to admin role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.email = 'kaizenjym12@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Seed singleton row
INSERT INTO public.site_settings DEFAULT VALUES;