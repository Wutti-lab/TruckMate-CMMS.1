
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, Wrench } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function UpcomingServices() {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("upcomingServices")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calendar className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Ölwechsel - TM-012</p>
                <p className="text-xs text-muted-foreground">Morgen, 10:00 Uhr</p>
              </div>
            </div>
            <Badge variant="outline">Geplant</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Wrench className="h-4 w-4 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Bremsen-Inspektion - TM-033</p>
                <p className="text-xs text-muted-foreground">8. Dez, 14:00 Uhr</p>
              </div>
            </div>
            <Badge variant="outline">Anstehend</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">Jahres-TÜV - TM-001</p>
                <p className="text-xs text-muted-foreground">15. Dez, 9:00 Uhr</p>
              </div>
            </div>
            <Badge variant="outline">Ausstehend</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
