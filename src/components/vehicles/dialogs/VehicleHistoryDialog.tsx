
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { History } from "lucide-react";
import { Vehicle } from "../types/Vehicle";
import { MaintenanceRecord } from "../types/Vehicle";

interface VehicleHistoryDialogProps {
  vehicle: Vehicle;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VehicleHistoryDialog({ vehicle, open, onOpenChange }: VehicleHistoryDialogProps) {
  // Mock maintenance history
  const maintenanceHistory: MaintenanceRecord[] = [
    { date: "15.03.2023", type: "Regular Service", cost: "12,500 ฿", notes: "Oil change, filter replacement" },
    { date: "22.09.2022", type: "Tire Replacement", cost: "24,800 ฿", notes: "Replaced all tires" },
    { date: "05.06.2022", type: "Battery Service", cost: "3,200 ฿", notes: "Battery check and cleaning" },
    { date: "12.03.2022", type: "Full Inspection", cost: "8,500 ฿", notes: "Annual inspection passed" },
    { date: "25.11.2021", type: "Brake Repair", cost: "15,300 ฿", notes: "Front brake pads replaced" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History size={18} className="text-fleet-500" />
            Maintenance History | Wartungshistorie
            <Badge className="ml-2">{vehicle.id}</Badge>
          </DialogTitle>
          <DialogDescription>
            Complete service and maintenance records | Vollständige Service- und Wartungsaufzeichnungen
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-left text-sm text-muted-foreground">
                <th className="px-4 py-2">Date | Datum</th>
                <th className="px-4 py-2">Service Type | Serviceart</th>
                <th className="px-4 py-2">Cost | Kosten</th>
                <th className="px-4 py-2">Notes | Anmerkungen</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceHistory.map((record, i) => (
                <tr key={i} className="border-b">
                  <td className="px-4 py-3 font-medium">{record.date}</td>
                  <td className="px-4 py-3">{record.type}</td>
                  <td className="px-4 py-3">{record.cost}</td>
                  <td className="px-4 py-3 text-sm">{record.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between mt-4">
          <div>
            <p className="text-sm font-medium">Total maintenance costs | Gesamtwartungskosten</p>
            <p className="text-lg font-bold">64,300 ฿</p>
          </div>
          <div>
            <p className="text-sm font-medium">Average monthly cost | Durchschnittliche monatliche Kosten</p>
            <p className="text-lg font-bold">3,573 ฿</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close | Schließen</Button>
          <Button>Export Report | Bericht exportieren</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
