import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Filter, MapPin, Search } from "lucide-react";
import { MapComponent } from "@/components/MapComponent";

export default function Map() {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  
  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 p-6 relative overflow-hidden">
        <div className="mb-4 flex flex-wrap gap-4 items-center justify-between">
          <h1 className="text-2xl font-bold">แผนที่</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ค้นหาที่อยู่หรือยานพาหนะ..."
                className="pl-8 w-[200px] md:w-[300px]"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter size={16} />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="map" className="h-[calc(100%-40px)]">
          <TabsList>
            <TabsTrigger value="map">แผนที่</TabsTrigger>
            <TabsTrigger value="satellite">ดาวเทียม</TabsTrigger>
            <TabsTrigger value="traffic">การจราจร</TabsTrigger>
          </TabsList>
          <TabsContent value="map" className="h-full">
            <div className="relative rounded-md h-full border overflow-hidden">
              <MapComponent />
              
              {/* Vehicle markers */}
              {[
                { id: "car1", position: { top: "20%", left: "30%" } },
                { id: "car2", position: { top: "40%", left: "50%" } },
                { id: "car3", position: { top: "60%", left: "25%" } },
                { id: "car4", position: { top: "35%", left: "70%" } },
              ].map((vehicle) => (
                <Button
                  key={vehicle.id}
                  variant="outline"
                  size="icon"
                  className="absolute w-8 h-8 rounded-full bg-fleet-500 text-white hover:bg-fleet-600 border-2 border-white shadow-md"
                  style={{ top: vehicle.position.top, left: vehicle.position.left }}
                  onClick={() => setSelectedVehicle(vehicle.id)}
                >
                  <Car size={14} />
                </Button>
              ))}
              
              {/* Legend */}
              <Card className="absolute right-4 bottom-4 w-auto">
                <CardContent className="p-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span>ใช้งานอยู่</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span>ไม่ใช้งาน</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span>ปัญหา</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="satellite" className="h-full">
            <div className="relative rounded-md h-full border overflow-hidden">
              <MapComponent />
            </div>
          </TabsContent>
          <TabsContent value="traffic" className="h-full">
            <div className="relative rounded-md h-full border overflow-hidden">
              <MapComponent />
            </div>
          </TabsContent>
          
          {/* Hinweis zur Konfiguration */}
          <div className="mt-2 text-xs text-muted-foreground">
            <p>หมายเหตุ: ต้องการ Mapbox Token เพื่อให้แผนที่ทำงานได้ กรุณาตั้งค่าใน MapComponent.tsx</p>
          </div>
        </Tabs>
        
        {/* Info panel for selected vehicle */}
        {selectedVehicle && (
          <Card className="absolute left-6 top-28 w-[300px] shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-fleet-500" />
                  <h3 className="font-medium">B-FR {selectedVehicle.slice(-1)}23</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedVehicle(null)}
                >
                  ✕
                </Button>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-fleet-500" />
                  <span>กรุงเทพฯ, สาทร</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">คนขับ:</span> สมชาย ใจดี
                </div>
                <div className="text-sm">
                  <span className="font-medium">สถานะ:</span>{" "}
                  <span className="text-green-600">กำลังขับ</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">ความเร็ว:</span> 42 กม./ชม.
                </div>
                <div className="text-sm">
                  <span className="font-medium">ระดับน้ำมัน:</span> 68%
                </div>
              </div>
              
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" size="sm">รายละเอียด</Button>
                <Button size="sm" className="bg-fleet-500">นำทาง</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
