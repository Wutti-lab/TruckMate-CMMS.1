-- Create customers table for customer management
CREATE TABLE public.customers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES public.companies(id),
  name TEXT NOT NULL,
  company TEXT,
  email TEXT,
  phone TEXT,
  country TEXT,
  status TEXT DEFAULT 'active',
  registration_date DATE DEFAULT CURRENT_DATE,
  total_spent DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS for customers table
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for customers - users can access customers from their company
CREATE POLICY "Company users can access customers" 
ON public.customers 
FOR ALL 
USING (company_id IN (
  SELECT company_id 
  FROM profiles 
  WHERE id = auth.uid()
));

-- Create licenses table for customer licenses
CREATE TABLE public.licenses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
  license_number TEXT NOT NULL,
  license_type TEXT,
  issue_date DATE,
  expiry_date DATE,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS for licenses table
ALTER TABLE public.licenses ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for licenses - users can access licenses for customers from their company
CREATE POLICY "Company users can access licenses" 
ON public.licenses 
FOR ALL 
USING (customer_id IN (
  SELECT id FROM customers 
  WHERE company_id IN (
    SELECT company_id 
    FROM profiles 
    WHERE id = auth.uid()
  )
));

-- Create trigger for automatic timestamp updates on customers
CREATE TRIGGER update_customers_updated_at
  BEFORE UPDATE ON public.customers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for automatic timestamp updates on licenses
CREATE TRIGGER update_licenses_updated_at
  BEFORE UPDATE ON public.licenses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();