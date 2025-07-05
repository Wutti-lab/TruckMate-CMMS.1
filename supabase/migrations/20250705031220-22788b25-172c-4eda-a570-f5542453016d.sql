-- Create core tables for TruckMate CMMS

-- Companies/Tenants table
CREATE TABLE public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- User profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id UUID REFERENCES public.companies(id),
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'technician', 'driver', 'manager')),
  language TEXT DEFAULT 'en' CHECK (language IN ('en', 'de', 'th')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Vehicles table
CREATE TABLE public.vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.companies(id),
  license_plate TEXT NOT NULL,
  vin TEXT,
  make TEXT,
  model TEXT,
  year INTEGER,
  vehicle_type TEXT DEFAULT 'truck' CHECK (vehicle_type IN ('truck', 'trailer', 'van', 'bus')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'maintenance', 'inactive', 'retired')),
  mileage INTEGER DEFAULT 0,
  fuel_type TEXT,
  engine_size TEXT,
  insurance_expiry DATE,
  registration_expiry DATE,
  next_service DATE,
  location TEXT,
  lat DECIMAL,
  lng DECIMAL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Drivers table
CREATE TABLE public.drivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.companies(id),
  user_id UUID REFERENCES public.profiles(id),
  employee_id TEXT,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  license_number TEXT,
  license_expiry DATE,
  medical_cert_expiry DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'on_leave')),
  hire_date DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Vehicle assignments (drivers to vehicles)
CREATE TABLE public.vehicle_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE,
  driver_id UUID REFERENCES public.drivers(id) ON DELETE CASCADE,
  assigned_at TIMESTAMPTZ DEFAULT now(),
  active BOOLEAN DEFAULT true,
  UNIQUE(vehicle_id, driver_id, active)
);

-- Work Orders table
CREATE TABLE public.work_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.companies(id),
  vehicle_id UUID REFERENCES public.vehicles(id),
  assigned_to UUID REFERENCES public.drivers(id),
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('critical', 'high', 'medium', 'low')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  work_type TEXT DEFAULT 'maintenance' CHECK (work_type IN ('maintenance', 'repair', 'inspection', 'service')),
  scheduled_date DATE,
  completed_date DATE,
  estimated_hours DECIMAL,
  actual_hours DECIMAL,
  cost DECIMAL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Inspections table
CREATE TABLE public.inspections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.companies(id),
  vehicle_id UUID REFERENCES public.vehicles(id),
  inspector_id UUID REFERENCES public.drivers(id),
  type TEXT NOT NULL CHECK (type IN ('daily', 'weekly', 'monthly', 'annual', 'pre_trip', 'post_trip')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'failed')),
  inspection_date DATE NOT NULL,
  checklist_data JSONB,
  notes TEXT,
  passed BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Parts/Inventory table
CREATE TABLE public.parts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.companies(id),
  part_number TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  unit_cost DECIMAL DEFAULT 0,
  stock_quantity INTEGER DEFAULT 0,
  minimum_stock INTEGER DEFAULT 0,
  supplier TEXT,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Work Order Parts (junction table)
CREATE TABLE public.work_order_parts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  work_order_id UUID REFERENCES public.work_orders(id) ON DELETE CASCADE,
  part_id UUID REFERENCES public.parts(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_cost DECIMAL DEFAULT 0
);

-- Enable Row Level Security
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicle_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inspections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_order_parts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for multi-tenant access
CREATE POLICY "Users can view their company data" ON public.companies
  FOR ALL USING (id IN (
    SELECT company_id FROM public.profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Users can manage their profile" ON public.profiles
  FOR ALL USING (id = auth.uid());

CREATE POLICY "Users can view company profiles" ON public.profiles
  FOR SELECT USING (company_id IN (
    SELECT company_id FROM public.profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Company users can access vehicles" ON public.vehicles
  FOR ALL USING (company_id IN (
    SELECT company_id FROM public.profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Company users can access drivers" ON public.drivers
  FOR ALL USING (company_id IN (
    SELECT company_id FROM public.profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Company users can access vehicle assignments" ON public.vehicle_assignments
  FOR ALL USING (vehicle_id IN (
    SELECT id FROM public.vehicles WHERE company_id IN (
      SELECT company_id FROM public.profiles WHERE id = auth.uid()
    )
  ));

CREATE POLICY "Company users can access work orders" ON public.work_orders
  FOR ALL USING (company_id IN (
    SELECT company_id FROM public.profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Company users can access inspections" ON public.inspections
  FOR ALL USING (company_id IN (
    SELECT company_id FROM public.profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Company users can access parts" ON public.parts
  FOR ALL USING (company_id IN (
    SELECT company_id FROM public.profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Company users can access work order parts" ON public.work_order_parts
  FOR ALL USING (work_order_id IN (
    SELECT id FROM public.work_orders WHERE company_id IN (
      SELECT company_id FROM public.profiles WHERE id = auth.uid()
    )
  ));

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON public.companies FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON public.vehicles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_drivers_updated_at BEFORE UPDATE ON public.drivers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_work_orders_updated_at BEFORE UPDATE ON public.work_orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_inspections_updated_at BEFORE UPDATE ON public.inspections FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_parts_updated_at BEFORE UPDATE ON public.parts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for development
INSERT INTO public.companies (id, name, email, phone) VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Demo Transport Company', 'demo@truckmate.com', '+1-555-0123');

-- Enable realtime for all tables
ALTER TABLE public.vehicles REPLICA IDENTITY FULL;
ALTER TABLE public.drivers REPLICA IDENTITY FULL;
ALTER TABLE public.inspections REPLICA IDENTITY FULL;
ALTER TABLE public.work_orders REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.vehicles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.drivers;
ALTER PUBLICATION supabase_realtime ADD TABLE public.inspections;
ALTER PUBLICATION supabase_realtime ADD TABLE public.work_orders;