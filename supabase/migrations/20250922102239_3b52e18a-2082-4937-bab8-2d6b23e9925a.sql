-- Create admin user account
-- Note: This is just for setting up the role assignment, the actual user will sign up through the UI

-- Function to assign admin role to a specific email
CREATE OR REPLACE FUNCTION assign_admin_role_to_email(user_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    target_user_id uuid;
BEGIN
    -- Find user by email
    SELECT id INTO target_user_id 
    FROM auth.users 
    WHERE email = user_email;
    
    -- If user exists, assign admin role
    IF target_user_id IS NOT NULL THEN
        INSERT INTO public.user_roles (user_id, role)
        VALUES (target_user_id, 'admin')
        ON CONFLICT (user_id, role) DO NOTHING;
    END IF;
END;
$$;

-- Trigger to automatically assign admin role to wakemancapital@gmail.com when they sign up
CREATE OR REPLACE FUNCTION auto_assign_admin_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Check if this is the admin email
    IF NEW.email = 'wakemancapital@gmail.com' THEN
        INSERT INTO public.user_roles (user_id, role)
        VALUES (NEW.id, 'admin')
        ON CONFLICT (user_id, role) DO NOTHING;
    END IF;
    
    RETURN NEW;
END;
$$;

-- Create trigger for new user signups
DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_admin
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION auto_assign_admin_role();