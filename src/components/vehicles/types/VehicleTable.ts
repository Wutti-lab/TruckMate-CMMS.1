interface Vehicle {
  id: string;
  license_plate: string;
  make?: string;
  model?: string;
  year?: number;
  vin?: string;
  vehicle_type?: string;
  status: string;
  location?: string;
  mileage?: number;
  fuel_type?: string;
  engine_size?: string;
  insurance_expiry?: string;
  registration_expiry?: string;
  next_service?: string;
  lat?: number;
  lng?: number;
  company_id?: string;
  created_at?: string;
  updated_at?: string;
}

export type { Vehicle };