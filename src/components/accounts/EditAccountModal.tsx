
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { EditAccountForm } from "./forms/EditAccountForm";
import { EditAccountFormValues } from "./forms/EditAccountFormSchema";
import { useToast } from "@/hooks/use-toast";

interface EditAccountModalProps {
  user: any;
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
  const { updateProfile, refreshProfiles } = useAuth();
  const { toast } = useToast();
  
  const handleSubmit = async (data: EditAccountFormValues) => {
    setIsLoading(true);
    try {
      await updateProfile(user.id, {
        name: data.name,
        role: data.role
      });
      
      await refreshProfiles();
      
      toast({
        title: "Success",
        description: "Account updated successfully."
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update account."
      });
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
