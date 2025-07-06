import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Car, Wrench, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FleetOverviewProps {
  totalVehicles: number;
  activeVehicles: number;
  maintenanceVehicles: number;
  inactiveVehicles: number;
}

export function FleetOverviewWidget({ 
  totalVehicles, 
  activeVehicles, 
  maintenanceVehicles, 
  inactiveVehicles 
}: FleetOverviewProps) {
  const { language } = useLanguage();
  
  const getTitle = () => {
    switch(language) {
      case 'de': return 'Flottenübersicht';
      case 'th': return 'ภาพรวมยานพาหนะ';
      default: return 'Fleet Overview';
    }
  };

  const activePercentage = totalVehicles > 0 ? (activeVehicles / totalVehicles) * 100 : 0;
  const maintenancePercentage = totalVehicles > 0 ? (maintenanceVehicles / totalVehicles) * 100 : 0;
  const inactivePercentage = totalVehicles > 0 ? (inactiveVehicles / totalVehicles) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="h-5 w-5" />
          {getTitle()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{totalVehicles}</div>
            <div className="text-sm text-muted-foreground">
              {language === 'de' ? 'Gesamt' : language === 'th' ? 'รวม' : 'Total'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{activeVehicles}</div>
            <div className="text-sm text-muted-foreground">
              {language === 'de' ? 'Aktiv' : language === 'th' ? 'ใช้งาน' : 'Active'}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="text-sm">
                {language === 'de' ? 'Aktiv' : language === 'th' ? 'ใช้งาน' : 'Active'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={activePercentage} className="w-20" />
              <Badge variant="secondary">{activeVehicles}</Badge>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wrench className="h-4 w-4 text-amber-500" />
              <span className="text-sm">
                {language === 'de' ? 'Wartung' : language === 'th' ? 'ซ่อมบำรุง' : 'Maintenance'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={maintenancePercentage} className="w-20" />
              <Badge variant="secondary">{maintenanceVehicles}</Badge>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <span className="text-sm">
                {language === 'de' ? 'Inaktiv' : language === 'th' ? 'ไม่ใช้งาน' : 'Inactive'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={inactivePercentage} className="w-20" />
              <Badge variant="secondary">{inactiveVehicles}</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}