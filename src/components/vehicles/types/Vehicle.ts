
export interface Vehicle {
  id: string;
  driver: string;
  model: string;
  location: string;
  status: string;
  fuelLevel: number;
  batteryLevel: number;
  lastService: string;
  nextService: string;
  engineTemp: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
  lastUpdated?: string;
}

export interface HealthMetrics {
  batteryVoltage: string;
  oilLevel: string;
  oilPressure: string;
  coolantLevel: string;
  airFilter: string;
  brakeFluid: string;
  tireWear: {
    frontLeft: string;
    frontRight: string;
    rearLeft: string;
    rearRight: string;
  }
}

export interface MaintenanceRecord {
  date: string;
  type: string;
  cost: string;
  notes: string;
}
