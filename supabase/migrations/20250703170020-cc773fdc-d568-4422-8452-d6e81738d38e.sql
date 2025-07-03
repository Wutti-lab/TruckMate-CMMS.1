-- Create profile for admin user (without conflict handling since profiles table doesn't have unique constraints on email)
INSERT INTO public.profiles (
  id,
  name,
  role,
  phone_number,
  company,
  job_title,
  activation_date,
  expiry_date
) VALUES (
  gen_random_uuid(),
  'Admin User - wuphaa@gmail.com',
  'admin',
  null,
  'TruckMate CMMS',
  'System Administrator', 
  current_date,
  current_date + interval '1 year'
);