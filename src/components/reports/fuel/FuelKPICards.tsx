
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Fuel, TrendingDown, TrendingUp, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function FuelKPICards() {
  const { language } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {language === 'de' ? 'Gesamtverbrauch' : 'Total Consumption'}
          </CardTitle>
          <Fuel className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">14,400L</div>
          <p className="text-xs text-muted-foreground">
            <TrendingDown className="inline h-3 w-3 text-green-600" />
            -5.2% {language === 'de' ? 'vs. Vormonat' : 'vs. last month'}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {language === 'de' ? 'Durchschn. Effizienz' : 'Avg. Efficiency'}
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">8.4 km/L</div>
          <p className="text-xs text-muted-foreground">
            <TrendingUp className="inline h-3 w-3 text-green-600" />
            +2.1% {language === 'de' ? 'Verbesserung' : 'improvement'}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {language === 'de' ? 'Kraftstoffkosten' : 'Fuel Costs'}
          </CardTitle>
          <div>฿</div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">21,600 ฿</div>
          <p className="text-xs text-muted-foreground">
            <TrendingDown className="inline h-3 w-3 text-green-600" />
            -8.3% {language === 'de' ? 'Einsparung' : 'savings'}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {language === 'de' ? 'Aktive Warnungen' : 'Active Alerts'}
          </CardTitle>
          <AlertTriangle className="h-4 w-4 text-amber-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-600">2</div>
          <p className="text-xs text-muted-foreground">
            {language === 'de' ? 'Benötigen Aufmerksamkeit' : 'Need attention'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
