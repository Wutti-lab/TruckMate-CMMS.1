
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function MaintenanceHistoryTable() {
  const { language } = useLanguage();

  const recentMaintenanceRecords = [
    { 
      vehicle: 'TM-001', 
      date: '2024-01-15', 
      type: 'Ölwechsel', 
      status: 'Abgeschlossen', 
      cost: 180, 
      technician: 'Hans Weber',
      nextService: '2024-04-15'
    },
    { 
      vehicle: 'TM-002', 
      date: '2024-01-12', 
      type: 'Reifenwechsel', 
      status: 'Überfällig', 
      cost: 850, 
      technician: 'Maria Klein',
      nextService: '2024-07-12'
    },
    { 
      vehicle: 'TM-003', 
      date: '2024-01-10', 
      type: 'Bremsenservice', 
      status: 'Abgeschlossen', 
      cost: 420, 
      technician: 'Klaus Müller',
      nextService: '2024-07-10'
    },
    { 
      vehicle: 'TM-004', 
      date: '2024-01-08', 
      type: 'Inspektion', 
      status: 'Geplant', 
      cost: 220, 
      technician: 'Anna Schmidt',
      nextService: '2024-07-08'
    },
    { 
      vehicle: 'TM-005', 
      date: '2024-01-05', 
      type: 'Motorwartung', 
      status: 'Abgeschlossen', 
      cost: 1300, 
      technician: 'Stefan Fischer',
      nextService: '2024-07-05'
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Abgeschlossen':
        return <Badge variant="default" className="bg-green-600"><CheckCircle className="h-3 w-3 mr-1" />Abgeschlossen</Badge>;
      case 'Geplant':
        return <Badge variant="secondary"><Calendar className="h-3 w-3 mr-1" />Geplant</Badge>;
      case 'Überfällig':
        return <Badge variant="destructive"><AlertTriangle className="h-3 w-3 mr-1" />Überfällig</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{language === 'de' ? 'Wartungshistorie' : 'Maintenance History'}</CardTitle>
            <CardDescription>
              {language === 'de' ? 'Neueste Wartungsaktivitäten' : 'Recent maintenance activities'}
            </CardDescription>
          </div>
          <Button variant="outline">
            {language === 'de' ? 'Vollständige Historie exportieren' : 'Export Full History'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">{language === 'de' ? 'Fahrzeug' : 'Vehicle'}</th>
                <th className="text-left p-3">{language === 'de' ? 'Datum' : 'Date'}</th>
                <th className="text-left p-3">{language === 'de' ? 'Wartungsart' : 'Type'}</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">{language === 'de' ? 'Kosten' : 'Cost'}</th>
                <th className="text-left p-3">{language === 'de' ? 'Techniker' : 'Technician'}</th>
                <th className="text-left p-3">{language === 'de' ? 'Nächste Wartung' : 'Next Service'}</th>
              </tr>
            </thead>
            <tbody>
              {recentMaintenanceRecords.map((record, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{record.vehicle}</td>
                  <td className="p-3">{new Date(record.date).toLocaleDateString()}</td>
                  <td className="p-3">{record.type}</td>
                  <td className="p-3">{getStatusBadge(record.status)}</td>
                  <td className="p-3 font-semibold">{record.cost.toLocaleString()} ฿</td>
                  <td className="p-3">{record.technician}</td>
                  <td className="p-3 text-sm text-gray-600">{new Date(record.nextService).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
