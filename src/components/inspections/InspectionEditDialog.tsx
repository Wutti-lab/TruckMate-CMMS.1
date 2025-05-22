
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface InspectionEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  isThaiLanguage: boolean;
  onSave: () => void;
}

export function InspectionEditDialog({
  isOpen,
  onClose,
  isThaiLanguage,
  onSave,
}: InspectionEditDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isThaiLanguage ? "แก้ไขการตรวจสอบ" : "Inspektion bearbeiten"}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {/* Form would go here in a real implementation */}
          <p className="text-center text-muted-foreground">
            {isThaiLanguage
              ? "ฟอร์มแก้ไขการตรวจสอบจะแสดงที่นี่"
              : "Hier würde das Bearbeitungsformular angezeigt werden"}
          </p>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={onClose}
          >
            {isThaiLanguage ? "ยกเลิก" : "Abbrechen"}
          </Button>
          <Button onClick={onSave}>
            {isThaiLanguage ? "บันทึก" : "Speichern"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
