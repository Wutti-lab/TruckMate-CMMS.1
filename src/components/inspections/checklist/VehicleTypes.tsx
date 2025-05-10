
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Car, Truck, Bus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function VehicleTypes() {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">{t("vehicleTypes")}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="truck" />
            <Label htmlFor="truck" className="flex items-center gap-2">
              <Truck size={16} />
              {t("truck")}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="car" />
            <Label htmlFor="car" className="flex items-center gap-2">
              <Car size={16} />
              {t("car")}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="bus" />
            <Label htmlFor="bus" className="flex items-center gap-2">
              <Bus size={16} />
              {t("bus")}
            </Label>
          </div>
        </div>
        
        <div className="p-4 bg-secondary rounded-lg text-sm space-y-2">
          <p>• Fahrzeugzulassung gültig</p>
          <p>• Zulassungsdokumente aktuell</p>
          <p>• Versicherungsschutz aktiv</p>
          <p>• Regelmäßige Wartungsaufzeichnungen</p>
          <p>• Jährliche technische Inspektion</p>
        </div>
      </div>
    </div>
  );
}
