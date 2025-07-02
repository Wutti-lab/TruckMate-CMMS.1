
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

const vehicleFuelData = [
  { vehicle: 'TM-001', consumption: 450, efficiency: 8.2, status: 'good' },
  { vehicle: 'TM-002', consumption: 520, efficiency: 7.1, status: 'warning' },
  { vehicle: 'TM-003', consumption: 380, efficiency: 9.5, status: 'excellent' },
  { vehicle: 'TM-004', consumption: 610, efficiency: 6.8, status: 'poor' },
  { vehicle: 'TM-005', consumption: 420, efficiency: 8.7, status: 'good' },
];

export function VehiclePerformanceTable() {
  const { language } = useLanguage();

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>{language === 'de' ? 'Fahrzeug-Kraftstoffleistung' : 'Vehicle Fuel Performance'}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">{language === 'de' ? 'Fahrzeug' : 'Vehicle'}</th>
                <th className="text-left p-2">{language === 'de' ? 'Verbrauch (L)' : 'Consumption (L)'}</th>
                <th className="text-left p-2">{language === 'de' ? 'Effizienz (km/L)' : 'Efficiency (km/L)'}</th>
                <th className="text-left p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {vehicleFuelData.map((vehicle) => (
                <tr key={vehicle.vehicle} className="border-b">
                  <td className="p-2 font-medium">{vehicle.vehicle}</td>
                  <td className="p-2">{vehicle.consumption}</td>
                  <td className="p-2">{vehicle.efficiency}</td>
                  <td className="p-2">
                    <Badge 
                      variant={
                        vehicle.status === 'excellent' ? 'default' :
                        vehicle.status === 'good' ? 'secondary' :
                        vehicle.status === 'warning' ? 'outline' : 'destructive'
                      }
                    >
                      {vehicle.status === 'excellent' ? (language === 'de' ? 'Ausgezeichnet' : 'Excellent') :
                       vehicle.status === 'good' ? (language === 'de' ? 'Gut' : 'Good') :
                       vehicle.status === 'warning' ? (language === 'de' ? 'Warnung' : 'Warning') :
                       (language === 'de' ? 'Schlecht' : 'Poor')}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
