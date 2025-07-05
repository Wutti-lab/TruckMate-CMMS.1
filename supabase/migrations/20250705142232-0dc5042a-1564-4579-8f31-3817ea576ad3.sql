-- Create test user profiles for login testing
-- First ensure we have a test company
INSERT INTO public.companies (id, name, email, phone)
VALUES 
  ('123e4567-e89b-12d3-a456-426614174000', 'TruckMate Test Company', 'company@truckmate.com', '+49123456789')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  email = EXCLUDED.email,
  phone = EXCLUDED.phone;

-- Create test profiles that users can use to login
INSERT INTO public.profiles (id, email, full_name, role, company_id, language)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'admin@truckmate.com', 'Admin User', 'admin', '123e4567-e89b-12d3-a456-426614174000', 'de'),
  ('22222222-2222-2222-2222-222222222222', 'manager@truckmate.com', 'Fleet Manager', 'manager', '123e4567-e89b-12d3-a456-426614174000', 'de'),
  ('33333333-3333-3333-3333-333333333333', 'driver@truckmate.com', 'Test Driver', 'driver', '123e4567-e89b-12d3-a456-426614174000', 'de'),
  ('44444444-4444-4444-4444-444444444444', 'technician@truckmate.com', 'Test Technician', 'technician', '123e4567-e89b-12d3-a456-426614174000', 'de')
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  company_id = EXCLUDED.company_id,
  language = EXCLUDED.language;

-- Create some test vehicles for the fleet
INSERT INTO public.vehicles (license_plate, make, model, year, status, vehicle_type, company_id, location, mileage, fuel_type)
VALUES 
  ('MU-AB-123', 'Mercedes', 'Actros', 2022, 'active', 'truck', '123e4567-e89b-12d3-a456-426614174000', 'München', 45000, 'Diesel'),
  ('B-CD-456', 'MAN', 'TGX', 2021, 'active', 'truck', '123e4567-e89b-12d3-a456-426614174000', 'Berlin', 62000, 'Diesel'),
  ('HH-EF-789', 'Volvo', 'FH16', 2023, 'maintenance', 'truck', '123e4567-e89b-12d3-a456-426614174000', 'Hamburg', 28000, 'Diesel')
ON CONFLICT (license_plate) DO UPDATE SET
  make = EXCLUDED.make,
  model = EXCLUDED.model,
  year = EXCLUDED.year,
  status = EXCLUDED.status;