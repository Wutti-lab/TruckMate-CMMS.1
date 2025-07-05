-- Create test data for all functions (without ON CONFLICT for now)
-- Test vehicles
INSERT INTO public.vehicles (license_plate, make, model, year, status, vehicle_type, company_id, location, mileage, fuel_type, engine_size, next_service)
SELECT 'MU-AB-123', 'Mercedes', 'Actros', 2022, 'active', 'truck', '123e4567-e89b-12d3-a456-426614174000', 'München', 45000, 'Diesel', '12.8L', '2025-08-15'::date
WHERE NOT EXISTS (SELECT 1 FROM public.vehicles WHERE license_plate = 'MU-AB-123')
UNION ALL
SELECT 'B-CD-456', 'MAN', 'TGX', 2021, 'active', 'truck', '123e4567-e89b-12d3-a456-426614174000', 'Berlin', 62000, 'Diesel', '10.5L', '2025-09-20'::date
WHERE NOT EXISTS (SELECT 1 FROM public.vehicles WHERE license_plate = 'B-CD-456')
UNION ALL
SELECT 'HH-EF-789', 'Volvo', 'FH16', 2023, 'maintenance', 'truck', '123e4567-e89b-12d3-a456-426614174000', 'Hamburg', 28000, 'Diesel', '13.0L', '2025-07-30'::date
WHERE NOT EXISTS (SELECT 1 FROM public.vehicles WHERE license_plate = 'HH-EF-789');

-- Test customers  
INSERT INTO public.customers (name, email, phone, company, country, status, company_id, total_spent)
SELECT 'BMW Group', 'logistics@bmw.com', '+49 89 382-0', 'BMW AG', 'Deutschland', 'active', '123e4567-e89b-12d3-a456-426614174000', 125000.50
WHERE NOT EXISTS (SELECT 1 FROM public.customers WHERE name = 'BMW Group' AND email = 'logistics@bmw.com')
UNION ALL
SELECT 'Siemens Transport', 'shipping@siemens.com', '+49 89 636-0', 'Siemens AG', 'Deutschland', 'active', '123e4567-e89b-12d3-a456-426614174000', 89500.25
WHERE NOT EXISTS (SELECT 1 FROM public.customers WHERE name = 'Siemens Transport' AND email = 'shipping@siemens.com');

-- Test parts for maintenance
INSERT INTO public.parts (name, part_number, category, description, stock_quantity, minimum_stock, unit_cost, company_id, supplier, location)
SELECT 'Bremsbeläge vorne', 'BP-001', 'Bremsen', 'Vordere Bremsbeläge für Mercedes Actros', 25, 5, 89.50, '123e4567-e89b-12d3-a456-426614174000', 'Bosch', 'Lager A1'
WHERE NOT EXISTS (SELECT 1 FROM public.parts WHERE part_number = 'BP-001')
UNION ALL
SELECT 'Motoröl 15W-40', 'OIL-002', 'Motoröl', 'Hochleistungsmotoröl für Nutzfahrzeuge', 120, 20, 45.90, '123e4567-e89b-12d3-a456-426614174000', 'Shell', 'Lager B2'
WHERE NOT EXISTS (SELECT 1 FROM public.parts WHERE part_number = 'OIL-002');