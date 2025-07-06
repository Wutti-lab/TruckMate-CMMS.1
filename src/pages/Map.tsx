
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { MapComponent } from "@/components/MapComponent";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "@/contexts/LocationContext";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";
import { DriverLocationCard } from "@/components/map/DriverLocationCard";
import { MapControls } from "@/components/map/MapControls";
import { EmergencyContactsOverlay } from "@/components/map/EmergencyContactsOverlay";
import { RouteHistoryOverlay } from "@/components/map/RouteHistoryOverlay";
import { NotificationsOverlay } from "@/components/map/NotificationsOverlay";
import { MapLegend } from "@/components/map/MapLegend";
import { VehicleInfoCard } from "@/components/map/VehicleInfoCard";
import { GPSDataManager } from "@/components/map/GPSDataManager";
import { AdBanner } from "@/components/ads/AdBanner";
import { useRealtimeTracking } from "@/components/map/hooks/useRealtimeTracking";
import { useRealtimeData } from "@/components/dashboard/hooks/useRealtimeData";
import { MobileOptimized } from "@/components/shared/mobile/MobileOptimized";
import { useIsMobile } from "@/hooks/use-mobile";
import { RealtimeVehiclePanel } from "@/components/map/RealtimeVehiclePanel";

export default function Map() {
  const [searchParams] = useSearchParams();
  const vehicleId = searchParams.get('vehicle');
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(vehicleId);
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);
  const [trackingActive, setTrackingActive] = useState(true); // Auto-start tracking
  const [driverLocation, setDriverLocation] = useState<[number, number] | null>(null);
  const [lastUpdateTime, setLastUpdateTime] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showRouteHistory, setShowRouteHistory] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const { toast } = useToast();
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const { 
    updateVehicleLocation, 
    vehicleLocations, 
    startTrackingVehicle, 
    trackedVehicles,
    vehiclesFromDB,
    loadVehiclesFromDatabase
  } = useLocation();
  
  // Get real-time data from dashboard
  const { data: realtimeData } = useRealtimeData();
  const { 
    trackingData, 
    isTracking, 
    startRealtimeTracking, 
    stopRealtimeTracking 
  } = useRealtimeTracking();
  
  // Route history data (mock - could be made dynamic)
  const routeHistory = [
    { time: "09:15 AM", location: "Bangkok, Silom", status: "Driving" },
    { time: "10:30 AM", location: "Bangkok, Sathorn", status: "Stopped" },
    { time: "11:45 AM", location: "Bangkok, Sukhumvit", status: "Driving" },
    { time: "01:30 PM", location: "Bangkok, Victory Monument", status: "Lunch Break" },
    { time: "03:00 PM", location: "Bangkok, Lat Phrao", status: "Delivery" },
    { time: "04:20 PM", location: "Bangkok, Ratchadaphisek", status: "Driving" }
  ];
  
  // Notifications data (could be enhanced with real data)
  const notifications = [
    { id: 1, message: "Maintenance due for B-FR-123", time: "10 minutes ago", type: "warning" },
    { id: 2, message: "B-FR-234 arrived at destination", time: "45 minutes ago", type: "info" },
    { id: 3, message: "B-FR-345 low on battery (15%)", time: "1 hour ago", type: "danger" },
    { id: 4, message: "B-FR-456 exceeded speed limit", time: "2 hours ago", type: "danger" }
  ];
  
  const toggleRouteHistory = () => {
    setShowRouteHistory(!showRouteHistory);
    if (!showRouteHistory) {
      toast({
        title: extractLanguageText("Route History | ประวัติเส้นทาง | Routenverlauf", language),
        description: extractLanguageText(
          "Showing the last 24 hours of route data | แสดงข้อมูลเส้นทางในช่วง 24 ชั่วโมงที่ผ่านมา | Zeigt die Routendaten der letzten 24 Stunden", 
          language
        )
      });
    }
  };
  
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  
  // This function handles location updates from real GPS or user location
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
  
  useEffect(() => {
    // If a vehicle ID is provided in the URL, select it
    if (vehicleId) {
      setSelectedVehicle(vehicleId);
    }
    
    // Load real vehicle data when component mounts
    loadVehiclesFromDatabase();
    
    // Start real-time tracking
    if (trackingActive) {
      startRealtimeTracking();
    }
    
    return () => {
      stopRealtimeTracking();
    };
  }, [vehicleId]);

  // Auto-start tracking when tracking becomes active
  useEffect(() => {
    if (trackingActive) {
      startRealtimeTracking();
    } else {
      stopRealtimeTracking();
    }
  }, [trackingActive]);
  
  return (
    <MobileOptimized enableSwipe={isMobile}>
      <div className="flex flex-col h-full">
        <Header />
        <AdBanner position="top" />
        
        {/* GPS Data Manager - verwaltet GPS-Updates im Hintergrund */}
        <GPSDataManager 
          isActive={trackingActive} 
          vehicleId={selectedVehicle || undefined} 
        />
        
        <main className="flex-1 p-6 relative overflow-hidden">
          <div className={`mb-4 flex ${isMobile ? 'flex-col gap-2' : 'flex-wrap gap-4'} items-center justify-between`}>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                asChild
                className="flex items-center gap-2"
              >
                <Link to="/">
                  <ArrowLeft className="h-4 w-4" />
                  {extractLanguageText("Zurück zum Dashboard | Back to Dashboard | กลับไปแดชบอร์ด", language)}
                </Link>
              </Button>
              <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold`}>
                {extractLanguageText("Live Fleet Map | แผนที่ยานพาหนะสด | Live-Flottenansicht", language)}
              </h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className={`w-2 h-2 ${isTracking ? 'bg-green-500 animate-pulse' : 'bg-gray-400'} rounded-full`}></div>
              <span>{extractLanguageText(
                `${realtimeData.vehicles.length} vehicles tracking | ${realtimeData.vehicles.length} ยานพาหนะติดตาม | ${realtimeData.vehicles.length} Fahrzeuge verfolgt`, 
                language
              )}</span>
            </div>
            {!isMobile && (
              <MapControls 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setShowEmergencyContacts={setShowEmergencyContacts}
                showEmergencyContacts={showEmergencyContacts}
                toggleRouteHistory={toggleRouteHistory}
                showRouteHistory={showRouteHistory}
                toggleNotifications={toggleNotifications}
                showNotifications={showNotifications}
                notifications={notifications}
              />
            )}
          </div>

          {/* Real-time Vehicle Tracking Panel */}
          <div className="absolute top-4 left-4 z-40">
            <RealtimeVehiclePanel
              trackingData={trackingData}
              vehicles={realtimeData.vehicles}
              onSelectVehicle={setSelectedVehicle}
              selectedVehicle={selectedVehicle}
            />
          </div>

        <DriverLocationCard
          trackingActive={trackingActive}
          setTrackingActive={setTrackingActive}
          driverLocation={driverLocation}
          lastUpdateTime={lastUpdateTime}
          selectedVehicle={selectedVehicle}
          startTrackingVehicle={startTrackingVehicle}
        />

        <Tabs defaultValue="map" className="h-[calc(100%-120px)]">
          <TabsList className={`${isMobile ? 'grid-cols-2' : 'grid-cols-3'} grid w-full`}>
            <TabsTrigger value="map">{extractLanguageText("Live Map | แผนที่สด | Live-Karte", language)}</TabsTrigger>
            {!isMobile && <TabsTrigger value="satellite">{extractLanguageText("Satellite | ภาพดาวเทียม | Satellit", language)}</TabsTrigger>}
            <TabsTrigger value="traffic">{extractLanguageText("Traffic | การจราจร | Verkehr", language)}</TabsTrigger>
          </TabsList>
          <TabsContent value="map" className="h-full">
            <div className="relative rounded-md h-full border overflow-hidden">
              <MapComponent 
                onLocationUpdate={handleLocationUpdate} 
                tracking={trackingActive}
                vehicleId={selectedVehicle} 
              />
              
              <MapLegend />

              <EmergencyContactsOverlay 
                showEmergencyContacts={showEmergencyContacts}
                setShowEmergencyContacts={setShowEmergencyContacts}
              />
              
              <RouteHistoryOverlay
                showRouteHistory={showRouteHistory}
                setShowRouteHistory={setShowRouteHistory}
                selectedVehicle={selectedVehicle}
                routeHistory={routeHistory}
              />
              
              <NotificationsOverlay
                showNotifications={showNotifications}
                setShowNotifications={setShowNotifications}
                notifications={notifications}
              />
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
            <p>{extractLanguageText(
              `Real-time tracking: ${trackingData.length} vehicles active | การติดตาม: ${trackingData.length} ยานพาหนะ | Echtzeit: ${trackingData.length} Fahrzeuge aktiv`, 
              language
            )}</p>
          </div>
        </Tabs>
        
        <VehicleInfoCard
          selectedVehicle={selectedVehicle}
          setSelectedVehicle={setSelectedVehicle}
          trackingActive={trackingActive}
          setTrackingActive={setTrackingActive}
          startTrackingVehicle={startTrackingVehicle}
        />

        {/* Mobile Controls */}
        {isMobile && (
          <div className="fixed bottom-4 right-4 z-50">
            <MapControls 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setShowEmergencyContacts={setShowEmergencyContacts}
              showEmergencyContacts={showEmergencyContacts}
              toggleRouteHistory={toggleRouteHistory}
              showRouteHistory={showRouteHistory}
              toggleNotifications={toggleNotifications}
              showNotifications={showNotifications}
              notifications={notifications}
            />
          </div>
        )}
      </main>
    </div>
    </MobileOptimized>
  );
}
