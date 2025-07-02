
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, Award, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function DriverKPICards() {
  const { language } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {language === 'de' ? 'Aktive Fahrer' : 'Active Drivers'}
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">5</div>
          <p className="text-xs text-muted-foreground">
            {language === 'de' ? 'Alle im Einsatz' : 'All deployed'}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {language === 'de' ? 'Durchschn. Bewertung' : 'Avg. Score'}
          </CardTitle>
          <Award className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">86.4</div>
          <p className="text-xs text-muted-foreground">
            {language === 'de' ? 'von 100 Punkten' : 'out of 100 points'}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {language === 'de' ? 'Gesamtarbeitsstunden' : 'Total Work Hours'}
          </CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">840h</div>
          <p className="text-xs text-muted-foreground">
            {language === 'de' ? 'Diesen Monat' : 'This month'}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {language === 'de' ? 'Sicherheitsvorfälle' : 'Safety Incidents'}
          </CardTitle>
          <AlertCircle className="h-4 w-4 text-amber-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">1</div>
          <p className="text-xs text-muted-foreground">
            {language === 'de' ? 'Diesen Monat' : 'This month'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
