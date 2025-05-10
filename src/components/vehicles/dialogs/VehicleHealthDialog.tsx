
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { Vehicle } from "../types/Vehicle";

interface VehicleHealthDialogProps {
  vehicle: Vehicle;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VehicleHealthDialog({ vehicle, open, onOpenChange }: VehicleHealthDialogProps) {
  // Mock health metrics
  const healthMetrics = {
    batteryVoltage: "12.6V",
    oilLevel: "Optimal",
    oilPressure: "45 PSI",
    coolantLevel: "85%",
    airFilter: "Good",
    brakeFluid: "70%",
    tireWear: {
      frontLeft: "80%",
      frontRight: "82%",
      rearLeft: "75%",
      rearRight: "78%"
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-fleet-500" />
            Vehicle Health | Fahrzeugzustand 
            <Badge className="ml-2">{vehicle.id}</Badge>
          </DialogTitle>
          <DialogDescription>
            Current health metrics and diagnostics | Aktuelle Gesundheitswerte und Diagnose
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Battery Voltage | Batteriespannung</p>
              <p className="font-medium">{healthMetrics.batteryVoltage}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Oil Pressure | Öldruck</p>
              <p className="font-medium">{healthMetrics.oilPressure}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Oil Level | Ölstand</p>
              <p className="font-medium">{healthMetrics.oilLevel}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Coolant Level | Kühlmittelstand</p>
              <p className="font-medium">{healthMetrics.coolantLevel}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Air Filter | Luftfilter</p>
              <p className="font-medium">{healthMetrics.airFilter}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Brake Fluid | Bremsflüssigkeit</p>
              <p className="font-medium">{healthMetrics.brakeFluid}</p>
            </div>
          </div>

          <div className="rounded-md bg-gray-50 p-3">
            <h4 className="font-medium mb-2">Tire Wear | Reifenverschleiß</h4>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="inline-block w-12 h-12 rounded-full border-4 border-fleet-500 text-fleet-700 flex items-center justify-center font-bold">
                  {healthMetrics.tireWear.frontLeft}
                </div>
                <p className="text-xs mt-1">Front Left | Vorne Links</p>
              </div>
              <div className="text-center">
                <div className="inline-block w-12 h-12 rounded-full border-4 border-fleet-500 text-fleet-700 flex items-center justify-center font-bold">
                  {healthMetrics.tireWear.frontRight}
                </div>
                <p className="text-xs mt-1">Front Right | Vorne Rechts</p>
              </div>
              <div className="text-center">
                <div className="inline-block w-12 h-12 rounded-full border-4 border-fleet-500 text-fleet-700 flex items-center justify-center font-bold">
                  {healthMetrics.tireWear.rearLeft}
                </div>
                <p className="text-xs mt-1">Rear Left | Hinten Links</p>
              </div>
              <div className="text-center">
                <div className="inline-block w-12 h-12 rounded-full border-4 border-fleet-500 text-fleet-700 flex items-center justify-center font-bold">
                  {healthMetrics.tireWear.rearRight}
                </div>
                <p className="text-xs mt-1">Rear Right | Hinten Rechts</p>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close | Schließen</Button>
          <Button>Schedule Service | Wartung planen</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
