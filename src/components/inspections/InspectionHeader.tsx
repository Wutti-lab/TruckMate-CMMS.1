
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface InspectionHeaderProps {
  onNewInspection?: () => void;
}

export function InspectionHeader({ onNewInspection }: InspectionHeaderProps) {
  const { language } = useLanguage();

  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <h1 className="text-xl sm:text-2xl font-bold">
        {language === 'th' ? "การตรวจสอบและรายการตรวจ" : "Inspections & Checklisten"}
      </h1>
      {onNewInspection && (
        <Button className="bg-fleet-500 w-full sm:w-auto" onClick={onNewInspection}>
          <Plus size={16} className="mr-2" />
          {language === 'th' ? "การตรวจสอบใหม่" : "Neue Inspektion"}
        </Button>
      )}
    </div>
  );
}
