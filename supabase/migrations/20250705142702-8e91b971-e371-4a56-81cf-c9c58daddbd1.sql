-- Create test data with proper UUID casting
-- Test vehicles
INSERT INTO public.vehicles (license_plate, make, model, year, status, vehicle_type, company_id, location, mileage, fuel_type, engine_size, next_service)
SELECT 'MU-AB-123', 'Mercedes', 'Actros', 2022, 'active', 'truck', '123e4567-e89b-12d3-a456-426614174000'::uuid, 'München', 45000, 'Diesel', '12.8L', '2025-08-15'::date
WHERE NOT EXISTS (SELECT 1 FROM public.vehicles WHERE license_plate = 'MU-AB-123')
UNION ALL
SELECT 'B-CD-456', 'MAN', 'TGX', 2021, 'active', 'truck', '123e4567-e89b-12d3-a456-426614174000'::uuid, 'Berlin', 62000, 'Diesel', '10.5L', '2025-09-20'::date
WHERE NOT EXISTS (SELECT 1 FROM public.vehicles WHERE license_plate = 'B-CD-456')
UNION ALL
SELECT 'HH-EF-789', 'Volvo', 'FH16', 2023, 'maintenance', 'truck', '123e4567-e89b-12d3-a456-426614174000'::uuid, 'Hamburg', 28000, 'Diesel', '13.0L', '2025-07-30'::date
WHERE NOT EXISTS (SELECT 1 FROM public.vehicles WHERE license_plate = 'HH-EF-789');

-- Test customers  
INSERT INTO public.customers (name, email, phone, company, country, status, company_id, total_spent)
SELECT 'BMW Group', 'logistics@bmw.com', '+49 89 382-0', 'BMW AG', 'Deutschland', 'active', '123e4567-e89b-12d3-a456-426614174000'::uuid, 125000.50
WHERE NOT EXISTS (SELECT 1 FROM public.customers WHERE name = 'BMW Group' AND email = 'logistics@bmw.com')
UNION ALL
SELECT 'Siemens Transport', 'shipping@siemens.com', '+49 89 636-0', 'Siemens AG', 'Deutschland', 'active', '123e4567-e89b-12d3-a456-426614174000'::uuid, 89500.25
WHERE NOT EXISTS (SELECT 1 FROM public.customers WHERE name = 'Siemens Transport' AND email = 'shipping@siemens.com');