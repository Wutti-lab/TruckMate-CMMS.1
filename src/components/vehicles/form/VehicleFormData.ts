import { Vehicle } from "../types/VehicleTable";

export interface VehicleFormData {
  license_plate: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  vehicle_type: string;
  status: string;
  location: string;
  mileage: number;
  fuel_type: string;
  engine_size: string;
  next_service: string;
}

export const getDefaultFormData = (): VehicleFormData => ({
  license_plate: "",
  make: "",
  model: "",
  year: new Date().getFullYear(),
  vin: "",
  vehicle_type: "truck",
  status: "active",
  location: "",
  mileage: 0,
  fuel_type: "",
  engine_size: "",
  next_service: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
});

export const vehicleToFormData = (vehicle: Vehicle): VehicleFormData => ({
  license_plate: vehicle.license_plate,
  make: vehicle.make || "",
  model: vehicle.model || "",
  year: vehicle.year || new Date().getFullYear(),
  vin: vehicle.vin || "",
  vehicle_type: vehicle.vehicle_type || "truck",
  status: vehicle.status,
  location: vehicle.location || "",
  mileage: vehicle.mileage || 0,
  fuel_type: vehicle.fuel_type || "",
  engine_size: vehicle.engine_size || "",
  next_service: vehicle.next_service ? new Date(vehicle.next_service).toISOString().split('T')[0] : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
});