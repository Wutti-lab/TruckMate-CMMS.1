
import { Button } from "@/components/ui/button";
import { Key } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { generateLicenseKey } from "@/lib/utils/customerUtils";

export function GenerateLicenseButton() {
  const { language } = useLanguage();
  const { toast } = useToast();
  
  const handleGenerateKey = () => {
    const newKey = generateLicenseKey();
    
    // Copy to clipboard
    navigator.clipboard.writeText(newKey).then(() => {
      toast({
        title: language === 'de' ? 'Lizenzschlüssel generiert' : 
               language === 'th' ? 'สร้างรหัสใบอนุญาตแล้ว' :
               'License key generated',
        description: language === 'de' 
          ? `Der neue Schlüssel "${newKey}" wurde in die Zwischenablage kopiert` 
          : language === 'th'
          ? `รหัสใหม่ "${newKey}" ถูกคัดลอกไปยังคลิปบอร์ดแล้ว`
          : `New key "${newKey}" copied to clipboard`,
      });
    });
  };
  
  return (
    <Button 
      onClick={handleGenerateKey}
      className="bg-fleet-600 hover:bg-fleet-700"
    >
      <Key className="mr-2 h-4 w-4" />
      {language === 'de' ? 'Neuen Lizenzschlüssel generieren' : 
       language === 'th' ? 'สร้างรหัสใบอนุญาตใหม่' :
       'Generate New License Key'}
    </Button>
  );
}
