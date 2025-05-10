
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Filter, MapPin, Search, Phone, Navigation, Route, History, Bell } from "lucide-react";
import { MapComponent } from "@/components/MapComponent";
import { EmergencyContacts } from "@/components/inspections/EmergencyContacts";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "@/contexts/LocationContext";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";

export default function Map() {
  const [searchParams] = useSearchParams();
  const vehicleId = searchParams.get('vehicle');
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(vehicleId);
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);
  const [trackingActive, setTrackingActive] = useState(false);
  const [driverLocation, setDriverLocation] = useState<[number, number] | null>(null);
  const [lastUpdateTime, setLastUpdateTime] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showRouteHistory, setShowRouteHistory] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const { toast } = useToast();
  const { language } = useLanguage();
  const { 
    updateVehicleLocation, 
    vehicleLocations, 
    startTrackingVehicle, 
    trackedVehicles 
  } = useLocation();
  
  const toggleTracking = (value: boolean) => {
    setTrackingActive(value);
    if (value) {
      // Update the last update time when tracking is enabled
      setLastUpdateTime(new Date().toLocaleTimeString());
      
      // If a vehicle is selected, start tracking it
      if (selectedVehicle) {
        startTrackingVehicle(selectedVehicle);
        toast({
          title: extractLanguageText(`Tracking ${selectedVehicle} | กำลังติดตาม ${selectedVehicle}`, language),
          description: extractLanguageText("Real-time location updates enabled | เปิดใช้งานการอัปเดตตำแหน่งแบบเรียลไทม์", language)
        });
      }
    }
  };

  // This function would be triggered by MapComponent when location changes
  const handleLocationUpdate = (coords: [number, number]) => {
    setDriverLocation(coords);
    setLastUpdateTime(new Date().toLocaleTimeString());
    
    // If we're tracking a vehicle, update its location in the context
    if (trackingActive && selectedVehicle) {
      updateVehicleLocation(selectedVehicle, {
        vehicleId: selectedVehicle,
        coordinates: { lat: coords[1], lng: coords[0] },
        timestamp: new Date().toISOString(),
        speed: Math.floor(Math.random() * 60), // Simulated speed
        heading: Math.floor(Math.random() * 360), // Simulated heading
      });
    }
  };
  
  const toggleRouteHistory = () => {
    setShowRouteHistory(!showRouteHistory);
    if (!showRouteHistory) {
      toast({
        title: extractLanguageText("Route History | ประวัติเส้นทาง", language),
        description: extractLanguageText("Showing the last 24 hours of route data | แสดงข้อมูลเส้นทางในช่วง 24 ชั่วโมงที่ผ่านมา", language)
      });
    }
  };
  
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  
  // Route history data (mock)
  const routeHistory = [
    { time: "09:15 AM", location: "Bangkok, Silom", status: "Driving" },
    { time: "10:30 AM", location: "Bangkok, Sathorn", status: "Stopped" },
    { time: "11:45 AM", location: "Bangkok, Sukhumvit", status: "Driving" },
    { time: "01:30 PM", location: "Bangkok, Victory Monument", status: "Lunch Break" },
    { time: "03:00 PM", location: "Bangkok, Lat Phrao", status: "Delivery" },
    { time: "04:20 PM", location: "Bangkok, Ratchadaphisek", status: "Driving" }
  ];
  
  // Notifications data (mock)
  const notifications = [
    { id: 1, message: "Maintenance due for B-FR-123", time: "10 minutes ago", type: "warning" },
    { id: 2, message: "B-FR-234 arrived at destination", time: "45 minutes ago", type: "info" },
    { id: 3, message: "B-FR-345 low on battery (15%)", time: "1 hour ago", type: "danger" },
    { id: 4, message: "B-FR-456 exceeded speed limit", time: "2 hours ago", type: "danger" }
  ];
  
  useEffect(() => {
    // If a vehicle ID is provided in the URL, select it
    if (vehicleId) {
      setSelectedVehicle(vehicleId);
    }
  }, [vehicleId]);
  
  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 p-6 relative overflow-hidden">
        <div className="mb-4 flex flex-wrap gap-4 items-center justify-between">
          <h1 className="text-2xl font-bold">{extractLanguageText("Map | แผนที่", language)}</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={extractLanguageText("Search address or vehicle... | ค้นหาที่อยู่หรือยานพาหนะ...", language)}
                className="pl-8 w-[200px] md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleRouteHistory}
              className={showRouteHistory ? "bg-blue-100 text-blue-600" : ""}
            >
              <History size={16} />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleNotifications}
              className={showNotifications ? "bg-amber-100 text-amber-600" : ""}
              aria-label="Show notifications"
            >
              <div className="relative">
                <Bell size={16} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {notifications.length}
                </span>
              </div>
            </Button>
          </div>
        </div>

        {/* Driver Location Tracking Card */}
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md flex items-center gap-2">
                <Navigation className="h-4 w-4 text-fleet-500" />
                {extractLanguageText("Driver Location | ตำแหน่งคนขับ", language)}
              </CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{extractLanguageText("Live Tracking | การติดตามแบบเรียลไทม์", language)}</span>
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
                  {extractLanguageText(trackingActive ? "Active | กำลังใช้งาน" : "Inactive | ไม่ได้ใช้งาน", language)}
                </Badge>
                {driverLocation && (
                  <div className="text-sm font-mono">
                    {driverLocation[1].toFixed(6)}°N, {driverLocation[0].toFixed(6)}°E
                  </div>
                )}
                {lastUpdateTime && (
                  <div className="text-xs text-muted-foreground">
                    {extractLanguageText(`Last updated: ${lastUpdateTime} | อัพเดทล่าสุด: ${lastUpdateTime}`, language)}
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
                    {extractLanguageText("Enable Tracking | เปิดใช้การติดตาม", language)}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="map" className="h-[calc(100%-120px)]">
          <TabsList>
            <TabsTrigger value="map">{extractLanguageText("Map | แผนที่", language)}</TabsTrigger>
            <TabsTrigger value="satellite">{extractLanguageText("Satellite | ภาพดาวเทียม", language)}</TabsTrigger>
            <TabsTrigger value="traffic">{extractLanguageText("Traffic | การจราจร", language)}</TabsTrigger>
          </TabsList>
          <TabsContent value="map" className="h-full">
            <div className="relative rounded-md h-full border overflow-hidden">
              <MapComponent 
                onLocationUpdate={handleLocationUpdate} 
                tracking={trackingActive}
                vehicleId={selectedVehicle} 
              />
              
              <Card className="absolute right-4 bottom-20 w-auto">
                <CardContent className="p-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span>{extractLanguageText("Active | กำลังปฏิบัติงาน", language)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span>{extractLanguageText("Inactive | ไม่ได้ปฏิบัติงาน", language)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span>{extractLanguageText("Problem | มีปัญหา", language)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {showEmergencyContacts && (
                <div className="absolute left-4 top-4 w-[350px] max-h-[80vh] overflow-y-auto bg-white rounded-lg shadow-lg p-4 z-20">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">{extractLanguageText("Emergency Contacts | รายชื่อติดต่อฉุกเฉิน", language)}</h2>
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
              
              {showRouteHistory && selectedVehicle && (
                <div className="absolute left-4 top-4 w-[350px] max-h-[80vh] overflow-y-auto bg-white rounded-lg shadow-lg p-4 z-20">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">
                      {extractLanguageText("Route History | ประวัติเส้นทาง", language)}
                      <Badge className="ml-2 bg-fleet-500">{selectedVehicle}</Badge>
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowRouteHistory(false)}
                    >
                      ✕
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {routeHistory.map((item, index) => (
                      <div key={index} className="border-l-2 border-fleet-500 pl-3 pb-3">
                        <p className="font-semibold text-sm">{item.time}</p>
                        <p className="text-sm">{item.location}</p>
                        <Badge variant="outline" className="mt-1">
                          {item.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {showNotifications && (
                <div className="absolute right-4 top-16 w-[350px] max-h-[80vh] overflow-y-auto bg-white rounded-lg shadow-lg p-4 z-20">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">
                      {extractLanguageText("Notifications | การแจ้งเตือน", language)}
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowNotifications(false)}
                    >
                      ✕
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {notifications.map((item) => (
                      <div 
                        key={item.id} 
                        className={`border-l-2 pl-3 pb-3 ${
                          item.type === 'warning' ? 'border-yellow-500' : 
                          item.type === 'danger' ? 'border-red-500' : 
                          'border-blue-500'
                        }`}
                      >
                        <p className="font-semibold text-sm">{item.message}</p>
                        <p className="text-xs text-gray-500">{item.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="satellite" className="h-full">
            <div className="relative rounded-md h-full border overflow-hidden">
              <MapComponent onLocationUpdate={handleLocationUpdate} tracking={trackingActive} vehicleId={selectedVehicle} />
            </div>
          </TabsContent>
          <TabsContent value="traffic" className="h-full">
            <div className="relative rounded-md h-full border overflow-hidden">
              <MapComponent onLocationUpdate={handleLocationUpdate} tracking={trackingActive} vehicleId={selectedVehicle} />
            </div>
          </TabsContent>
          
          <div className="mt-2 text-xs text-muted-foreground">
            <p>{extractLanguageText("Note: Mapbox token required for map functionality | หมายเหตุ: จำเป็นต้องใช้ Mapbox token สำหรับฟังก์ชันแผนที่", language)}</p>
          </div>
        </Tabs>
        
        {selectedVehicle && (
          <Card className="absolute left-6 top-28 w-[300px] shadow-lg z-10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-fleet-500" />
                  <h3 className="font-medium">{selectedVehicle}</h3>
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
                  <span>{extractLanguageText("Bangkok, Central | กรุงเทพ, เขตกลาง", language)}</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">{extractLanguageText("Driver | คนขับ:", language)}</span> {
                    selectedVehicle === "B-FR-123" ? "Max Müller" :
                    selectedVehicle === "B-FR-234" ? "Lisa Schmidt" :
                    selectedVehicle === "B-FR-345" ? "Jan Weber" :
                    selectedVehicle === "B-FR-456" ? "Anna Becker" : "Unknown"
                  }
                </div>
                <div className="text-sm">
                  <span className="font-medium">{extractLanguageText("Status | สถานะ:", language)}</span>{" "}
                  <span className="text-green-600">{extractLanguageText("Driving | กำลังขับ", language)}</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">{extractLanguageText("Speed | ความเร็ว:", language)}</span> 42 km/h
                </div>
                <div className="text-sm">
                  <span className="font-medium">{extractLanguageText("Fuel | เชื้อเพลิง:", language)}</span> 68%
                </div>
              </div>
              
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" size="sm">{extractLanguageText("Details | รายละเอียด", language)}</Button>
                <Button 
                  size="sm" 
                  className="bg-fleet-500"
                  onClick={() => {
                    if (trackingActive) {
                      toast({
                        title: extractLanguageText("Already Tracking | กำลังติดตามอยู่แล้ว", language),
                        description: extractLanguageText("This vehicle is already being tracked | ยานพาหนะนี้กำลังถูกติดตามอยู่", language)
                      });
                    } else {
                      setTrackingActive(true);
                      startTrackingVehicle(selectedVehicle);
                      toast({
                        title: extractLanguageText("Navigation Started | เริ่มการนำทาง", language),
                        description: extractLanguageText("Tracking vehicle location | กำลังติดตามตำแหน่งยานพาหนะ", language)
                      });
                    }
                  }}
                >
                  {extractLanguageText("Navigation | นำทาง", language)}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
