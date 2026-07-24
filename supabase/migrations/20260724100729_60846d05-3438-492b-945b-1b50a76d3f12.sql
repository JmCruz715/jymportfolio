
-- 1) user_roles: no public reads
DROP POLICY IF EXISTS "Anyone can view roles" ON public.user_roles;
CREATE POLICY "Users view own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- 2) orders: replace permissive insert with validated check
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;
CREATE POLICY "Public can create orders (validated)" ON public.orders
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    price > 0 AND price <= 100000
    AND char_length(buyer_name) BETWEEN 1 AND 80
    AND char_length(buyer_email) BETWEEN 3 AND 120
    AND buyer_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND char_length(product_name) BETWEEN 1 AND 120
    AND (gcash_ref IS NULL OR char_length(gcash_ref) <= 64)
    AND status = 'pending'
  );

-- 3) storage: drop broad public SELECT (public buckets remain accessible via public URLs)
DROP POLICY IF EXISTS "Public read avatars" ON storage.objects;
DROP POLICY IF EXISTS "Public read profile-media" ON storage.objects;

-- 4) revoke execution of internal helpers from public roles
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.touch_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
-- has_role stays callable by authenticated so client can check own admin status
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
