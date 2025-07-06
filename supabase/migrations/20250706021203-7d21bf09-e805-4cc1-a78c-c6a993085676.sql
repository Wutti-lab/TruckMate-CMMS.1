-- Fix infinite recursion in profiles RLS policies
-- First drop the problematic policy
DROP POLICY IF EXISTS "Users can view company profiles" ON public.profiles;

-- Create a security definer function to get user's company_id safely
CREATE OR REPLACE FUNCTION public.get_user_company_id(user_id uuid)
RETURNS uuid
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT company_id FROM public.profiles WHERE id = user_id;
$$;

-- Create a new policy that doesn't cause recursion
CREATE POLICY "Users can view company profiles" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (
  company_id = public.get_user_company_id(auth.uid()) 
  OR id = auth.uid()
);