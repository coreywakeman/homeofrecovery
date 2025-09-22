-- Clean up stuck auth user so signup can succeed
DO $$
DECLARE
  uid uuid;
BEGIN
  SELECT id INTO uid FROM auth.users WHERE email = 'wakemancapital@gmail.com';
  IF uid IS NOT NULL THEN
    -- Remove dependent rows first
    DELETE FROM public.user_roles WHERE user_id = uid;
    DELETE FROM public.profiles WHERE id = uid;
    -- Delete user
    DELETE FROM auth.users WHERE id = uid;
  END IF;
END $$;