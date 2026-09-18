DROP POLICY IF EXISTS "Admins upload avatars" ON storage.objects;
DROP POLICY IF EXISTS "Admins update avatars" ON storage.objects;
DROP POLICY IF EXISTS "Admins delete avatars" ON storage.objects;
DROP POLICY IF EXISTS "Admin upload profile-media" ON storage.objects;
DROP POLICY IF EXISTS "Admin update profile-media" ON storage.objects;
DROP POLICY IF EXISTS "Admin delete profile-media" ON storage.objects;

CREATE POLICY "Authenticated upload avatars"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "Authenticated update avatars"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'avatars')
WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "Authenticated delete avatars"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'avatars');

CREATE POLICY "Authenticated upload profile-media"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'profile-media');

CREATE POLICY "Authenticated update profile-media"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'profile-media')
WITH CHECK (bucket_id = 'profile-media');

CREATE POLICY "Authenticated delete profile-media"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'profile-media');