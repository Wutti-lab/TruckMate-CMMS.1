
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";

const driverPerformanceData = [
  { driver: 'Hans Müller', score: 92, hoursWorked: 168, fuelEfficiency: 8.9, safetyRating: 'A+', violations: 0 },
  { driver: 'Maria Schmidt', score: 88, hoursWorked: 172, fuelEfficiency: 8.4, safetyRating: 'A', violations: 1 },
  { driver: 'Klaus Weber', score: 76, hoursWorked: 165, fuelEfficiency: 7.8, safetyRating: 'B+', violations: 2 },
  { driver: 'Anna Fischer', score: 94, hoursWorked: 160, fuelEfficiency: 9.2, safetyRating: 'A+', violations: 0 },
  { driver: 'Stefan Braun', score: 82, hoursWorked: 175, fuelEfficiency: 8.1, safetyRating: 'B', violations: 3 },
];

export function DriverPerformanceTable() {
  const { language } = useLanguage();

  const getSafetyBadgeVariant = (rating: string) => {
    if (rating === 'A+') return 'default';
    if (rating === 'A') return 'secondary';
    if (rating.startsWith('B')) return 'outline';
    return 'destructive';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === 'de' ? 'Individuelle Fahrleistung' : 'Individual Driver Performance'}</CardTitle>
        <CardDescription>
          {language === 'de' ? 'Detaillierte Leistungskennzahlen für jeden Fahrer' : 'Detailed performance metrics for each driver'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">{language === 'de' ? 'Fahrer' : 'Driver'}</th>
                <th className="text-left p-3">{language === 'de' ? 'Bewertung' : 'Score'}</th>
                <th className="text-left p-3">{language === 'de' ? 'Arbeitsstunden' : 'Hours Worked'}</th>
                <th className="text-left p-3">{language === 'de' ? 'Kraftstoffeffizienz' : 'Fuel Efficiency'}</th>
                <th className="text-left p-3">{language === 'de' ? 'Sicherheitsbewertung' : 'Safety Rating'}</th>
                <th className="text-left p-3">{language === 'de' ? 'Verstöße' : 'Violations'}</th>
              </tr>
            </thead>
            <tbody>
              {driverPerformanceData.map((driver, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{driver.driver}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{driver.score}</span>
                      <Progress value={driver.score} className="w-16 h-2" />
                    </div>
                  </td>
                  <td className="p-3">{driver.hoursWorked}h</td>
                  <td className="p-3">{driver.fuelEfficiency} km/L</td>
                  <td className="p-3">
                    <Badge variant={getSafetyBadgeVariant(driver.safetyRating)}>
                      {driver.safetyRating}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <span className={driver.violations === 0 ? 'text-green-600' : driver.violations <= 2 ? 'text-amber-600' : 'text-red-600'}>
                      {driver.violations}
                    </span>
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
