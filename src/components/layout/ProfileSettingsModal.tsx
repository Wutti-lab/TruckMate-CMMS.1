
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
import { EditAccountForm } from "../accounts/forms/EditAccountForm";
import { EditAccountFormValues } from "../accounts/forms/EditAccountFormSchema";
import { useToast } from "@/hooks/use-toast";

interface ProfileSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileSettingsModal({ 
  open, 
  onOpenChange
}: ProfileSettingsModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage();
  const { profile, updateProfile, refreshProfiles } = useAuth();
  const { toast } = useToast();
  
  if (!profile) return null;
  
  const handleSubmit = async (data: EditAccountFormValues) => {
    setIsLoading(true);
    try {
      await updateProfile(profile.id, {
        name: data.name,
        role: data.role,
        phone_number: data.phone_number,
        company: data.company,
        job_title: data.job_title
      });
      
      await refreshProfiles();
      
      toast({
        title: language === 'de' ? "Erfolgreich" : 
               language === 'th' ? "สำเร็จ" : 
               "Success",
        description: language === 'de' ? "Profil erfolgreich aktualisiert." : 
                    language === 'th' ? "อัปเดตโปรไฟล์สำเร็จ" : 
                    "Profile updated successfully."
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: language === 'de' ? "Fehler" : 
               language === 'th' ? "ข้อผิดพลาด" : 
               "Error",
        description: language === 'de' ? "Profil konnte nicht aktualisiert werden." : 
                    language === 'th' ? "ไม่สามารถอัปเดตโปรไฟล์ได้" : 
                    "Failed to update profile."
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
            {language === 'de' ? 'Profil Einstellungen' : 
             language === 'th' ? 'การตั้งค่าโปรไฟล์' : 
             'Profile Settings'}
          </DialogTitle>
          <DialogDescription>
            {language === 'de' ? 'Bearbeiten Sie Ihre persönlichen Informationen.' : 
             language === 'th' ? 'แก้ไขข้อมูลส่วนตัวของคุณ' : 
             'Edit your personal information.'}
          </DialogDescription>
        </DialogHeader>
        
        <EditAccountForm 
          user={{
            ...profile,
            name: profile.full_name || '',
            phone_number: profile.phone || '',
            company: '',
            job_title: ''
          }} 
          isLoading={isLoading} 
          onSubmit={handleSubmit} 
          onCancel={() => onOpenChange(false)} 
        />
      </DialogContent>
    </Dialog>
  );
}
