
ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS menu_sections jsonb NOT NULL DEFAULT '[
    {"title":"Tools","emoji":"🛠️","links":[
      {"title":"Auto Share","description":"Spam share tool","href":"https://mysteriousq-autoshare.onrender.com/"},
      {"title":"Get Cookie Token","description":"Tutorial how to get cookie","href":"https://mysteriousq-get-cookie.onrender.com/"},
      {"title":"SMS Bomber","description":"Spam any PH number","href":"https://mysteriousq-sms-bomber.onrender.com/"},
      {"title":"TempMail","description":"Generate temporary email","href":"https://mysteriousq-tempmail.onrender.com/"},
      {"title":"Website Screenshot","description":"Capture any website","href":"https://mysteriousq-website-screenshot.onrender.com/"},
      {"title":"V2LMlbb","description":"V2LMlbb tool","href":"https://website-replica--hunterzeno88.replit.app/"},
      {"title":"All in One Tools","description":"All-in-one social media downloader","href":"https://all-social-media-downloader-seven.vercel.app/"}
    ]},
    {"title":"Downloader","emoji":"⬇️","links":[
      {"title":"Spotify Downloader","description":"Download music from Spotify","href":"https://mysteriousq-spotifydl.onrender.com/"},
      {"title":"YouTube Downloader","description":"Download video from YouTube","href":"https://mysteriousq-ytdl.onrender.com/"},
      {"title":"Facebook Downloader","description":"Download video from Facebook","href":"https://mysteriousq-fbdl.onrender.com/"},
      {"title":"TikTok Downloader","description":"Download TikTok without watermark","href":"https://mysteriousq-tiktokdl.onrender.com/"},
      {"title":"X Downloader","description":"Download video from Twitter","href":"https://mysteriousq-xdownloader.onrender.com/"}
    ]},
    {"title":"Anime/Manga","emoji":"🎌","links":[
      {"title":"AnimeHaven","description":"Premium anime streaming","href":"https://animehaven-next.vercel.app/"},
      {"title":"GlobalComix Manga","description":"Browse manga online","href":"https://globalcomix.com/browse/manga"}
    ]}
  ]'::jsonb;

INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Admins upload avatars"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update avatars"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'avatars' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete avatars"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'avatars' AND public.has_role(auth.uid(), 'admin'));
