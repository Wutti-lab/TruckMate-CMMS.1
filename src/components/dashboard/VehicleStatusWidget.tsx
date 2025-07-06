import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";
import { Car, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface VehicleStatusData {
  name: string;
  value: number;
  color: string;
  count: number;
}

interface VehicleStatusWidgetProps {
  data: VehicleStatusData[];
  totalVehicles: number;
}

export function VehicleStatusWidget({ data, totalVehicles }: VehicleStatusWidgetProps) {
  const { language } = useLanguage();
  
  const getTitle = () => {
    switch(language) {
      case 'de': return 'Fahrzeugstatus-Widgets';
      case 'th': return 'วิดเจ็ตสถานะยานพาหนะ';
      default: return 'Vehicle Status Widgets';
    }
  };

  const getStatusLabel = (name: string) => {
    switch(name.toLowerCase()) {
      case 'operational':
        return language === 'de' ? 'Betriebsbereit' : language === 'th' ? 'พร้อมใช้งาน' : 'Operational';
      case 'maintenance':
        return language === 'de' ? 'Wartung' : language === 'th' ? 'ซ่อมบำรุง' : 'Maintenance';
      case 'out of service':
        return language === 'de' ? 'Außer Betrieb' : language === 'th' ? 'ไม่พร้อมใช้งาน' : 'Out of Service';
      default:
        return name;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Progress Bars Widget */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            {getTitle()}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{getStatusLabel(item.name)}</span>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{item.count}</Badge>
                  <span className="text-sm text-muted-foreground">{item.value}%</span>
                </div>
              </div>
              <Progress 
                value={item.value} 
                className="h-2"
                style={{ 
                  '--progress-background': item.color,
                } as React.CSSProperties}
              />
            </div>
          ))}
          
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {language === 'de' ? 'Gesamt' : language === 'th' ? 'รวม' : 'Total'}
              </span>
              <Badge variant="outline">{totalVehicles}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pie Chart Widget */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            {language === 'de' ? 'Verteilung' : language === 'th' ? 'การกระจาย' : 'Distribution'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-1 gap-2 mt-4">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm flex-1">{getStatusLabel(item.name)}</span>
                <span className="text-sm font-medium">{item.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}