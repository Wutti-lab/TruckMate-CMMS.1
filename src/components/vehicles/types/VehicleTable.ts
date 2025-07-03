interface Vehicle {
  id: string;
  license_plate: string;
  model: string;
  status: string;
  location: string;
  fuel_level: number;
  battery_level: number;
  engine_temp: number;
  last_service: string;
  next_service: string;
}

export type { Vehicle };