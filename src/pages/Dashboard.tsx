import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { Car, Fuel, MapPin, AlertTriangle, Battery, Clock, TrendingUp, Users, Wrench, ChartPie } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip as RechartsTooltip,
} from "recharts";

export default function Dashboard() {
  const oilPricePerLiter = 1.25; // THB
  const avgOilConsumptionLiter = 10;
  const vehicleCount = 24;
  const totalOilCost = oilPricePerLiter * avgOilConsumptionLiter * vehicleCount;
  const costPerVehicleThb = oilPricePerLiter * avgOilConsumptionLiter;

  // Stats for Fleet Status (Vehicles)
  const vehiclesData = [
    { name: "Active | กำลังใช้งาน", value: 18, color: "#5AC87A" },       
    { name: "Maintenance | อยู่ระหว่างซ่อมบำรุง", value: 3, color: "#FDBA5C" },      
    { name: "Idle | จอดพัก", value: 3, color: "#A0AEC0" },     
  ];

  // NEW: Chart Data for Trains
  const trainsData = [
    { name: "Running | วิ่ง", value: 6, color: "#4E96F5" },
    { name: "Maintenance | ซ่อมบำรุง", value: 2, color: "#FDBA5C" },
    { name: "Idle | จอด", value: 1, color: "#A0AEC0" },
  ];
  const trainCount = 9;

  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 p-3 md:p-6 overflow-auto">
        <div className="mb-4 md:mb-8">
          <h1 className="text-lg md:text-2xl font-bold tracking-tight">TruckMate CMMS Dashboard</h1>
          <p className="text-xs md:text-base text-muted-foreground">Welcome back! | ยินดีต้อนรับกลับ นี่คือภาพรวมของกองยานพาหนะของคุณ</p>
        </div>
        <div className="grid gap-3 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* Vehicle Fleet Status */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between p-2 md:p-3 md:pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">
                Fleet Status | สถานะกองยานพาหนะ
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
                18 vehicles in service | รถ 18 คันกำลังให้บริการ
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Fuel Efficiency | ประสิทธิภาพการใช้เชื้อเพลิง</CardTitle>
              <Fuel className="h-4 w-4 text-fleet-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.2 L / 100 km</div>
              <div className="flex items-center text-xs text-green-500 mt-2">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>5% better than last month | ดีขึ้น 5% จากเดือนที่แล้ว</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Driver Status | สถานะคนขับ</CardTitle>
              <Users className="h-4 w-4 text-fleet-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15/20</div>
              <p className="text-xs text-muted-foreground mt-2">
                15 drivers on duty | คนขับ 15 คนกำลังปฏิบัติงาน
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs">75% available | ความพร้อม 75%</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Maintenance | การบำรุงรักษา</CardTitle>
              <Wrench className="h-4 w-4 text-fleet-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <div className="flex items-center text-orange-500 mt-2">
                <AlertTriangle className="h-3 w-3 mr-1" />
                <span className="text-xs">Awaiting maintenance | รอการบำรุงรักษา</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Oil Price & Costs | น้ำมันและต้นทุน
                <span className="block text-xs text-muted-foreground">Current oil price and total cost | ราคาน้ำมันและต้นทุนรวม</span>
              </CardTitle>
              <ChartPie className="h-4 w-4 text-fleet-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{oilPricePerLiter.toFixed(2)} THB / L</div>
              <div className="text-[10px] md:text-xs text-muted-foreground mt-1">
                <span className="block">Avg. consumption: {avgOilConsumptionLiter} L / vehicle | การบริโภคเฉลี่ย: {avgOilConsumptionLiter} ลิตร / ยานพาหนะ</span>
              </div>
              <div className="text-[10px] md:text-xs text-muted-foreground">
                <span className="block">Fleet: {vehicleCount} vehicles | กองรถ {vehicleCount} คัน</span>
              </div>
              <div className="text-xs mt-2 font-semibold">
                <span className="block text-green-600">
                  Total cost: {totalOilCost.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} THB | ต้นทุนรวม: {totalOilCost.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท
                </span>
              </div>
              <div className="border-t border-muted-foreground mt-3 pt-2 space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-medium">Per vehicle:</span>
                  <span>{avgOilConsumptionLiter} L</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-medium">Cost/vehicle:</span>
                  <span>{costPerVehicleThb.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} THB</span>
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
                  Fleet Status | สถานะกองยาน (Fleet)
                </CardTitle>
                <p className="text-xs mt-1 text-muted-foreground">
                  Ratio of vehicles by status (Active / Maintenance / Idle) | สัดส่วนสถานะรถแต่ละประเภท
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
                        [`${value} vehicles | คัน`, name]
                      }
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* NEW: Trains Dashboard (Pie Chart) */}
        <div className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base md:text-lg flex items-center gap-2">
                  <ChartPie className="h-5 w-5 text-fleet-500" />
                  Train Status | สถานะขบวนรถไฟ
                </CardTitle>
                <p className="text-xs mt-1 text-muted-foreground">
                  Ratio of trains by status (Running / Maintenance / Idle) | สัดส่วนสถานะของขบวนรถไฟแต่ละประเภท
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
                        [`${value} trains | ขบวน`, name]
                      }
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-3 md:gap-6 mt-3 md:mt-6 grid-cols-1 md:grid-cols-12">
          <Card className="col-span-1 md:col-span-8">
            <CardHeader>
              <CardTitle className="text-sm md:text-base">ภาพรวมกองยานพาหนะ</CardTitle>
              <CardDescription className="text-xs md:text-sm">สถานะรถปัจจุบัน</CardDescription>
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
                          {index === 3 ? "Wartung" : "Aktiv"}
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
                          <span>{3 + index}.2 Std.</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1 md:col-span-4">
            <CardHeader>
              <CardTitle className="text-sm md:text-base">กิจกรรมล่าสุด</CardTitle>
              <CardDescription className="text-xs md:text-sm">การอั��เดตกองยานพาหนะแบบเรียลไทม์</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 md:space-y-4">
                {[
                  {
                    title: "รถทะเบียน B-FR 323 ถึงจุดหมายแล้ว",
                    time: "5 นาทีที่แล้ว",
                    icon: MapPin,
                    color: "text-green-500",
                  },
                  {
                    title: "คำขอบำรุงรักษาใหม่สำหรับ B-FR 423",
                    time: "35 นาทีที่แล้ว",
                    icon: Wrench,
                    color: "text-orange-500",
                  },
                  {
                    title: "น้ำมันเหลือน้อยใน B-FR 123",
                    time: "1 ชั่วโมงที่แล้ว",
                    icon: Fuel,
                    color: "text-red-500",
                  },
                  {
                    title: "คนขับ M. Schmidt เริ่มกะ",
                    time: "2 ชั่วโมงที่แล้ว",
                    icon: Users,
                    color: "text-fleet-500",
                  },
                  {
                    title: "อัปเดตเส้นทางสำหรับ B-FR 223",
                    time: "3 ชั่วโมงที่แล้ว",
                    icon: MapPin,
                    color: "text-blue-500",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-2 md:gap-3">
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
