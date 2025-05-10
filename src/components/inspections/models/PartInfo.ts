
export interface PartInfo {
  id: string;
  name: string;
  installedDate: string;
  supplier: string;
  warrantyEnd: string;
  vehicleId: string;
  vehicleModel: string;
}

// Initial vehicle parts data
export const initialVehicleParts: PartInfo[] = [
  {
    id: "P001",
    name: "Brake Pads | Bremsbeläge",
    installedDate: "2024-03-15",
    supplier: "BrakeTech Co. | BrakeTech GmbH",
    warrantyEnd: "2025-03-15",
    vehicleId: "B-FR-123",
    vehicleModel: "Tesla Model Y"
  },
  {
    id: "P002",
    name: "Air Filter | Luftfilter",
    installedDate: "2024-02-20",
    supplier: "FilterPro | FilterPro GmbH",
    warrantyEnd: "2025-02-20",
    vehicleId: "B-FR-234",
    vehicleModel: "VW ID.4"
  },
  {
    id: "P003",
    name: "Battery | Batterie",
    installedDate: "2024-01-10",
    supplier: "PowerCell | PowerCell GmbH",
    warrantyEnd: "2026-01-10",
    vehicleId: "B-FR-345",
    vehicleModel: "Audi e-tron"
  },
];
