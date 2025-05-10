
import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Customer } from "@/lib/types/customer-types";
import { useLanguage } from "@/contexts/LanguageContext";
import { CustomerForm, CustomerFormValues } from "./forms/CustomerForm";

interface CustomerDialogProps {
  customer: Customer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (values: CustomerFormValues) => void;
}

export function CustomerDialog({
  customer,
  open,
  onOpenChange,
  onSave
}: CustomerDialogProps) {
  const { language } = useLanguage();
  const isEditing = !!customer;

  const translations = {
    title: isEditing 
      ? language === 'de' ? 'Kunde bearbeiten' : 
        language === 'th' ? 'แก้ไขข้อมูลลูกค้า' :
        'Edit Customer'
      : language === 'de' ? 'Neuen Kunden hinzufügen' : 
        language === 'th' ? 'เพิ่มลูกค้าใหม่' :
        'Add New Customer',
    description: isEditing
      ? language === 'de' 
        ? 'Bearbeiten Sie die Kundeninformationen unten'
        : language === 'th'
        ? 'แก้ไขข้อมูลลูกค้าด้านล่าง'
        : 'Edit customer information below'
      : language === 'de'
        ? 'Fügen Sie die Kundeninformationen hinzu'
        : language === 'th'
        ? 'เพิ่มข้อมูลลูกค้าด้านล่าง'
        : 'Add customer information below',
  };

  const handleSubmit = (data: CustomerFormValues) => {
    onSave(data);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{translations.title}</DialogTitle>
          <DialogDescription>{translations.description}</DialogDescription>
        </DialogHeader>

        <CustomerForm 
          customer={customer}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
