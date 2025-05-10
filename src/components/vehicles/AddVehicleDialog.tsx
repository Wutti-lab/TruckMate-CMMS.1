
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { AddVehicleForm } from "./AddVehicleForm";
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
  engineTemp: number;
}

interface AddVehicleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Vehicle) => void;
}

export function AddVehicleDialog({ open, onOpenChange, onSubmit }: AddVehicleDialogProps) {
  const { language } = useLanguage();
  
  const handleCancel = () => {
    onOpenChange(false);
  };

  const handleSubmit = (data: Vehicle) => {
    onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle>{extractLanguageText("Add New Vehicle | เพิ่มยานพาหนะใหม่ | Neues Fahrzeug hinzufügen", language)}</DialogTitle>
        </DialogHeader>
        <AddVehicleForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </DialogContent>
    </Dialog>
  );
}
