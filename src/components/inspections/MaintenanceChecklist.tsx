import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Phone, Flashlight, Archive, FireExtinguisher } from "lucide-react";

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
              <Checkbox id="cones" />
              <Label htmlFor="cones">2 Verkehrskegel</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="tools" />
              <Label htmlFor="tools">Werkzeugkasten</Label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Notfall- und Sicherheitsausrüstung</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="phone" />
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone size={16} />
                Mobiltelefon
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="flashlight" />
              <Label htmlFor="flashlight" className="flex items-center gap-2">
                <Flashlight size={16} />
                Notfall-Taschenlampe
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="extinguisher" />
              <Label htmlFor="extinguisher" className="flex items-center gap-2">
                <FireExtinguisher size={16} />
                Feuerlöscher
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="documents" />
              <Label htmlFor="documents" className="flex items-center gap-2">
                <Archive size={16} />
                Dokumentenablage
              </Label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Schlafbereich</h3>
          <div className="p-4 bg-secondary rounded-lg text-sm">
            <p>• Schlafplätze für 2-4 Personen verfügbar</p>
            <p>• Betten/Matratzen in gutem Zustand</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Training und Wartung</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="training" />
              <Label htmlFor="training">Regelmäßiges Sicherheitstraining absolviert</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="cleaning_supplies" />
              <Label htmlFor="cleaning_supplies">Autoreinigungsprodukte vorhanden</Label>
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
