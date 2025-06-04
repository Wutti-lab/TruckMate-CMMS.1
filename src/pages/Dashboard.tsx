
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  AlertTriangle, 
  Calendar, 
  Car, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Plus, 
  TrendingUp, 
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

export default function Dashboard() {
  const { profile, hasRole } = useAuth();
  const { t } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Sample data for charts
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

  const fleetStatusData = [
    { name: t("operational"), value: 85, color: '#10b981' },
    { name: t("maintenance"), value: 12, color: '#f59e0b' },
    { name: t("outOfService"), value: 3, color: '#ef4444' },
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

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("totalVehicles")}</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">124</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("activeVehicles")}</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">105</div>
              <p className="text-xs text-muted-foreground">
                85% operational
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("driversOnDuty")}</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">
                +5 from yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("pendingIssues")}</CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">
                -3 from yesterday
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Fleet Status Chart */}
          <Card>
            <CardHeader>
              <CardTitle>{t("fleetStatus")}</CardTitle>
              <CardDescription>{t("overallHealth")}</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={fleetStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {fleetStatusData.map((entry, index) => (
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
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>{t("recentActivity")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Activity className="h-4 w-4 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Vehicle inspection completed</p>
                    <p className="text-xs text-muted-foreground">Truck #TM-001 - 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Wrench className="h-4 w-4 text-orange-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Maintenance scheduled</p>
                    <p className="text-xs text-muted-foreground">Van #TM-045 - 4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-4 w-4 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">New driver assigned</p>
                    <p className="text-xs text-muted-foreground">John Smith to Route 12 - 6 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

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
                      <p className="text-sm font-medium">Oil Change - TM-012</p>
                      <p className="text-xs text-muted-foreground">Tomorrow, 10:00 AM</p>
                    </div>
                  </div>
                  <Badge variant="outline">Scheduled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Wrench className="h-4 w-4 text-orange-600" />
                    <div>
                      <p className="text-sm font-medium">Brake Inspection - TM-033</p>
                      <p className="text-xs text-muted-foreground">Dec 8, 2:00 PM</p>
                    </div>
                  </div>
                  <Badge variant="outline">Upcoming</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">Annual Review - TM-001</p>
                      <p className="text-xs text-muted-foreground">Dec 15, 9:00 AM</p>
                    </div>
                  </div>
                  <Badge variant="outline">Pending</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
