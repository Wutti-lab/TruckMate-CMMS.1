
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { Car, Fuel, MapPin, AlertTriangle, Battery, Clock, TrendingUp, Users, Wrench, ChartPie, Plus, UserRound } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip as RechartsTooltip,
} from "recharts";
import { VehicleCosts } from "@/components/vehicles/VehicleCosts";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useAuth, LoginActivity } from "@/contexts/AuthContext";
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/lib/types/user-roles";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Dashboard() {
  const oilPricePerLiter = 1.25; // THB
  const avgOilConsumptionLiter = 10;
  const vehicleCount = 24;
  const totalOilCost = oilPricePerLiter * avgOilConsumptionLiter * vehicleCount;
  const costPerVehicleThb = oilPricePerLiter * avgOilConsumptionLiter;
  const { loginActivities } = useAuth();
  const { t, language } = useLanguage();

  // Stats for Fleet Status (Vehicles)
  const vehiclesData = [
    { name: language === 'en' ? "Active" : language === 'th' ? "กำลังใช้งาน" : "Aktiv", value: 18, color: "#5AC87A" },       
    { name: language === 'en' ? "Maintenance" : language === 'th' ? "อยู่ระหว่างซ่อมบำรุง" : "Wartung", value: 3, color: "#FDBA5C" },      
    { name: language === 'en' ? "Idle" : language === 'th' ? "จอดพัก" : "Inaktiv", value: 3, color: "#A0AEC0" },     
  ];

  // Chart Data for Trains
  const trainsData = [
    { name: language === 'en' ? "Running" : language === 'th' ? "วิ่ง" : "In Betrieb", value: 6, color: "#4E96F5" },
    { name: language === 'en' ? "Maintenance" : language === 'th' ? "ซ่อมบำรุง" : "Wartung", value: 2, color: "#FDBA5C" },
    { name: language === 'en' ? "Idle" : language === 'th' ? "จอด" : "Stillstehend", value: 1, color: "#A0AEC0" },
  ];
  const trainCount = 9;

  // New state for activities
  const [activities, setActivities] = useState([
    {
      id: 1,
      title: language === 'en' ? "Vehicle B-FR 323 has arrived at destination" : language === 'th' ? "รถทะเบียน B-FR 323 ถึงจุดหมายแล้ว" : "Fahrzeug B-FR 323 ist am Ziel angekommen",
      time: language === 'en' ? "5 minutes ago" : language === 'th' ? "5 นาทีที่แล้ว" : "vor 5 Minuten",
      icon: MapPin,
      color: "text-green-500",
    },
    {
      id: 2,
      title: language === 'en' ? "New maintenance request for B-FR 423" : language === 'th' ? "คำขอบำรุงรักษาใหม่สำหรับ B-FR 423" : "Neue Wartungsanfrage für B-FR 423",
      time: language === 'en' ? "35 minutes ago" : language === 'th' ? "35 นาทีที่แล้ว" : "vor 35 Minuten",
      icon: Wrench,
      color: "text-orange-500",
    },
    {
      id: 3,
      title: language === 'en' ? "Low fuel in B-FR 123" : language === 'th' ? "น้ำมันเหลือน้อยใน B-FR 123" : "Niedriger Kraftstoffstand in B-FR 123",
      time: language === 'en' ? "1 hour ago" : language === 'th' ? "1 ชั่วโมงที่แล้ว" : "vor 1 Stunde",
      icon: Fuel,
      color: "text-red-500",
    },
    {
      id: 4,
      title: language === 'en' ? "Driver M. Schmidt started shift" : language === 'th' ? "คนขับ M. Schmidt เริ่มกะ" : "Fahrer M. Schmidt hat Schicht begonnen",
      time: language === 'en' ? "2 hours ago" : language === 'th' ? "2 ชั่วโมงที่แล้ว" : "vor 2 Stunden",
      icon: Users,
      color: "text-fleet-500",
    },
    {
      id: 5,
      title: language === 'en' ? "Route updated for B-FR 223" : language === 'th' ? "อัปเดตเส้นทางสำหรับ B-FR 223" : "Route für B-FR 223 aktualisiert",
      time: language === 'en' ? "3 hours ago" : language === 'th' ? "3 ชั่วโมงที่แล้ว" : "vor 3 Stunden",
      icon: MapPin,
      color: "text-blue-500",
    },
  ]);

  // Activity form for new activities
  const activityForm = useForm({
    defaultValues: {
      title: "",
      type: ""
    }
  });
  const { toast } = useToast();

  const activityTypes = [
    { 
      value: "arrival", 
      label: language === 'en' ? "Vehicle Arrival" : language === 'th' ? "การมาถึงของยานพาหนะ" : "Fahrzeugankunft", 
      icon: MapPin, 
      color: "text-green-500" 
    },
    { 
      value: "maintenance", 
      label: language === 'en' ? "Maintenance Request" : language === 'th' ? "คำขอบำรุงรักษา" : "Wartungsanfrage", 
      icon: Wrench, 
      color: "text-orange-500" 
    },
    { 
      value: "fuel", 
      label: language === 'en' ? "Fuel Warning" : language === 'th' ? "คำเตือนน้ำมัน" : "Kraftstoffwarnung", 
      icon: Fuel, 
      color: "text-red-500" 
    },
    { 
      value: "driver", 
      label: language === 'en' ? "Driver Update" : language === 'th' ? "อัปเดตคนขับ" : "Fahreraktualisierung", 
      icon: Users, 
      color: "text-fleet-500" 
    },
    { 
      value: "route", 
      label: language === 'en' ? "Route Update" : language === 'th' ? "อัปเดตเส้นทาง" : "Routenaktualisierung", 
      icon: MapPin, 
      color: "text-blue-500" 
    },
  ];

  const getActivityIcon = (type: string) => {
    const activityType = activityTypes.find(t => t.value === type);
    return activityType?.icon || MapPin;
  };

  const getActivityColor = (type: string) => {
    const activityType = activityTypes.find(t => t.value === type);
    return activityType?.color || "text-blue-500";
  };

  const handleAddActivity = (data: { title: string, type: string }) => {
    const newActivity = {
      id: activities.length + 1,
      title: data.title,
      time: language === 'en' ? "Just now" : language === 'th' ? "เมื่อสักครู่" : "Gerade eben",
      icon: getActivityIcon(data.type),
      color: getActivityColor(data.type),
    };

    setActivities([newActivity, ...activities.slice(0, 4)]);
    toast({
      title: language === 'en' ? "Activity Added" : language === 'th' ? "เพิ่มกิจกรรมแล้ว" : "Aktivität hinzugefügt",
      description: language === 'en' ? "The new activity has been added successfully" : language === 'th' ? "เพิ่มกิจกรรมใหม่สำเร็จแล้ว" : "Die neue Aktivität wurde erfolgreich hinzugefügt",
    });
    activityForm.reset();
  };

  // Get filtered login activities based on user role
  const { getFilteredLoginActivities, user } = useAuth();
  const filteredLoginActivities = getFilteredLoginActivities();

  // Helper function to get badge color by role
  const getRoleBadgeColor = (role: UserRole): string => {
    switch (role) {
      case UserRole.ADMIN:
        return "bg-red-100 text-red-800";
      case UserRole.FLEET_MANAGER:
        return "bg-blue-100 text-blue-800";
      case UserRole.DRIVER:
        return "bg-green-100 text-green-800";
      case UserRole.MECHANIC:
        return "bg-orange-100 text-orange-800";
      case UserRole.DISPATCHER:
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Helper function to format time since login
  const formatTimeSince = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 60) {
      return language === 'en' 
        ? `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago` 
        : language === 'th' 
          ? `เมื่อ ${diffMins} นาทีที่แล้ว`
          : `vor ${diffMins} ${diffMins === 1 ? 'Minute' : 'Minuten'}`;
    } else {
      const diffHours = Math.floor(diffMins / 60);
      return language === 'en'
        ? `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`
        : language === 'th'
          ? `เมื่อ ${diffHours} ชั่วโมงที่แล้ว`
          : `vor ${diffHours} ${diffHours === 1 ? 'Stunde' : 'Stunden'}`;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 p-3 md:p-6 overflow-auto">
        <div className="mb-4 md:mb-8">
          <h1 className="text-lg md:text-2xl font-bold tracking-tight">TruckMate CMMS Dashboard</h1>
          <p className="text-xs md:text-base text-muted-foreground">
            {language === 'en' 
              ? 'Welcome back! Here is an overview of your fleet' 
              : language === 'th' 
                ? 'ยินดีต้อนรับกลับ นี่คือภาพรวมของกองยานพาหนะของคุณ'
                : 'Willkommen zurück! Hier ist ein Überblick über Ihre Flotte'}
          </p>
        </div>
        <div className="grid gap-3 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* Vehicle Fleet Status */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between p-2 md:p-3 md:pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">
                {language === 'en' 
                  ? 'Fleet Status' 
                  : language === 'th' 
                    ? 'สถานะกองยานพาหนะ'
                    : 'Flottenstatus'}
              </CardTitle>
              <Car className="h-3 w-3 md:h-4 md:w-4 text-fleet-500" />
            </CardHeader>
            <CardContent className="p-2 md:p-3">
              <div className="text-base md:text-2xl font-bold">18/24</div>
              <div className="flex items-center gap-2 mt-1 md:mt-2">
                <Progress value={75} className="h-1.5 md:h-2" />
                <span className="text-[10px] md:text-xs text-muted-foreground">75%</span>
              </div>
              <p className="text-[10px] md:text-xs text-muted-foreground mt-1 md:mt-2">
                {language === 'en' 
                  ? '18 vehicles in service' 
                  : language === 'th' 
                    ? 'รถ 18 คันกำลังให้บริการ'
                    : '18 Fahrzeuge im Einsatz'}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {language === 'en' 
                  ? 'Fuel Efficiency' 
                  : language === 'th' 
                    ? 'ประสิทธิภาพการใช้เชื้อเพลิง'
                    : 'Kraftstoffeffizienz'}
              </CardTitle>
              <Fuel className="h-4 w-4 text-fleet-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.2 L / 100 km</div>
              <div className="flex items-center text-xs text-green-500 mt-2">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>
                  {language === 'en' 
                    ? '5% better than last month' 
                    : language === 'th' 
                      ? 'ดีขึ้น 5% จากเดือนที่แล้ว'
                      : '5% besser als im letzten Monat'}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {language === 'en' 
                  ? 'Driver Status' 
                  : language === 'th' 
                    ? 'สถานะคนขับ'
                    : 'Fahrerstatus'}
              </CardTitle>
              <Users className="h-4 w-4 text-fleet-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15/20</div>
              <p className="text-xs text-muted-foreground mt-2">
                {language === 'en' 
                  ? '15 drivers on duty' 
                  : language === 'th' 
                    ? 'คนขับ 15 คนกำลังปฏิบัติงาน'
                    : '15 Fahrer im Dienst'}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs">
                  {language === 'en' 
                    ? '75% available' 
                    : language === 'th' 
                      ? 'ความพร้อม 75%'
                      : '75% verfügbar'}
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {language === 'en' 
                  ? 'Maintenance' 
                  : language === 'th' 
                    ? 'การบำรุงรักษา'
                    : 'Wartung'}
              </CardTitle>
              <Wrench className="h-4 w-4 text-fleet-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <div className="flex items-center text-orange-500 mt-2">
                <AlertTriangle className="h-3 w-3 mr-1" />
                <span className="text-xs">
                  {language === 'en' 
                    ? 'Awaiting maintenance' 
                    : language === 'th' 
                      ? 'รอการบำรุงรักษา'
                      : 'Wartung ausstehend'}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {language === 'en' 
                  ? 'Oil Price & Costs' 
                  : language === 'th' 
                    ? 'น้ำมันและต้นทุน'
                    : 'Ölpreis & Kosten'}
                <span className="block text-xs text-muted-foreground">
                  {language === 'en' 
                    ? 'Current oil price and total cost' 
                    : language === 'th' 
                      ? 'ราคาน้ำมันและต้นทุนรวม'
                      : 'Aktueller Ölpreis und Gesamtkosten'}
                </span>
              </CardTitle>
              <ChartPie className="h-4 w-4 text-fleet-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{oilPricePerLiter.toFixed(2)} THB / L</div>
              <div className="text-[10px] md:text-xs text-muted-foreground mt-1">
                <span className="block">
                  {language === 'en' 
                    ? `Avg. consumption: ${avgOilConsumptionLiter} L / vehicle` 
                    : language === 'th' 
                      ? `การบริโภคเฉลี่ย: ${avgOilConsumptionLiter} ลิตร / ยานพาหนะ`
                      : `Durchschn. Verbrauch: ${avgOilConsumptionLiter} L / Fahrzeug`}
                </span>
              </div>
              <div className="text-[10px] md:text-xs text-muted-foreground">
                <span className="block">
                  {language === 'en' 
                    ? `Fleet: ${vehicleCount} vehicles` 
                    : language === 'th' 
                      ? `กองรถ ${vehicleCount} คัน`
                      : `Flotte: ${vehicleCount} Fahrzeuge`}
                </span>
              </div>
              <div className="text-xs mt-2 font-semibold">
                <span className="block text-green-600">
                  {language === 'en' 
                    ? `Total cost: ${totalOilCost.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} THB` 
                    : language === 'th' 
                      ? `ต้นทุนรวม: ${totalOilCost.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท`
                      : `Gesamtkosten: ${totalOilCost.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} THB`}
                </span>
              </div>
              <div className="border-t border-muted-foreground mt-3 pt-2 space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-medium">
                    {language === 'en' 
                      ? 'Per vehicle:' 
                      : language === 'th' 
                        ? 'ต่อคัน:'
                        : 'Pro Fahrzeug:'}
                  </span>
                  <span>{avgOilConsumptionLiter} L</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-medium">
                    {language === 'en' 
                      ? 'Cost/vehicle:' 
                      : language === 'th' 
                        ? 'ต้นทุน/คัน:'
                        : 'Kosten/Fahrzeug:'}
                  </span>
                  <span>
                    {language === 'en' 
                      ? `${costPerVehicleThb.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} THB` 
                      : language === 'th' 
                        ? `${costPerVehicleThb.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท`
                        : `${costPerVehicleThb.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} THB`}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Fleet Pie Chart */}
        <div className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base md:text-lg flex items-center gap-2">
                  <ChartPie className="h-5 w-5 text-fleet-500" />
                  {language === 'en' 
                    ? 'Fleet Status' 
                    : language === 'th' 
                      ? 'สถานะกองยาน'
                      : 'Flottenstatus'}
                </CardTitle>
                <p className="text-xs mt-1 text-muted-foreground">
                  {language === 'en' 
                    ? 'Ratio of vehicles by status (Active / Maintenance / Idle)' 
                    : language === 'th' 
                      ? 'สัดส่วนสถานะรถแต่ละประเภท'
                      : 'Verhältnis der Fahrzeuge nach Status (Aktiv / Wartung / Inaktiv)'}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full flex flex-col items-center justify-center">
                <ResponsiveContainer width="99%" height={230}>
                  <PieChart>
                    <Pie
                      data={vehiclesData}
                      cx="50%"
                      cy="50%"
                      outerRadius={85}
                      innerRadius={55}
                      dataKey="value"
                      nameKey="name"
                      label={({ name, value }) =>
                        `${name}: ${value} (${Math.round((value / vehicleCount) * 100)}%)`
                      }
                    >
                      {vehiclesData.map((entry, idx) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend verticalAlign="bottom" height={24} wrapperStyle={{ fontSize: "12px" }} />
                    <RechartsTooltip
                      formatter={(value: number, name: string) =>
                        language === 'en' 
                          ? [`${value} vehicles`, name] 
                          : language === 'th' 
                            ? [`${value} คัน`, name]
                            : [`${value} Fahrzeuge`, name]
                      }
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trains Dashboard Pie Chart */}
        <div className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base md:text-lg flex items-center gap-2">
                  <ChartPie className="h-5 w-5 text-fleet-500" />
                  {language === 'en' 
                    ? 'Train Status' 
                    : language === 'th' 
                      ? 'สถานะขบวนรถไฟ'
                      : 'Zugstatus'}
                </CardTitle>
                <p className="text-xs mt-1 text-muted-foreground">
                  {language === 'en' 
                    ? 'Ratio of trains by status (Running / Maintenance / Idle)' 
                    : language === 'th' 
                      ? 'สัดส่วนสถานะของขบวนรถไฟแต่ละประเภท'
                      : 'Verhältnis der Züge nach Status (In Betrieb / Wartung / Stillstehend)'}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full flex flex-col items-center justify-center">
                <ResponsiveContainer width="99%" height={230}>
                  <PieChart>
                    <Pie
                      data={trainsData}
                      cx="50%"
                      cy="50%"
                      outerRadius={85}
                      innerRadius={55}
                      dataKey="value"
                      nameKey="name"
                      label={({ name, value }) =>
                        `${name}: ${value} (${Math.round((value / trainCount) * 100)}%)`
                      }
                    >
                      {trainsData.map((entry, idx) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend verticalAlign="bottom" height={24} wrapperStyle={{ fontSize: "12px" }} />
                    <RechartsTooltip
                      formatter={(value: number, name: string) =>
                        language === 'en' 
                          ? [`${value} trains`, name] 
                          : language === 'th' 
                            ? [`${value} ขบวน`, name]
                            : [`${value} Züge`, name]
                      }
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Login Activities Section */}
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base md:text-lg flex items-center gap-2">
                <UserRound className="h-5 w-5 text-fleet-500" />
                {language === 'en' ? 'Login Activities' : language === 'th' ? 'กิจกรรมการเข้าสู่ระบบ' : 'Anmeldeaktivitäten'}
              </CardTitle>
              <CardDescription className="text-xs">
                {user?.role === UserRole.ADMIN || user?.role === UserRole.FLEET_MANAGER 
                  ? language === 'en' 
                    ? "All user login activities" 
                    : language === 'th' 
                      ? "กิจกรรมการเข้าสู่ระบบของผู้ใช้ทั้งหมด" 
                      : "Alle Benutzeranmeldeaktivitäten"
                  : user?.role === UserRole.DRIVER
                    ? language === 'en'
                      ? "Login activities for drivers"
                      : language === 'th'
                        ? "กิจกรรมการเข้าสู่ระบบของคนขับ"
                        : "Anmeldeaktivitäten für Fahrer"
                    : user?.role === UserRole.MECHANIC
                      ? language === 'en'
                        ? "Login activities for mechanics"
                        : language === 'th'
                          ? "กิจกรรมการเข้าสู่ระบบของช่างซ่อม"
                          : "Anmeldeaktivitäten für Mechaniker"
                      : language === 'en'
                        ? "Your login activities"
                        : language === 'th'
                          ? "กิจกรรมการเข้าสู่ระบบของคุณ"
                          : "Ihre Anmeldeaktivitäten"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredLoginActivities.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">
                        {language === 'en' ? 'User' : language === 'th' ? 'ผู้ใช้' : 'Benutzer'}
                      </TableHead>
                      <TableHead>
                        {language === 'en' ? 'Role' : language === 'th' ? 'บทบาท' : 'Rolle'}
                      </TableHead>
                      <TableHead className="text-right">
                        {language === 'en' ? 'Time' : language === 'th' ? 'เวลา' : 'Zeit'}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLoginActivities.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell className="font-medium">{activity.userName}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getRoleBadgeColor(activity.userRole)}>
                            {activity.userRole}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {formatTimeSince(new Date(activity.timestamp))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
                  <UserRound className="h-10 w-10 mb-2 opacity-20" />
                  <p>
                    {language === 'en' 
                      ? 'No login activities yet' 
                      : language === 'th' 
                        ? 'ยังไม่มีกิจกรรมการเข้าสู่ระบบ'
                        : 'Noch keine Anmeldeaktivitäten'}
                  </p>
                  <p className="text-xs mt-1">
                    {language === 'en' 
                      ? 'Log in to see activity records' 
                      : language === 'th' 
                        ? 'เข้าสู่ระบบเพื่อดูบันทึกกิจกรรม'
                        : 'Melden Sie sich an, um Aktivitätsaufzeichnungen zu sehen'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Vehicle Costs Section */}
        <div className="mt-6">
          <VehicleCosts />
        </div>
        <div className="grid gap-3 md:gap-6 mt-3 md:mt-6 grid-cols-1 md:grid-cols-12">
          <Card className="col-span-1 md:col-span-8">
            <CardHeader>
              <CardTitle className="text-sm md:text-base">
                {language === 'en' 
                  ? 'Fleet Overview' 
                  : language === 'th' 
                    ? 'ภาพรวมกองยานพาหนะ'
                    : 'Flottenübersicht'}
              </CardTitle>
              <CardDescription className="text-xs md:text-sm">
                {language === 'en' 
                  ? 'Current vehicle status' 
                  : language === 'th' 
                    ? 'สถานะรถปัจจุบัน'
                    : 'Aktueller Fahrzeugstatus'}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid gap-2 md:gap-4 p-2 md:p-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                  {[1, 2, 3, 4].map((index) => (
                    <div key={index} className="flex flex-col gap-2 p-2 md:p-3 rounded-lg bg-muted/5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="rounded-md bg-fleet-100 p-1 md:p-1.5">
                            <Car className="h-3 w-3 md:h-4 md:w-4 text-fleet-500" />
                          </div>
                          <span className="text-xs md:text-sm font-medium">B-FR {index}23</span>
                        </div>
                        <div className={`px-1.5 md:px-2 py-0.5 rounded-full text-[10px] md:text-xs ${
                          index === 3 
                            ? "bg-orange-100 text-orange-600" 
                            : "bg-green-100 text-green-600"
                        }`}>
                          {index === 3 
                            ? language === 'en' 
                              ? "Maintenance" 
                              : language === 'th' 
                                ? "ซ่อมบำรุง"
                                : "Wartung"
                            : language === 'en'
                              ? "Active"
                              : language === 'th'
                                ? "ใช้งานอยู่"
                                : "Aktiv"}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 md:gap-2 text-[10px] md:text-xs text-muted-foreground">
                        <MapPin className="h-2.5 w-2.5 md:h-3 md:w-3" />
                        <span>Berlin{index === 4 ? ", Marzahn" : index === 3 ? ", Werkstatt" : ", Mitte"}</span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-1 md:gap-2 mt-1">
                        <div className="flex items-center gap-1 text-[10px] md:text-xs text-muted-foreground">
                          <Fuel className="h-2.5 w-2.5 md:h-3 md:w-3" />
                          <span>{70 + index * 5}%</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] md:text-xs text-muted-foreground">
                          <Battery className="h-2.5 w-2.5 md:h-3 md:w-3" />
                          <span>{80 + index * 5}%</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] md:text-xs text-muted-foreground">
                          <Clock className="h-2.5 w-2.5 md:h-3 md:w-3" />
                          <span>
                            {3 + index}.2 {language === 'en' ? 'hrs' : language === 'th' ? 'ชม.' : 'Std.'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1 md:col-span-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm md:text-base">
                  {language === 'en' ? 'Recent Activities' : language === 'th' ? 'กิจกรรมล่าสุด' : 'Neueste Aktivitäten'}
                </CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  {language === 'en' 
                    ? 'Real-time fleet updates' 
                    : language === 'th' 
                      ? 'การอัพเดตกองยานพาหนะแบบเรียลไทม์'
                      : 'Echtzeit-Flottenaktualisierungen'}
                </CardDescription>
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Plus className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>
                      {language === 'en' 
                        ? 'Add New Activity' 
                        : language === 'th' 
                          ? 'เพิ่มกิจกรรมใหม่'
                          : 'Neue Aktivität hinzufügen'}
                    </SheetTitle>
                  </SheetHeader>
                  <Form {...activityForm}>
                    <form onSubmit={activityForm.handleSubmit(handleAddActivity)} className="space-y-4 mt-4">
                      <FormField
                        control={activityForm.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {language === 'en' 
                                ? 'Activity Type' 
                                : language === 'th' 
                                  ? 'ประเภทกิจกรรม'
                                  : 'Aktivitätstyp'}
                            </FormLabel>
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={
                                    language === 'en' 
                                      ? "Select activity type" 
                                      : language === 'th' 
                                        ? "เลือกประเภทกิจกรรม"
                                        : "Aktivitätstyp auswählen"
                                  } />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {activityTypes.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={activityForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {language === 'en' 
                                ? 'Activity Description' 
                                : language === 'th' 
                                  ? 'รายละเอียดกิจกรรม'
                                  : 'Aktivitätsbeschreibung'}
                            </FormLabel>
                            <FormControl>
                              <Input placeholder={
                                language === 'en' 
                                  ? "Enter activity description" 
                                  : language === 'th' 
                                    ? "ป้อนรายละเอียดกิจกรรม"
                                    : "Aktivitätsbeschreibung eingeben"
                              } {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full">
                        {language === 'en' 
                          ? 'Add Activity' 
                          : language === 'th' 
                            ? 'เพิ่มกิจกรรม'
                            : 'Aktivität hinzufügen'}
                      </Button>
                    </form>
                  </Form>
                </SheetContent>
              </Sheet>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 md:space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-2 md:gap-3">
                    <div className={`rounded-full p-1 md:p-1.5 ${activity.color} bg-opacity-10`}>
                      <activity.icon className={`h-2.5 w-2.5 md:h-3 md:w-3 ${activity.color}`} />
                    </div>
                    <div className="flex-1 space-y-0.5 md:space-y-1">
                      <p className="text-xs md:text-sm">{activity.title}</p>
                      <p className="text-[10px] md:text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
