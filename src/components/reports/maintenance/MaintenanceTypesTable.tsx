
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

export function MaintenanceTypesTable() {
  const { language } = useLanguage();

  const maintenanceTypes = [
    { type: 'Ölwechsel', count: 15, avgCost: 150, totalCost: 2250 },
    { type: 'Reifenwechsel', count: 8, avgCost: 800, totalCost: 6400 },
    { type: 'Bremsenservice', count: 6, avgCost: 450, totalCost: 2700 },
    { type: 'Inspektion', count: 12, avgCost: 200, totalCost: 2400 },
    { type: 'Motorwartung', count: 4, avgCost: 1200, totalCost: 4800 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === 'de' ? 'Wartungsarten-Analyse' : 'Maintenance Types Analysis'}</CardTitle>
        <CardDescription>
          {language === 'de' ? 'Häufigkeit und Kosten nach Wartungsart' : 'Frequency and costs by maintenance type'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">{language === 'de' ? 'Wartungsart' : 'Maintenance Type'}</th>
                <th className="text-left p-3">{language === 'de' ? 'Anzahl' : 'Count'}</th>
                <th className="text-left p-3">{language === 'de' ? 'Durchschn. Kosten' : 'Avg Cost'}</th>
                <th className="text-left p-3">{language === 'de' ? 'Gesamtkosten' : 'Total Cost'}</th>
                <th className="text-left p-3">{language === 'de' ? 'Anteil' : 'Share'}</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceTypes.map((type, index) => {
                const totalAllCosts = maintenanceTypes.reduce((sum, t) => sum + t.totalCost, 0);
                const percentage = ((type.totalCost / totalAllCosts) * 100).toFixed(1);
                
                return (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{type.type}</td>
                    <td className="p-3">{type.count}</td>
                    <td className="p-3">{type.avgCost.toLocaleString()} ฿</td>
                    <td className="p-3 font-semibold">{type.totalCost.toLocaleString()} ฿</td>
                    <td className="p-3">
                      <Badge variant="outline">{percentage}%</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
