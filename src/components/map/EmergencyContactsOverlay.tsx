
import { Button } from "@/components/ui/button";
import { EmergencyContacts } from "@/components/inspections/EmergencyContacts";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";

interface EmergencyContactsOverlayProps {
  showEmergencyContacts: boolean;
  setShowEmergencyContacts: (show: boolean) => void;
}

export function EmergencyContactsOverlay({ 
  showEmergencyContacts, 
  setShowEmergencyContacts 
}: EmergencyContactsOverlayProps) {
  const { language } = useLanguage();

  if (!showEmergencyContacts) {
    return null;
  }

  return (
    <div className="absolute left-4 top-4 w-[350px] max-h-[80vh] overflow-y-auto bg-white rounded-lg shadow-lg p-4 z-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          {extractLanguageText("Emergency Contacts | รายชื่อติดต่อฉุกเฉิน | Notfallkontakte", language)}
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowEmergencyContacts(false)}
        >
          ✕
        </Button>
      </div>
      <EmergencyContacts />
    </div>
  );
}
