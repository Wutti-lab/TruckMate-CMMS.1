-- Create test user accounts with profiles
-- Note: In a real app, users would sign up through the UI, but for testing we'll create them directly

-- First, let's create a company for the test users
INSERT INTO public.companies (id, name, email, phone)
VALUES 
  ('123e4567-e89b-12d3-a456-426614174000', 'TruckMate Test Company', 'company@truckmate.com', '+49123456789')
ON CONFLICT (id) DO NOTHING;

-- Create profiles for test users (these will be linked when users sign up)
INSERT INTO public.profiles (id, email, full_name, role, company_id, language)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'admin@truckmate.com', 'Admin User', 'admin', '123e4567-e89b-12d3-a456-426614174000', 'de'),
  ('22222222-2222-2222-2222-222222222222', 'manager@truckmate.com', 'Fleet Manager', 'fleet_manager', '123e4567-e89b-12d3-a456-426614174000', 'de'),
  ('33333333-3333-3333-3333-333333333333', 'driver@truckmate.com', 'Test Driver', 'driver', '123e4567-e89b-12d3-a456-426614174000', 'de'),
  ('44444444-4444-4444-4444-444444444444', 'mechanic@truckmate.com', 'Test Mechanic', 'mechanic', '123e4567-e89b-12d3-a456-426614174000', 'de')
ON CONFLICT (id) DO NOTHING;