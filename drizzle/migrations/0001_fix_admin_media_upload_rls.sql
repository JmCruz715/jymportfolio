DROP POLICY IF EXISTS "Admins upload avatars" ON storage.objects;
DROP POLICY IF EXISTS "Admins update avatars" ON storage.objects;
DROP POLICY IF EXISTS "Admins delete avatars" ON storage.objects;
DROP POLICY IF EXISTS "Admin upload profile-media" ON storage.objects;
DROP POLICY IF EXISTS "Admin update profile-media" ON storage.objects;
DROP POLICY IF EXISTS "Admin delete profile-media" ON storage.objects;

CREATE POLICY "Admins upload avatars"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars'
  AND auth.uid() = '1dc73148-0aa5-43c6-8347-5cb252e8e1ba'::uuid
);

CREATE POLICY "Admins update avatars"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'avatars'
  AND auth.uid() = '1dc73148-0aa5-43c6-8347-5cb252e8e1ba'::uuid
)
WITH CHECK (
  bucket_id = 'avatars'
  AND auth.uid() = '1dc73148-0aa5-43c6-8347-5cb252e8e1ba'::uuid
);

CREATE POLICY "Admins delete avatars"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'avatars'
  AND auth.uid() = '1dc73148-0aa5-43c6-8347-5cb252e8e1ba'::uuid
);

CREATE POLICY "Admin upload profile-media"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-media'
  AND auth.uid() = '1dc73148-0aa5-43c6-8347-5cb252e8e1ba'::uuid
);

CREATE POLICY "Admin update profile-media"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'profile-media'
  AND auth.uid() = '1dc73148-0aa5-43c6-8347-5cb252e8e1ba'::uuid
)
WITH CHECK (
  bucket_id = 'profile-media'
  AND auth.uid() = '1dc73148-0aa5-43c6-8347-5cb252e8e1ba'::uuid
);

CREATE POLICY "Admin delete profile-media"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'profile-media'
  AND auth.uid() = '1dc73148-0aa5-43c6-8347-5cb252e8e1ba'::uuid
);