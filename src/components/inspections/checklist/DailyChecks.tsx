
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";

export function DailyChecks() {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">{t("dailyChecks")}</h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="cleaning" />
          <Label htmlFor="cleaning">{t("vehicleCleaned")}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="engine" />
          <Label htmlFor="engine">{t("engineCondition")}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="overall" />
          <Label htmlFor="overall">{t("overallVehicleCondition")}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="manual" />
          <Label htmlFor="manual">{t("manualRead")}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="damage" />
          <Label htmlFor="damage">{t("checkedForDamage")}</Label>
        </div>
      </div>
    </div>
  );
}
