
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface FormActionsProps {
  isLoading: boolean;
  onCancel: () => void;
}

export function FormActions({ isLoading, onCancel }: FormActionsProps) {
  const { language } = useLanguage();
  
  return (
    <div className="flex justify-end gap-2 pt-4">
      <Button 
        variant="outline" 
        onClick={onCancel}
        type="button"
      >
        {language === 'en' ? 'Cancel' : 
         language === 'th' ? 'ยกเลิก' : 
         'Abbrechen'}
      </Button>
      <Button 
        type="submit" 
        disabled={isLoading}
      >
        {isLoading ? 
          (language === 'en' ? 'Saving...' : 
           language === 'th' ? 'กำลังบันทึก...' : 
           'Speichern...') : 
          (language === 'en' ? 'Save changes' : 
           language === 'th' ? 'บันทึกการเปลี่ยนแปลง' : 
           'Änderungen speichern')
        }
      </Button>
    </div>
  );
}
