
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

export function VehicleQRModal({ vehicle }: VehicleQRModalProps) {
  // Create a URL-friendly string of vehicle data
  const vehicleData = JSON.stringify({
    id: vehicle.id,
    model: vehicle.model,
    driver: vehicle.driver,
    status: vehicle.status,
    location: vehicle.location,
    nextService: vehicle.nextService,
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
            Scan to view vehicle details | สแกนเพื่อดูรายละเอียดยานพาหนะ
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
