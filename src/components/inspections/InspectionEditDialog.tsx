
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InspectionEditForm } from "./form/InspectionEditForm";
import { Inspection } from "./types/inspection-types";

interface InspectionEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  isThaiLanguage: boolean;
  onSave: () => void;
  inspection: Inspection | null;
}

export function InspectionEditDialog({
  isOpen,
  onClose,
  isThaiLanguage,
  onSave,
  inspection,
}: InspectionEditDialogProps) {
  const handleSubmit = () => {
    // Form submission is handled by the form component
    onSave();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isThaiLanguage ? "แก้ไขการตรวจสอบ" : "Inspektion bearbeiten"}
          </DialogTitle>
        </DialogHeader>
        
        {inspection && (
          <InspectionEditForm 
            inspection={inspection} 
            isThaiLanguage={isThaiLanguage} 
            onSubmit={handleSubmit}
          />
        )}
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={onClose}
          >
            {isThaiLanguage ? "ยกเลิก" : "Abbrechen"}
          </Button>
          <Button 
            type="submit"
            form="inspection-edit-form" // Connect to the form id
          >
            {isThaiLanguage ? "บันทึก" : "Speichern"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
