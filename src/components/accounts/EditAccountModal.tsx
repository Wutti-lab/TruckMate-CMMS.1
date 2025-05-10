
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { User } from "@/lib/types/user-roles";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { EditAccountForm } from "./forms/EditAccountForm";
import { EditAccountFormValues } from "./forms/EditAccountFormSchema";

interface EditAccountModalProps {
  user: User & { status?: string };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditAccountModal({ 
  user, 
  open, 
  onOpenChange
}: EditAccountModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage();
  const { updateUserList } = useAuth();
  
  const handleSubmit = async (data: EditAccountFormValues) => {
    setIsLoading(true);
    try {
      const updatedUser = {
        ...user,
        name: data.name,
        email: data.email,
        role: data.role,
        status: data.status
      };
      
      if (data.password && data.password.trim() !== "") {
        (updatedUser as any).password = data.password;
      }
      
      updateUserList(updatedUser);
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {language === 'en' ? 'Edit Account' : 
             language === 'th' ? 'แก้ไขบัญชี' : 
             'Konto bearbeiten'}
          </DialogTitle>
          <DialogDescription>
            {language === 'en' ? 'Make changes to the user account.' : 
             language === 'th' ? 'ทำการเปลี่ยนแปลงบัญชีผู้ใช้' : 
             'Nehmen Sie Änderungen am Benutzerkonto vor.'}
          </DialogDescription>
        </DialogHeader>
        
        <EditAccountForm 
          user={user} 
          isLoading={isLoading} 
          onSubmit={handleSubmit} 
          onCancel={() => onOpenChange(false)} 
        />
      </DialogContent>
    </Dialog>
  );
}
