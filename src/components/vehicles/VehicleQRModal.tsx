
import { QrCode } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import QRCode from "react-qr-code";

interface Vehicle {
  id: string;
  driver: string;
  model: string;
  location: string;
  status: string;
  fuelLevel: number;
  batteryLevel: number;
  lastService: string;
  nextService: string;
}

interface VehicleQRModalProps {
  vehicle: Vehicle;
}

// Mock parts data - in a real app this would come from your backend
const vehicleParts = [
  {
    id: "P001",
    name: "Brake Pads | ผ้าเบรก",
    installedDate: "2024-03-15",
    supplier: "BrakeTech Co. | เบรคเทค จำกัด",
    warrantyEnd: "2025-03-15",
    vehicleId: "B-FR-123",
    vehicleModel: "Tesla Model Y"
  },
  {
    id: "P002",
    name: "Air Filter | กรองอากาศ",
    installedDate: "2024-02-20",
    supplier: "FilterPro | ฟิลเตอร์โปร",
    warrantyEnd: "2025-02-20",
    vehicleId: "B-FR-234",
    vehicleModel: "VW ID.4"
  },
  {
    id: "P003",
    name: "Battery | แบตเตอรี่",
    installedDate: "2024-01-10",
    supplier: "PowerCell | พาวเวอร์เซลล์",
    warrantyEnd: "2026-01-10",
    vehicleId: "B-FR-345",
    vehicleModel: "Audi e-tron"
  },
];

export function VehicleQRModal({ vehicle }: VehicleQRModalProps) {
  // Get parts for this specific vehicle
  const vehicleReplacementParts = vehicleParts.filter(part => part.vehicleId === vehicle.id);

  // Create a URL-friendly string of vehicle and parts data
  const vehicleData = JSON.stringify({
    id: vehicle.id,
    model: vehicle.model,
    driver: vehicle.driver,
    status: vehicle.status,
    location: vehicle.location,
    nextService: vehicle.nextService,
    replacementParts: vehicleReplacementParts.map(part => ({
      name: part.name,
      installedDate: part.installedDate,
      supplier: part.supplier,
      warrantyEnd: part.warrantyEnd
    }))
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-gray-100">
          <QrCode className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{vehicle.id} | QR Code</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-6 space-y-4">
          <QRCode
            value={vehicleData}
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            viewBox="0 0 256 256"
          />
          <p className="text-sm text-muted-foreground text-center">
            Scan to view vehicle and parts details | สแกนเพื่อดูรายละเอียดยานพาหนะและชิ้นส่วน
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
