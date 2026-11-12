DROP POLICY IF EXISTS "Admin account update avatars" ON storage.objects;
CREATE POLICY "Admin account update avatars"
ON storage.objects
FOR UPDATE
TO public
USING (
  bucket_id = 'avatars'
  AND (auth.jwt() ->> 'email') = 'kaizenjym12@gmail.com'
  AND owner_id = (SELECT auth.uid()::text)
)
WITH CHECK (
  bucket_id = 'avatars'
  AND (auth.jwt() ->> 'email') = 'kaizenjym12@gmail.com'
  AND owner_id = (SELECT auth.uid()::text)
);

DROP POLICY IF EXISTS "Admin account delete avatars" ON storage.objects;
CREATE POLICY "Admin account delete avatars"
ON storage.objects
FOR DELETE
TO public
USING (
  bucket_id = 'avatars'
  AND (auth.jwt() ->> 'email') = 'kaizenjym12@gmail.com'
  AND owner_id = (SELECT auth.uid()::text)
);

DROP POLICY IF EXISTS "Admin account update profile-media" ON storage.objects;
CREATE POLICY "Admin account update profile-media"
ON storage.objects
FOR UPDATE
TO public
USING (
  bucket_id = 'profile-media'
  AND (auth.jwt() ->> 'email') = 'kaizenjym12@gmail.com'
  AND owner_id = (SELECT auth.uid()::text)
)
WITH CHECK (
  bucket_id = 'profile-media'
  AND (auth.jwt() ->> 'email') = 'kaizenjym12@gmail.com'
  AND owner_id = (SELECT auth.uid()::text)
);

DROP POLICY IF EXISTS "Admin account delete profile-media" ON storage.objects;
CREATE POLICY "Admin account delete profile-media"
ON storage.objects
FOR DELETE
TO public
USING (
  bucket_id = 'profile-media'
  AND (auth.jwt() ->> 'email') = 'kaizenjym12@gmail.com'
  AND owner_id = (SELECT auth.uid()::text)
);