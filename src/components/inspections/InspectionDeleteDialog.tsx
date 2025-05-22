
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface InspectionDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  isThaiLanguage: boolean;
  onConfirm: () => void;
}

export function InspectionDeleteDialog({
  isOpen,
  onClose,
  isThaiLanguage,
  onConfirm,
}: InspectionDeleteDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isThaiLanguage ? "ยืนยันการลบ" : "Löschen bestätigen"}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>
            {isThaiLanguage
              ? "คุณแน่ใจหรือไม่ว่าต้องการลบการตรวจสอบนี้? การกระทำนี้ไม่สามารถเปลี่ยนกลับได้"
              : "Sind Sie sicher, dass Sie diese Inspektion löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden."}
          </p>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={onClose}
          >
            {isThaiLanguage ? "ยกเลิก" : "Abbrechen"}
          </Button>
          <Button 
            variant="destructive"
            onClick={onConfirm}
          >
            {isThaiLanguage ? "ลบ" : "Löschen"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
