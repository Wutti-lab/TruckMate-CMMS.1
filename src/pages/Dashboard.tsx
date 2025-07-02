
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Calendar, 
  Car, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Plus, 
  Users, 
  Wrench 
} from "lucide-react";
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart, 
  Cell, 
  Pie, 
  PieChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis 
} from "recharts";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDashboardData } from "@/hooks/useDashboardData";
import { DashboardKPIs } from "@/components/dashboard/DashboardKPIs";
import { RecentActivities } from "@/components/dashboard/RecentActivities";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import { CriticalAlertDialog } from "@/components/notifications/CriticalAlertDialog";
import { useRealtimeNotifications } from "@/hooks/useRealtimeNotifications";
import { useNotifications } from "@/contexts/NotificationContext";

export default function Dashboard() {
  const { profile, hasRole } = useAuth();
  const { t } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  const { stats, loading, refetch } = useDashboardData();
  const { criticalAlerts, dismissCriticalAlert, dismissAllCriticalAlerts } = useNotifications();

  // Initialize real-time notifications
  useRealtimeNotifications();

  // Sample data for charts (can be made dynamic later)
  const fuelData = [
    { month: 'Jan', consumption: 2400 },
    { month: 'Feb', consumption: 1398 },
    { month: 'Mar', consumption: 9800 },
    { month: 'Apr', consumption: 3908 },
    { month: 'May', consumption: 4800 },
    { month: 'Jun', consumption: 3800 },
  ];

  const maintenanceCosts = [
    { category: 'Engine', cost: 12000 },
    { category: 'Tires', cost: 8000 },
    { category: 'Brakes', cost: 5000 },
    { category: 'Oil Change', cost: 3000 },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 p-6 overflow-auto bg-gray-50">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t("welcomeBack")}, {profile?.name || "User"}!
          </h1>
          <p className="text-gray-600">
            {t("lastUpdated")}: {currentTime.toLocaleString()}
          </p>
        </div>

        {/* Key Metrics Cards - Now with real data */}
        <DashboardKPIs
          totalVehicles={stats.totalVehicles}
          activeVehicles={stats.activeVehicles}
          driversOnDuty={stats.driversOnDuty}
          pendingIssues={stats.pendingIssues}
          upcomingServices={stats.upcomingServices}
          loading={loading}
        />

        {/* Charts and Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Fleet Status Chart - Now with real data */}
          <Card>
            <CardHeader>
              <CardTitle>{t("fleetStatus")}</CardTitle>
              <CardDescription>{t("overallHealth")}</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stats.fleetStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {stats.fleetStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Fuel Consumption Chart */}
          <Card>
            <CardHeader>
              <CardTitle>{t("fuelConsumption")}</CardTitle>
              <CardDescription>Monthly fuel usage trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={fuelData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Area 
                    type="monotone" 
                    dataKey="consumption" 
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.1} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Maintenance Costs and Quick Actions */}
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

        {/* Recent Activity and Upcoming Services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity - Now with real data */}
          <RecentActivities 
            activities={stats.recentActivities}
            loading={loading}
          />

          {/* Upcoming Services */}
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
        </div>
      </main>

      {/* Notification Components */}
      <NotificationCenter />
      <CriticalAlertDialog
        alerts={criticalAlerts}
        onDismiss={dismissCriticalAlert}
        onDismissAll={dismissAllCriticalAlerts}
      />
    </div>
  );
}
