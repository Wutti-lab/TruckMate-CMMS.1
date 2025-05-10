
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";

export function StandardEquipment() {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">{t("standardEquipment")}</h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="firstaid" />
          <Label htmlFor="firstaid">{t("firstAidKit")}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="warning" />
          <Label htmlFor="warning">{t("warningTriangle")}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="vest" />
          <Label htmlFor="vest">{t("safetyVest")}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="cones" />
          <Label htmlFor="cones">{t("trafficCones")}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="tools" />
          <Label htmlFor="tools">{t("toolbox")}</Label>
        </div>
      </div>
    </div>
  );
}
