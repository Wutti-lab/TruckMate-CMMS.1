
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Truck } from "lucide-react";

export function TransportRegulations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transportvorschriften Bangkok</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Fahrzeitbeschränkungen
          </h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-secondary rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="h-5 w-5" />
                <h4 className="font-medium">6-Rad-LKW</h4>
              </div>
              <p className="text-sm">Auf Schnellstraßen und ebenen Straßen verboten zwischen:</p>
              <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                <li>06:00 - 09:00 Uhr</li>
                <li>16:00 - 20:00 Uhr</li>
              </ul>
            </div>

            <div className="p-4 bg-secondary rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="h-5 w-5" />
                <h4 className="font-medium">LKW mit 10 Rädern oder mehr</h4>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Auf Schnellstraßen verboten zwischen:</p>
                  <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                    <li>06:00 - 09:00 Uhr</li>
                    <li>15:00 - 21:00 Uhr</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium">Auf ebenen Straßen verboten zwischen:</p>
                  <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                    <li>06:00 - 10:00 Uhr</li>
                    <li>15:00 - 21:00 Uhr</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Hinweise zur Transportzeit</h3>
          <div className="p-4 bg-secondary rounded-lg text-sm space-y-2">
            <p>• Die Transportzeit variiert je nach Entfernung und Verkehrslage</p>
            <p>• Berücksichtigen Sie die Fahrzeitbeschränkungen bei der Routenplanung</p>
            <p>• Planen Sie zusätzliche Zeit für Staus und unvorhergesehene Ereignisse ein</p>
            <p>• Beachten Sie lokale Feiertage und Veranstaltungen</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
