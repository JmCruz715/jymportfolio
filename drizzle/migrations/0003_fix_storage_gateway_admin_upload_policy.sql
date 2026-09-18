DROP POLICY IF EXISTS "Authenticated upload avatars" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated update avatars" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated delete avatars" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload profile-media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated update profile-media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated delete profile-media" ON storage.objects;

CREATE POLICY "Admin account upload avatars"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'avatars'
  AND (auth.jwt() ->> 'email') = 'kaizenjym12@gmail.com'
);

CREATE POLICY "Admin account update avatars"
ON storage.objects
FOR UPDATE
TO public
USING (
  bucket_id = 'avatars'
  AND (auth.jwt() ->> 'email') = 'kaizenjym12@gmail.com'
)
WITH CHECK (
  bucket_id = 'avatars'
  AND (auth.jwt() ->> 'email') = 'kaizenjym12@gmail.com'
);

CREATE POLICY "Admin account delete avatars"
ON storage.objects
FOR DELETE
TO public
USING (
  bucket_id = 'avatars'
  AND (auth.jwt() ->> 'email') = 'kaizenjym12@gmail.com'
);

CREATE POLICY "Admin account upload profile-media"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'profile-media'
  AND (auth.jwt() ->> 'email') = 'kaizenjym12@gmail.com'
);

CREATE POLICY "Admin account update profile-media"
ON storage.objects
FOR UPDATE
TO public
USING (
  bucket_id = 'profile-media'
  AND (auth.jwt() ->> 'email') = 'kaizenjym12@gmail.com'
)
WITH CHECK (
  bucket_id = 'profile-media'
  AND (auth.jwt() ->> 'email') = 'kaizenjym12@gmail.com'
);

CREATE POLICY "Admin account delete profile-media"
ON storage.objects
FOR DELETE
TO public
USING (
  bucket_id = 'profile-media'
  AND (auth.jwt() ->> 'email') = 'kaizenjym12@gmail.com'
);