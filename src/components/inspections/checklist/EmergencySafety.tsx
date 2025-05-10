
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Phone, Flashlight, Archive, FireExtinguisher } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function EmergencySafety() {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">{t("emergencySafety")}</h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="phone" />
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone size={16} />
            {t("mobilePhone")}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="flashlight" />
          <Label htmlFor="flashlight" className="flex items-center gap-2">
            <Flashlight size={16} />
            {t("emergencyLamp")}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="extinguisher" />
          <Label htmlFor="extinguisher" className="flex items-center gap-2">
            <FireExtinguisher size={16} />
            {t("fireExtinguisher")}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="documents" />
          <Label htmlFor="documents" className="flex items-center gap-2">
            <Archive size={16} />
            {t("documentStorage")}
          </Label>
        </div>
      </div>
    </div>
  );
}
