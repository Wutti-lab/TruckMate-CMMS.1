
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function MaintenanceChecklist() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>LKW-Wartungscheckliste</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-semibold">Tägliche Kontrollen</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="cleaning" />
              <Label htmlFor="cleaning">Fahrzeug innen und außen gereinigt</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="engine" />
              <Label htmlFor="engine">Motorzustand überprüft</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="overall" />
              <Label htmlFor="overall">Gesamtzustand des Fahrzeugs kontrolliert</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="manual" />
              <Label htmlFor="manual">Bedienungsanleitung gelesen und verstanden</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="damage" />
              <Label htmlFor="damage">Auf Schäden überprüft</Label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Standardausrüstung</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="firstaid" />
              <Label htmlFor="firstaid">Erste-Hilfe-Kasten</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="warning" />
              <Label htmlFor="warning">Warndreieck</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="vest" />
              <Label htmlFor="vest">Warnweste</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="flashlight" />
              <Label htmlFor="flashlight">Taschenlampe</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="tools" />
              <Label htmlFor="tools">Werkzeugkasten</Label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Lieferrichtlinien</h3>
          <div className="p-4 bg-secondary rounded-lg text-sm space-y-2">
            <p>• Sorgfältige Behandlung der Kundenprodukte</p>
            <p>• Sichere und unfallfreie Lieferung</p>
            <p>• Regelmäßige Dokumentation des Fahrzeugzustands</p>
            <p>• Sofortige Meldung von Schäden oder Auffälligkeiten</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
