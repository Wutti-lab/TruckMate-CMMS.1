-- Create test data for all functions
-- Test vehicles
INSERT INTO public.vehicles (license_plate, make, model, year, status, vehicle_type, company_id, location, mileage, fuel_type, engine_size, next_service)
VALUES 
  ('MU-AB-123', 'Mercedes', 'Actros', 2022, 'active', 'truck', '123e4567-e89b-12d3-a456-426614174000', 'München', 45000, 'Diesel', '12.8L', '2025-08-15'),
  ('B-CD-456', 'MAN', 'TGX', 2021, 'active', 'truck', '123e4567-e89b-12d3-a456-426614174000', 'Berlin', 62000, 'Diesel', '10.5L', '2025-09-20'),
  ('HH-EF-789', 'Volvo', 'FH16', 2023, 'maintenance', 'truck', '123e4567-e89b-12d3-a456-426614174000', 'Hamburg', 28000, 'Diesel', '13.0L', '2025-07-30'),
  ('K-GH-012', 'Scania', 'R450', 2020, 'active', 'truck', '123e4567-e89b-12d3-a456-426614174000', 'Köln', 89000, 'Diesel', '11.7L', '2025-10-05'),
  ('F-IJ-345', 'Iveco', 'Daily', 2021, 'active', 'van', '123e4567-e89b-12d3-a456-426614174000', 'Frankfurt', 35000, 'Diesel', '3.0L', '2025-08-25')
ON CONFLICT (license_plate) DO UPDATE SET
  make = EXCLUDED.make,
  model = EXCLUDED.model,
  year = EXCLUDED.year,
  status = EXCLUDED.status,
  mileage = EXCLUDED.mileage,
  fuel_type = EXCLUDED.fuel_type,
  engine_size = EXCLUDED.engine_size,
  next_service = EXCLUDED.next_service;

-- Test customers  
INSERT INTO public.customers (name, email, phone, company, country, status, company_id, total_spent)
VALUES 
  ('BMW Group', 'logistics@bmw.com', '+49 89 382-0', 'BMW AG', 'Deutschland', 'active', '123e4567-e89b-12d3-a456-426614174000', 125000.50),
  ('Siemens Transport', 'shipping@siemens.com', '+49 89 636-0', 'Siemens AG', 'Deutschland', 'active', '123e4567-e89b-12d3-a456-426614174000', 89500.25),
  ('Deutsche Post', 'fleet@deutschepost.de', '+49 228 182-0', 'Deutsche Post DHL', 'Deutschland', 'active', '123e4567-e89b-12d3-a456-426614174000', 203400.75)
ON CONFLICT (name, company_id) DO UPDATE SET
  email = EXCLUDED.email,
  phone = EXCLUDED.phone,
  total_spent = EXCLUDED.total_spent;

-- Test parts for maintenance
INSERT INTO public.parts (name, part_number, category, description, stock_quantity, minimum_stock, unit_cost, company_id, supplier, location)
VALUES 
  ('Bremsbeläge vorne', 'BP-001', 'Bremsen', 'Vordere Bremsbeläge für Mercedes Actros', 25, 5, 89.50, '123e4567-e89b-12d3-a456-426614174000', 'Bosch', 'Lager A1'),
  ('Motoröl 15W-40', 'OIL-002', 'Motoröl', 'Hochleistungsmotoröl für Nutzfahrzeuge', 120, 20, 45.90, '123e4567-e89b-12d3-a456-426614174000', 'Shell', 'Lager B2'),
  ('Luftfilter', 'AF-003', 'Filter', 'Luftfilter für MAN TGX', 15, 3, 32.75, '123e4567-e89b-12d3-a456-426614174000', 'Mann Filter', 'Lager A2'),
  ('Reifen 315/80 R22.5', 'TR-004', 'Reifen', 'LKW-Reifen für schwere Nutzfahrzeuge', 8, 2, 245.00, '123e4567-e89b-12d3-a456-426614174000', 'Continental', 'Lager C1')
ON CONFLICT (part_number, company_id) DO UPDATE SET
  name = EXCLUDED.name,
  stock_quantity = EXCLUDED.stock_quantity,
  unit_cost = EXCLUDED.unit_cost;