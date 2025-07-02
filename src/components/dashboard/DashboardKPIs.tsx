
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, CheckCircle2, Users, AlertTriangle, Calendar } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardKPIsProps {
  totalVehicles: number;
  activeVehicles: number;
  driversOnDuty: number;
  pendingIssues: number;
  upcomingServices: number;
  loading: boolean;
}

export function DashboardKPIs({
  totalVehicles,
  activeVehicles,
  driversOnDuty,
  pendingIssues,
  upcomingServices,
  loading
}: DashboardKPIsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {[...Array(5)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const operationalRate = totalVehicles > 0 ? Math.round((activeVehicles / totalVehicles) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Fahrzeuge Gesamt</CardTitle>
          <Car className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalVehicles}</div>
          <p className="text-xs text-muted-foreground">
            Gesamtflotte
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Aktive Fahrzeuge</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeVehicles}</div>
          <p className="text-xs text-muted-foreground">
            {operationalRate}% einsatzbereit
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Fahrer im Dienst</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{driversOnDuty}</div>
          <p className="text-xs text-muted-foreground">
            Aktive Fahrer
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Offene Probleme</CardTitle>
          <AlertTriangle className="h-4 w-4 text-amber-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingIssues}</div>
          <p className="text-xs text-muted-foreground">
            Erfordern Aufmerksamkeit
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Anstehende Services</CardTitle>
          <Calendar className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{upcomingServices}</div>
          <p className="text-xs text-muted-foreground">
            Nächste 30 Tage
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
