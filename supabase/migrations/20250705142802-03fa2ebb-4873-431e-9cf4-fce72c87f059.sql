-- Create test data for the app
-- First ensure the test company exists
INSERT INTO public.companies (id, name, email, phone)
VALUES ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'TruckMate Test Company', 'company@truckmate.com', '+49123456789');

-- Create test vehicles for demo
INSERT INTO public.vehicles (license_plate, make, model, year, status, vehicle_type, company_id, location, mileage, fuel_type)
VALUES 
  ('MU-AB-123', 'Mercedes', 'Actros', 2022, 'active', 'truck', '123e4567-e89b-12d3-a456-426614174000'::uuid, 'München', 45000, 'Diesel'),
  ('B-CD-456', 'MAN', 'TGX', 2021, 'active', 'truck', '123e4567-e89b-12d3-a456-426614174000'::uuid, 'Berlin', 62000, 'Diesel'),
  ('HH-EF-789', 'Volvo', 'FH16', 2023, 'maintenance', 'truck', '123e4567-e89b-12d3-a456-426614174000'::uuid, 'Hamburg', 28000, 'Diesel');

-- Create some test customers
INSERT INTO public.customers (name, email, phone, company, country, status, company_id, total_spent)
VALUES 
  ('BMW Group', 'logistics@bmw.com', '+49 89 382-0', 'BMW AG', 'Deutschland', 'active', '123e4567-e89b-12d3-a456-426614174000'::uuid, 125000.50),
  ('Siemens Transport', 'shipping@siemens.com', '+49 89 636-0', 'Siemens AG', 'Deutschland', 'active', '123e4567-e89b-12d3-a456-426614174000'::uuid, 89500.25);