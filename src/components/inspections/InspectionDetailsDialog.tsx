import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Inspection } from "./types/inspection-types";

interface InspectionDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  inspection: Inspection | null;
  isThaiLanguage: boolean;
  getStatusBadgeClass: (status: string) => string;
  onEdit: () => void;
}

export function InspectionDetailsDialog({
  isOpen,
  onClose,
  inspection,
  isThaiLanguage,
  getStatusBadgeClass,
  onEdit,
}: InspectionDetailsDialogProps) {
  if (!inspection) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isThaiLanguage ? "รายละเอียดการตรวจสอบ" : "Inspektionsdetails"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {isThaiLanguage ? "ยานพาหนะ" : "Fahrzeug"}
              </p>
              <p className="font-medium">{inspection.vehicleId}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {isThaiLanguage ? "ประเภท" : "Typ"}
              </p>
              <p className="font-medium">
                {isThaiLanguage ? inspection.type.th : inspection.type.en}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {isThaiLanguage ? "วันที่" : "Datum"}
              </p>
              <p className="font-medium">{inspection.date}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {isThaiLanguage ? "สถานะ" : "Status"}
              </p>
              <Badge
                variant="outline"
                className={getStatusBadgeClass(
                  isThaiLanguage ? inspection.status.th : inspection.status.en
                )}
              >
                {isThaiLanguage ? inspection.status.th : inspection.status.en}
              </Badge>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium text-muted-foreground">
                {isThaiLanguage ? "ความคืบหน้า" : "Fortschritt"}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div
                    className="h-2 rounded-full bg-fleet-500"
                    style={{
                      width: `${
                        (inspection.completedItems / inspection.totalItems) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm">
                  {inspection.completedItems}/{inspection.totalItems}
                </span>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={onClose}
          >
            {isThaiLanguage ? "ปิด" : "Schließen"}
          </Button>
          <Button onClick={onEdit}>
            {isThaiLanguage ? "แก้ไข" : "Bearbeiten"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
