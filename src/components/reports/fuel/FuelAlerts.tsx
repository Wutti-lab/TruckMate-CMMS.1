
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const fuelAlerts = [
  { vehicle: 'TM-002', issue: 'Hoher Kraftstoffverbrauch', severity: 'warning' },
  { vehicle: 'TM-004', issue: 'Niedrige Kraftstoffeffizienz', severity: 'critical' },
];

export function FuelAlerts() {
  const { language } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          {language === 'de' ? 'Kraftstoff-Warnungen' : 'Fuel Alerts'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {fuelAlerts.map((alert, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">{alert.vehicle}</p>
                <p className="text-xs text-gray-700">{alert.issue}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
