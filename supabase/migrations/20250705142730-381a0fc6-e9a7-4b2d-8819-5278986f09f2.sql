-- First ensure the test company exists, then create test data
INSERT INTO public.companies (id, name, email, phone)
VALUES ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'TruckMate Test Company', 'company@truckmate.com', '+49123456789')
ON CONFLICT (id) DO UPDATE SET
  name = 'TruckMate Test Company',
  email = 'company@truckmate.com',
  phone = '+49123456789';

-- Now create test vehicles
INSERT INTO public.vehicles (license_plate, make, model, year, status, vehicle_type, company_id, location, mileage, fuel_type)
VALUES 
  ('MU-AB-123', 'Mercedes', 'Actros', 2022, 'active', 'truck', '123e4567-e89b-12d3-a456-426614174000'::uuid, 'München', 45000, 'Diesel'),
  ('B-CD-456', 'MAN', 'TGX', 2021, 'active', 'truck', '123e4567-e89b-12d3-a456-426614174000'::uuid, 'Berlin', 62000, 'Diesel'),
  ('HH-EF-789', 'Volvo', 'FH16', 2023, 'maintenance', 'truck', '123e4567-e89b-12d3-a456-426614174000'::uuid, 'Hamburg', 28000, 'Diesel')
ON CONFLICT (license_plate) DO NOTHING;