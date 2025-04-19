
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function DriverRequirements() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fahrerqualifikationen & Gesundheit</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-semibold">Führerschein & Qualifikation</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="license3" />
              <Label htmlFor="license3">Führerschein Klasse 3</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="license4" />
              <Label htmlFor="license4">Führerschein Klasse 4</Label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Gesundheitliche Untersuchungen</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="medical" />
              <Label htmlFor="medical">Ärztliche Untersuchung bestanden</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="vision" />
              <Label htmlFor="vision">Sehtest bestanden</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="colorblind" />
              <Label htmlFor="colorblind">Farbenblindheitstest bestanden</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="hearing" />
              <Label htmlFor="hearing">Hörtest bestanden</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="drugs" />
              <Label htmlFor="drugs">Drogentest bestanden</Label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Hauptaufgaben des Fahrers</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Sichere und pünktliche Lieferung der Waren</li>
            <li>Führen des Fahrtenbuchs und Dokumentation</li>
            <li>Tägliche Fahrzeugkontrolle und -wartung</li>
            <li>Einhaltung der Verkehrsregeln und Ruhezeiten</li>
            <li>Ladungssicherung und -kontrolle</li>
            <li>Kommunikation mit Kunden und Disposition</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
