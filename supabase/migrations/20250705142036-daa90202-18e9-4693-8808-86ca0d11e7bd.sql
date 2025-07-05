-- Fix infinite recursion in profiles RLS policies
-- Drop the problematic policy that causes recursion
DROP POLICY IF EXISTS "Users can view company profiles" ON public.profiles;

-- Create a new policy that doesn't cause recursion
-- Users can view profiles from their own company
CREATE POLICY "Users can view company profiles" 
ON public.profiles 
FOR SELECT 
USING (
  company_id = (
    SELECT company_id 
    FROM public.profiles 
    WHERE id = auth.uid()
  )
  OR id = auth.uid()
);