
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Car, Plus, Users } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";

export function MaintenanceAndActions() {
  const { t } = useLanguage();

  const maintenanceCosts = [
    { category: 'Engine', cost: 12000 },
    { category: 'Tires', cost: 8000 },
    { category: 'Brakes', cost: 5000 },
    { category: 'Oil Change', cost: 3000 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Maintenance Costs */}
      <Card>
        <CardHeader>
          <CardTitle>{t("maintenanceCosts")}</CardTitle>
          <CardDescription>{t("costBreakdown")}</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={maintenanceCosts}>
              <XAxis dataKey="category" />
              <YAxis />
              <Bar dataKey="cost" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>{t("quickActions")}</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full justify-start" variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            {t("scheduleInspection")}
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <AlertTriangle className="mr-2 h-4 w-4" />
            {t("reportIssue")}
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <Users className="mr-2 h-4 w-4" />
            {t("assignDriver")}
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <Car className="mr-2 h-4 w-4" />
            {t("createNewVehicle")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
