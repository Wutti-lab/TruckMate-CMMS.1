import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { Activity, AlertTriangle, Battery, Car, Clock, AreaChart, Fuel, MapPin, ThumbsUp, TrendingUp, Users, Wrench } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { DollarSign } from "lucide-react";

export default function Dashboard() {
  const oilPricePerLiter = 1.25;
  const avgOilConsumptionLiter = 10;
  const vehicleCount = 24;
  const totalOilCost = oilPricePerLiter * avgOilConsumptionLiter * vehicleCount;

  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 p-3 md:p-6 overflow-auto">
        <div className="mb-4 md:mb-8">
          <h1 className="text-lg md:text-2xl font-bold tracking-tight">แดชบอร์ด TruckMate CMMS</h1>
          <p className="text-xs md:text-base text-muted-foreground">ยินดีต้อนรับกลับ นี่คือภาพรวมของกองยานพาหนะของคุณ</p>
        </div>
        
        <div className="grid gap-3 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between p-2 md:p-3 md:pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">สถานะกองยานพาหนะ</CardTitle>
              <Car className="h-3 w-3 md:h-4 md:w-4 text-fleet-500" />
            </CardHeader>
            <CardContent className="p-2 md:p-3">
              <div className="text-base md:text-2xl font-bold">18/24</div>
              <div className="flex items-center gap-2 mt-1 md:mt-2">
                <Progress value={75} className="h-1.5 md:h-2" />
                <span className="text-[10px] md:text-xs text-muted-foreground">75%</span>
              </div>
              <p className="text-[10px] md:text-xs text-muted-foreground mt-1 md:mt-2">
                รถ 18 คันกำลังให้บริการ
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">ประสิทธิภาพการใช้เชื้อเพลิง</CardTitle>
              <Fuel className="h-4 w-4 text-fleet-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.2 ลิตร/100กม.</div>
              <div className="flex items-center text-xs text-green-500 mt-2">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>ดีขึ้น 5% จากเดือนที่แล้ว</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">สถานะคนขับ</CardTitle>
              <Users className="h-4 w-4 text-fleet-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15/20</div>
              <p className="text-xs text-muted-foreground mt-2">
                คนขับ 15 คนกำลังปฏิบัติงาน
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs">ความพร้อม 75%</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">สถานะการบำรุงรักษา</CardTitle>
              <Wrench className="h-4 w-4 text-fleet-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <div className="flex items-center text-orange-500 mt-2">
                <AlertTriangle className="h-3 w-3 mr-1" />
                <span className="text-xs">รอการบำรุงรักษา</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Ölpreis & Gesamtkosten</CardTitle>
              <DollarSign className="h-4 w-4 text-fleet-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{oilPricePerLiter.toFixed(2)} € / Liter</div>
              <div className="text-xs text-muted-foreground mt-2">ØVerbrauch: {avgOilConsumptionLiter} L / Fahrzeug</div>
              <div className="text-xs text-muted-foreground">Fuhrpark: {vehicleCount} Fahrzeuge</div>
              <div className="text-xs text-green-600 mt-2 font-semibold">Gesamtkosten: {totalOilCost.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</div>
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
              <CardDescription className="text-xs md:text-sm">การอัปเดตกองยานพาหนะแบบเรียลไทม์</CardDescription>
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
