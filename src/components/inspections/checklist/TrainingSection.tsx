
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { GraduationCap } from "lucide-react";

export function TrainingSection() {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Schulung und Wartung</h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="training" />
          <Label htmlFor="training" className="flex items-center gap-2">
            <GraduationCap size={16} />
            Regelmäßige Sicherheitsschulung absolviert
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="cleaning_supplies" />
          <Label htmlFor="cleaning_supplies">Fahrzeugreinigungsmittel verfügbar</Label>
        </div>
      </div>
      <div className="p-4 bg-secondary rounded-lg text-sm space-y-2">
        <p>• Theoretische Verkehrssicherheitsschulung</p>
        <p>• Praktische Fahrausbildung unter Aufsicht</p>
        <p>• Ladungssicherungsschulung</p>
        <p>• Erste-Hilfe-Kurs abgeschlossen</p>
        <p>• Gefahrgutschulung (falls erforderlich)</p>
        <p>• Digitaler Tachograf-Schulung</p>
        <p>• Eco-Driving-Training</p>
      </div>
    </div>
  );
}
