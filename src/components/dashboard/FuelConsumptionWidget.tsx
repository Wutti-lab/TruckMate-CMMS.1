import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Fuel, TrendingUp, TrendingDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";

interface FuelData {
  month: string;
  consumption: number;
  cost: number;
  efficiency: number;
}

export function FuelConsumptionWidget() {
  const { language } = useLanguage();
  const [fuelData, setFuelData] = useState<FuelData[]>([]);
  const [loading, setLoading] = useState(true);

  const getTitle = () => {
    switch(language) {
      case 'de': return 'Kraftstoffverbrauch';
      case 'th': return 'การใช้เชื้อเพลิง';
      default: return 'Fuel Consumption';
    }
  };

  useEffect(() => {
    // Mock data - replace with real data from database
    const mockData: FuelData[] = [
      { month: 'Jan', consumption: 2400, cost: 3600, efficiency: 8.5 },
      { month: 'Feb', consumption: 2200, cost: 3300, efficiency: 8.8 },
      { month: 'Mar', consumption: 2800, cost: 4200, efficiency: 8.2 },
      { month: 'Apr', consumption: 2500, cost: 3750, efficiency: 8.6 },
      { month: 'Mai', consumption: 2600, cost: 3900, efficiency: 8.4 },
      { month: 'Jun', consumption: 2300, cost: 3450, efficiency: 8.9 }
    ];
    
    setFuelData(mockData);
    setLoading(false);
  }, []);

  const currentMonth = fuelData[fuelData.length - 1];
  const previousMonth = fuelData[fuelData.length - 2];
  
  const consumptionTrend = currentMonth && previousMonth 
    ? ((currentMonth.consumption - previousMonth.consumption) / previousMonth.consumption) * 100
    : 0;

  const efficiencyTrend = currentMonth && previousMonth
    ? ((currentMonth.efficiency - previousMonth.efficiency) / previousMonth.efficiency) * 100
    : 0;

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Fuel className="h-5 w-5" />
            {getTitle()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-48 bg-muted rounded mb-4" />
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-1/2" />
              <div className="h-4 bg-muted rounded w-1/3" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Consumption Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Fuel className="h-5 w-5" />
            {getTitle()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={fuelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value} L`, 
                    language === 'de' ? 'Verbrauch' : language === 'th' ? 'การใช้งาน' : 'Consumption'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="consumption" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-bold">{currentMonth?.consumption.toLocaleString()} L</div>
              <div className="flex items-center gap-1 text-sm">
                {consumptionTrend > 0 ? (
                  <TrendingUp className="h-4 w-4 text-red-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-green-500" />
                )}
                <span className={consumptionTrend > 0 ? 'text-red-500' : 'text-green-500'}>
                  {Math.abs(consumptionTrend).toFixed(1)}%
                </span>
                <span className="text-muted-foreground">
                  {language === 'de' ? 'vs. Vormonat' : language === 'th' ? 'เทียบเดือนก่อน' : 'vs. last month'}
                </span>
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold">{currentMonth?.efficiency} km/L</div>
              <div className="flex items-center gap-1 text-sm">
                {efficiencyTrend > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className={efficiencyTrend > 0 ? 'text-green-500' : 'text-red-500'}>
                  {Math.abs(efficiencyTrend).toFixed(1)}%
                </span>
                <span className="text-muted-foreground">
                  {language === 'de' ? 'Effizienz' : language === 'th' ? 'ประสิทธิภาพ' : 'Efficiency'}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost Chart */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'de' ? 'Kraftstoffkosten' : language === 'th' ? 'ค่าเชื้อเพลิง' : 'Fuel Costs'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fuelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value} €`, language === 'de' ? 'Kosten' : language === 'th' ? 'ค่าใช้จ่าย' : 'Cost']}
                />
                <Bar dataKey="cost" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {language === 'de' ? 'Durchschnitt/Monat' : language === 'th' ? 'เฉลี่ยต่อเดือน' : 'Average/Month'}
              </span>
              <Badge variant="secondary">
                {Math.round(fuelData.reduce((sum, item) => sum + item.cost, 0) / fuelData.length).toLocaleString()} €
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {language === 'de' ? 'Gesamt (6 Monate)' : language === 'th' ? 'รวม (6 เดือน)' : 'Total (6 months)'}
              </span>
              <Badge variant="outline">
                {fuelData.reduce((sum, item) => sum + item.cost, 0).toLocaleString()} €
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}