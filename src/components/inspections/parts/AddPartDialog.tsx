
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { PartInfo } from "../models/PartInfo";
import { AddPartForm } from "./AddPartForm";

interface AddPartDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddPart: (part: PartInfo) => void;
  nextPartId: string;
}

export function AddPartDialog({ isOpen, onOpenChange, onAddPart, nextPartId }: AddPartDialogProps) {
  const { language } = useLanguage();
  
  const handleAddPart = (part: PartInfo) => {
    onAddPart(part);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {language === 'de' ? "Neues Teil hinzufügen" : "Add New Part"}
          </DialogTitle>
        </DialogHeader>
        
        <AddPartForm 
          onAddPart={handleAddPart} 
          onCancel={() => onOpenChange(false)} 
          nextPartId={nextPartId} 
        />
      </DialogContent>
    </Dialog>
  );
}
