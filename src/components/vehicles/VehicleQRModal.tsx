
import { QrCode } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import QRCode from "react-qr-code";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";

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
  engineTemp?: number;
}

interface VehicleQRModalProps {
  vehicle: Vehicle;
}

// Mock driver data - in a real app this would come from your backend
const driversData = [
  {
    id: "D001",
    name: "Max Müller",
    licenseType: "Class 1",
    phone: "+66 81 234 5678",
    status: "Active",
    location: "Bangkok, Silom",
    hoursThisWeek: 32,
    shift: "AM"
  },
  {
    id: "D002",
    name: "Lisa Schmidt",
    licenseType: "Class 2",
    phone: "+66 89 876 5432",
    status: "Off-duty",
    location: "Bangkok, Sukhumvit",
    hoursThisWeek: 28,
    shift: "PM"
  },
  {
    id: "D003",
    name: "Jan Weber",
    licenseType: "Class 1",
    phone: "+66 85 555 4321",
    status: "On Trip",
    location: "Chiang Mai",
    hoursThisWeek: 40,
    shift: "AM"
  },
];

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
  const { language } = useLanguage();
  
  // Get parts for this specific vehicle
  const vehicleReplacementParts = vehicleParts.filter(part => part.vehicleId === vehicle.id);
  
  // Get driver for this vehicle
  const driver = driversData.find(driver => driver.name === vehicle.driver);

  // Process part names and suppliers to extract only the current language text
  const processedParts = vehicleReplacementParts.map(part => ({
    ...part,
    name: extractLanguageText(part.name, language),
    supplier: extractLanguageText(part.supplier, language)
  }));

  // Create a comprehensive data structure for the QR code that includes all necessary information
  const qrData = {
    type: "vehicle-data",
    version: "1.0",
    vehicle: {
      id: vehicle.id,
      model: vehicle.model,
      driver: vehicle.driver,
      status: vehicle.status,
      location: vehicle.location,
      nextService: vehicle.nextService,
      fuelLevel: vehicle.fuelLevel,
      batteryLevel: vehicle.batteryLevel,
      lastService: vehicle.lastService,
      engineTemp: vehicle.engineTemp || null // Ensure engine temperature is included
    },
    driver: driver ? {
      id: driver.id,
      name: driver.name,
      licenseType: driver.licenseType,
      phone: driver.phone,
      status: driver.status,
      hoursThisWeek: driver.hoursThisWeek,
      shift: driver.shift
    } : null,
    replacementParts: processedParts.map(part => ({
      name: part.name,
      installedDate: part.installedDate,
      supplier: part.supplier,
      warrantyEnd: part.warrantyEnd
    }))
  };

  const serializedData = JSON.stringify(qrData);

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
          <DialogDescription>
            {extractLanguageText("Scan with TruckMate QR Scanner | สแกนด้วยเครื่องสแกนคิวอาร์โค้ด TruckMate", language)}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-6 space-y-4">
          <QRCode
            value={serializedData}
            size={256}
            title="Vehicle QR Code"
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            viewBox="0 0 256 256"
          />
          <p className="text-sm text-muted-foreground text-center">
            {extractLanguageText("Scan to view complete vehicle, driver and parts details | สแกนเพื่อดูรายละเอียดทั้งหมดของยานพาหนะ คนขับและชิ้นส่วน", language)}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
