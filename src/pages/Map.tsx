
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Filter, MapPin, Search, Phone, Navigation } from "lucide-react";
import { MapComponent } from "@/components/MapComponent";
import { EmergencyContacts } from "@/components/inspections/EmergencyContacts";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export default function Map() {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);
  const [trackingActive, setTrackingActive] = useState(false);
  const [driverLocation, setDriverLocation] = useState<[number, number] | null>(null);
  const [lastUpdateTime, setLastUpdateTime] = useState<string | null>(null);
  
  const toggleTracking = (value: boolean) => {
    setTrackingActive(value);
    if (value) {
      // Update the last update time when tracking is enabled
      setLastUpdateTime(new Date().toLocaleTimeString());
    }
  };

  // This function would be triggered by MapComponent when location changes
  const handleLocationUpdate = (coords: [number, number]) => {
    setDriverLocation(coords);
    setLastUpdateTime(new Date().toLocaleTimeString());
  };
  
  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 p-6 relative overflow-hidden">
        <div className="mb-4 flex flex-wrap gap-4 items-center justify-between">
          <h1 className="text-2xl font-bold">Map | แผนที่</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search address or vehicle... | ค้นหาที่อยู่หรือยานพาหนะ..."
                className="pl-8 w-[200px] md:w-[300px]"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter size={16} />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setShowEmergencyContacts(!showEmergencyContacts)}
              className={showEmergencyContacts ? "bg-red-100 text-red-600" : ""}
            >
              <Phone size={16} />
            </Button>
          </div>
        </div>

        {/* Driver Location Tracking Card */}
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md flex items-center gap-2">
                <Navigation className="h-4 w-4 text-fleet-500" />
                Driver Location | ตำแหน่งคนขับ
              </CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Live Tracking | การติดตามแบบเรียลไทม์</span>
                <Switch 
                  checked={trackingActive} 
                  onCheckedChange={toggleTracking}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 justify-between items-center">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={trackingActive ? "bg-green-100 text-green-600" : "bg-gray-100"}>
                  {trackingActive ? "Active | กำลังใช้งาน" : "Inactive | ไม่ได้ใช้งาน"}
                </Badge>
                {driverLocation && (
                  <div className="text-sm font-mono">
                    {driverLocation[1].toFixed(6)}°N, {driverLocation[0].toFixed(6)}°E
                  </div>
                )}
                {lastUpdateTime && (
                  <div className="text-xs text-muted-foreground">
                    Last updated: {lastUpdateTime} | อัพเดทล่าสุด: {lastUpdateTime}
                  </div>
                )}
              </div>
              <div>
                {!trackingActive && (
                  <Button 
                    onClick={() => setTrackingActive(true)} 
                    size="sm" 
                    variant="default" 
                    className="bg-fleet-500"
                  >
                    Enable Tracking | เปิดใช้การติดตาม
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="map" className="h-[calc(100%-120px)]">
          <TabsList>
            <TabsTrigger value="map">Map | แผนที่</TabsTrigger>
            <TabsTrigger value="satellite">Satellite | ภาพดาวเทียม</TabsTrigger>
            <TabsTrigger value="traffic">Traffic | การจราจร</TabsTrigger>
          </TabsList>
          <TabsContent value="map" className="h-full">
            <div className="relative rounded-md h-full border overflow-hidden">
              <MapComponent onLocationUpdate={handleLocationUpdate} tracking={trackingActive} />
              
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
              
              <Card className="absolute right-4 bottom-20 w-auto">
                <CardContent className="p-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span>Active | กำลังปฏิบัติงาน</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span>Inactive | ไม่ได้ปฏิบัติงาน</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span>Problem | มีปัญหา</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {showEmergencyContacts && (
                <div className="absolute left-4 top-4 w-[350px] max-h-[80vh] overflow-y-auto bg-white rounded-lg shadow-lg p-4 z-20">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Emergency Contacts | รายชื่อติดต่อฉุกเฉิน</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowEmergencyContacts(false)}
                    >
                      ✕
                    </Button>
                  </div>
                  <EmergencyContacts />
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="satellite" className="h-full">
            <div className="relative rounded-md h-full border overflow-hidden">
              <MapComponent onLocationUpdate={handleLocationUpdate} tracking={trackingActive} />
            </div>
          </TabsContent>
          <TabsContent value="traffic" className="h-full">
            <div className="relative rounded-md h-full border overflow-hidden">
              <MapComponent onLocationUpdate={handleLocationUpdate} tracking={trackingActive} />
            </div>
          </TabsContent>
          
          <div className="mt-2 text-xs text-muted-foreground">
            <p>Note: Mapbox token required for map functionality | หมายเหตุ: จำเป็นต้องใช้ Mapbox token สำหรับฟังก์ชันแผนที่</p>
          </div>
        </Tabs>
        
        {selectedVehicle && (
          <Card className="absolute left-6 top-28 w-[300px] shadow-lg z-10">
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
                  <span>Bangkok, Central | กรุงเทพ, เขตกลาง</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">Driver | คนขับ:</span> Michael Schmidt
                </div>
                <div className="text-sm">
                  <span className="font-medium">Status | สถานะ:</span>{" "}
                  <span className="text-green-600">Driving | กำลังขับ</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">Speed | ความเร็ว:</span> 42 km/h
                </div>
                <div className="text-sm">
                  <span className="font-medium">Fuel | เชื้อเพลิง:</span> 68%
                </div>
              </div>
              
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" size="sm">Details | รายละเอียด</Button>
                <Button size="sm" className="bg-fleet-500">Navigation | นำทาง</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
