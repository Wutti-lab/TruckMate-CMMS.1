
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Box } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function ProductTransport() {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">{t("productTransport")}</h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="product_types" />
          <Label htmlFor="product_types" className="flex items-center gap-2">
            <Box size={16} />
            {t("productTypesIdentified")}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="transport_conditions" />
          <Label htmlFor="transport_conditions">{t("specificTransportConditions")}</Label>
        </div>
      </div>
      <div className="p-4 bg-secondary rounded-lg text-sm space-y-2">
        <p>• Lebensmittel: Temperaturkontrolle und Hygiene</p>
        <p>• Chemikalien: Einhaltung der Gefahrgutvorschriften</p>
        <p>• Elektronische Geräte: Stoßgeschützte Verpackung</p>
        <p>• Medizinische Produkte: Sterile Bedingungen</p>
        <p>• Empfindliche Güter: Vorsichtige Handhabung</p>
        <p>• Verderbliche Waren: Kühlkette aufrechterhalten</p>
      </div>
    </div>
  );
}
