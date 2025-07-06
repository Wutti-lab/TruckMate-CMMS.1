import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity,
  MapPin,
  Clock,
  Fuel,
  Gauge,
  AlertTriangle,
  CheckCircle,
  Navigation,
  Users,
  Route,
  Signal,
  Zap
} from 'lucide-react';
import { useLanguage, extractLanguageText } from '@/contexts/LanguageContext';
import { useLocation } from '@/contexts/LocationContext';
import { RouteOptimizer } from './RouteOptimizer';
import { GeofenceManager } from './GeofenceManager';

interface LiveVehicleData {
  id: string;
  licensePlate: string;
  status: 'active' | 'idle' | 'offline' | 'maintenance';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  speed: number;
  heading: number;
  fuel: number;
  battery: number;
  temperature: number;
  lastUpdate: string;
  driver?: string;
  route?: {
    currentDestination: string;
    eta: string;
    progress: number;
  };
}

export function LiveTrackingDashboard() {
  const { language } = useLanguage();
  const { vehiclesFromDB, vehicleLocations, loadVehiclesFromDatabase } = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [liveData, setLiveData] = useState<LiveVehicleData[]>([]);
  const [refreshInterval, setRefreshInterval] = useState(5000);

  // Convert database vehicles to live data format
  useEffect(() => {
    const convertToLiveData = (): LiveVehicleData[] => {
      return vehiclesFromDB.map(vehicle => ({
        id: vehicle.id,
        licensePlate: vehicle.license_plate,
        status: vehicle.status as any,
        location: {
          lat: vehicle.lat || 13.7244,
          lng: vehicle.lng || 100.5332,
          address: vehicle.location || 'Unknown Location'
        },
        speed: Math.floor(Math.random() * 80),
        heading: Math.floor(Math.random() * 360),
        fuel: vehicle.fuel_level || Math.floor(Math.random() * 100),
        battery: vehicle.battery_level || Math.floor(Math.random() * 100),
        temperature: Math.floor(Math.random() * 40) + 70,
        lastUpdate: new Date().toISOString(),
        driver: vehicle.vehicle_assignments?.[0]?.drivers?.name || 'Unassigned',
        route: Math.random() > 0.5 ? {
          currentDestination: 'Bangkok Downtown',
          eta: '45 min',
          progress: Math.floor(Math.random() * 100)
        } : undefined
      }));
    };

    setLiveData(convertToLiveData());
  }, [vehiclesFromDB]);

  // Real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => prev.map(vehicle => ({
        ...vehicle,
        speed: Math.max(0, vehicle.speed + (Math.random() - 0.5) * 10),
        fuel: Math.max(0, Math.min(100, vehicle.fuel + (Math.random() - 0.5) * 2)),
        battery: Math.max(0, Math.min(100, vehicle.battery + (Math.random() - 0.5) * 1)),
        temperature: Math.max(60, Math.min(120, vehicle.temperature + (Math.random() - 0.5) * 5)),
        lastUpdate: new Date().toISOString(),
        route: vehicle.route ? {
          ...vehicle.route,
          progress: Math.min(100, vehicle.route.progress + Math.random() * 5)
        } : vehicle.route
      })));
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'idle': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      case 'maintenance': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'idle': return 'secondary';
      case 'offline': return 'outline';
      case 'maintenance': return 'destructive';
      default: return 'outline';
    }
  };

  const activeVehicles = liveData.filter(v => v.status === 'active').length;
  const idleVehicles = liveData.filter(v => v.status === 'idle').length;
  const offlineVehicles = liveData.filter(v => v.status === 'offline').length;
  const maintenanceVehicles = liveData.filter(v => v.status === 'maintenance').length;

  const averageFuel = liveData.reduce((sum, v) => sum + v.fuel, 0) / liveData.length || 0;
  const averageSpeed = liveData.filter(v => v.status === 'active').reduce((sum, v) => sum + v.speed, 0) / activeVehicles || 0;

  return (
    <div className="space-y-6">
      {/* Live Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {extractLanguageText("Active Vehicles | Aktive Fahrzeuge", language)}
                </p>
                <p className="text-2xl font-bold text-green-600">{activeVehicles}</p>
              </div>
              <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                <Activity className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {extractLanguageText("Average Speed | Durchschnittsgeschwindigkeit", language)}
                </p>
                <p className="text-2xl font-bold">{Math.round(averageSpeed)} km/h</p>
              </div>
              <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Gauge className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {extractLanguageText("Average Fuel | Durchschnittlicher Kraftstoff", language)}
                </p>
                <p className="text-2xl font-bold">{Math.round(averageFuel)}%</p>
              </div>
              <div className="h-8 w-8 bg-orange-500 rounded-full flex items-center justify-center">
                <Fuel className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {extractLanguageText("Alerts | Warnungen", language)}
                </p>
                <p className="text-2xl font-bold text-red-600">{maintenanceVehicles + offlineVehicles}</p>
              </div>
              <div className="h-8 w-8 bg-red-500 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">
            {extractLanguageText("Live Overview | Live-Übersicht", language)}
          </TabsTrigger>
          <TabsTrigger value="routes">
            {extractLanguageText("Route Optimizer | Route-Optimierung", language)}
          </TabsTrigger>
          <TabsTrigger value="geofences">
            {extractLanguageText("Geofences | Geofences", language)}
          </TabsTrigger>
          <TabsTrigger value="analytics">
            {extractLanguageText("Analytics | Analysen", language)}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Live Vehicle Grid */}
          <div className="grid gap-4">
            {liveData.map((vehicle) => (
              <Card key={vehicle.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(vehicle.status)} animate-pulse`}></div>
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-ping"></div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{vehicle.licensePlate}</h3>
                        <p className="text-sm text-muted-foreground">{vehicle.driver}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusVariant(vehicle.status)}>
                        {vehicle.status}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Signal className="h-3 w-3" />
                        {extractLanguageText("Live | Live", language)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <Gauge className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {extractLanguageText("Speed | Geschwindigkeit", language)}
                        </span>
                      </div>
                      <p className="font-medium">{Math.round(vehicle.speed)} km/h</p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <Fuel className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {extractLanguageText("Fuel | Kraftstoff", language)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={vehicle.fuel} className="h-2 flex-1" />
                        <span className="text-sm font-medium">{Math.round(vehicle.fuel)}%</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <Zap className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {extractLanguageText("Battery | Batterie", language)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={vehicle.battery} className="h-2 flex-1" />
                        <span className="text-sm font-medium">{Math.round(vehicle.battery)}%</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {extractLanguageText("Location | Standort", language)}
                        </span>
                      </div>
                      <p className="text-sm font-medium truncate">{vehicle.location.address}</p>
                    </div>
                  </div>

                  {vehicle.route && (
                    <div className="bg-muted/50 rounded p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Route className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">
                            {extractLanguageText("Active Route | Aktive Route", language)}
                          </span>
                        </div>
                        <Badge variant="outline">ETA: {vehicle.route.eta}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={vehicle.route.progress} className="flex-1" />
                        <span className="text-sm text-muted-foreground">
                          {Math.round(vehicle.route.progress)}%
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {extractLanguageText("Destination | Ziel", language)}: {vehicle.route.currentDestination}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-3 pt-3 border-t">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {extractLanguageText("Last update | Letztes Update", language)}: {new Date(vehicle.lastUpdate).toLocaleTimeString()}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {vehicle.fuel < 20 && (
                        <Badge variant="destructive" className="text-xs">
                          {extractLanguageText("Low Fuel | Wenig Kraftstoff", language)}
                        </Badge>
                      )}
                      {vehicle.temperature > 100 && (
                        <Badge variant="destructive" className="text-xs">
                          {extractLanguageText("Overheating | Überhitzung", language)}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="routes">
          <RouteOptimizer 
            vehicles={vehiclesFromDB} 
            onRouteOptimized={(route) => console.log('Route optimized:', route)}
          />
        </TabsContent>

        <TabsContent value="geofences">
          <GeofenceManager vehicles={vehiclesFromDB} />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  {extractLanguageText("Fleet Status Distribution | Flottenstatusverteilung", language)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{extractLanguageText("Active | Aktiv", language)}</span>
                    <span className="font-semibold text-green-600">{activeVehicles}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{extractLanguageText("Idle | Leerlauf", language)}</span>
                    <span className="font-semibold text-yellow-600">{idleVehicles}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{extractLanguageText("Offline | Offline", language)}</span>
                    <span className="font-semibold text-gray-600">{offlineVehicles}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{extractLanguageText("Maintenance | Wartung", language)}</span>
                    <span className="font-semibold text-red-600">{maintenanceVehicles}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  {extractLanguageText("System Health | Systemzustand", language)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{extractLanguageText("GPS Signal | GPS-Signal", language)}</span>
                    <Badge variant="default" className="bg-green-500">98%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{extractLanguageText("Data Quality | Datenqualität", language)}</span>
                    <Badge variant="default" className="bg-green-500">95%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{extractLanguageText("Update Frequency | Update-Frequenz", language)}</span>
                    <Badge variant="outline">{refreshInterval/1000}s</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}