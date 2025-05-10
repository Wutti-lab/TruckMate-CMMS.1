
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function DailyChecks() {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Tägliche Prüfungen</h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="cleaning" />
          <Label htmlFor="cleaning">Fahrzeug innen und außen gereinigt</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="engine" />
          <Label htmlFor="engine">Motorenzustand überprüft</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="overall" />
          <Label htmlFor="overall">Gesamtzustand des Fahrzeugs überprüft</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="manual" />
          <Label htmlFor="manual">Handbuch gelesen und verstanden</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="damage" />
          <Label htmlFor="damage">Auf Schäden überprüft</Label>
        </div>
      </div>
    </div>
  );
}
