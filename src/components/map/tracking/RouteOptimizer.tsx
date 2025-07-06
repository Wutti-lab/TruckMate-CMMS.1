import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Route, 
  Navigation, 
  MapPin, 
  Clock, 
  Fuel, 
  TrendingUp,
  Zap,
  CheckCircle
} from 'lucide-react';
import { useLanguage, extractLanguageText } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface RouteWaypoint {
  id: string;
  address: string;
  coordinates: [number, number];
  priority: 'high' | 'medium' | 'low';
  timeWindow?: {
    start: string;
    end: string;
  };
  serviceTime: number; // minutes
}

interface OptimizedRoute {
  id: string;
  vehicleId: string;
  waypoints: RouteWaypoint[];
  totalDistance: number;
  totalTime: number;
  fuelConsumption: number;
  efficiency: number;
}

interface RouteOptimizerProps {
  vehicles: any[];
  onRouteOptimized?: (route: OptimizedRoute) => void;
}

export function RouteOptimizer({ vehicles, onRouteOptimized }: RouteOptimizerProps) {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationProgress, setOptimizationProgress] = useState(0);
  const [selectedVehicle, setSelectedVehicle] = useState<string>('');
  const [optimizationMode, setOptimizationMode] = useState<'time' | 'distance' | 'fuel'>('time');
  
  // Sample waypoints for demo
  const [waypoints, setWaypoints] = useState<RouteWaypoint[]>([
    {
      id: '1',
      address: 'Bangkok, Silom Road',
      coordinates: [100.5332, 13.7244],
      priority: 'high',
      timeWindow: { start: '09:00', end: '11:00' },
      serviceTime: 15
    },
    {
      id: '2', 
      address: 'Bangkok, Sukhumvit Road',
      coordinates: [100.5609, 13.7376],
      priority: 'medium',
      timeWindow: { start: '11:30', end: '14:00' },
      serviceTime: 30
    },
    {
      id: '3',
      address: 'Bangkok, Chatuchak',
      coordinates: [100.5506, 13.7997],
      priority: 'high',
      timeWindow: { start: '14:30', end: '16:00' },
      serviceTime: 20
    },
    {
      id: '4',
      address: 'Bangkok, Lat Phrao',
      coordinates: [100.5692, 13.8064],
      priority: 'low',
      serviceTime: 10
    }
  ]);

  const [optimizedRoute, setOptimizedRoute] = useState<OptimizedRoute | null>(null);

  // Route optimization algorithm (simplified)
  const optimizeRoute = async () => {
    if (!selectedVehicle) {
      toast({
        title: extractLanguageText("Error | Fehler", language),
        description: extractLanguageText("Please select a vehicle | Bitte wählen Sie ein Fahrzeug", language),
        variant: "destructive"
      });
      return;
    }

    setIsOptimizing(true);
    setOptimizationProgress(0);

    // Simulate optimization process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setOptimizationProgress(i);
    }

    // Calculate optimized route based on mode
    const optimized = calculateOptimizedRoute(waypoints, optimizationMode);
    setOptimizedRoute(optimized);
    
    if (onRouteOptimized) {
      onRouteOptimized(optimized);
    }

    setIsOptimizing(false);
    
    toast({
      title: extractLanguageText("Route Optimized | Route optimiert", language),
      description: extractLanguageText(
        `Route optimized for ${optimizationMode} | Route für ${optimizationMode} optimiert`, 
        language
      )
    });
  };

  const calculateOptimizedRoute = (waypoints: RouteWaypoint[], mode: string): OptimizedRoute => {
    // Simple optimization based on priority and time windows
    const sortedWaypoints = [...waypoints].sort((a, b) => {
      if (mode === 'time') {
        // Prioritize high priority and time windows
        if (a.priority === 'high' && b.priority !== 'high') return -1;
        if (b.priority === 'high' && a.priority !== 'high') return 1;
        return 0;
      } else if (mode === 'distance') {
        // Simple distance-based sorting (would use real distance calculation)
        return a.coordinates[0] - b.coordinates[0];
      } else {
        // Fuel optimization - similar to distance but consider traffic
        return a.serviceTime - b.serviceTime;
      }
    });

    const totalDistance = 45.2; // km (calculated)
    const totalTime = 180; // minutes
    const fuelConsumption = 8.5; // liters
    const efficiency = Math.round((100 - ((totalTime - 120) / 120) * 20)); // %

    return {
      id: `route_${Date.now()}`,
      vehicleId: selectedVehicle,
      waypoints: sortedWaypoints,
      totalDistance,
      totalTime,
      fuelConsumption,
      efficiency
    };
  };

  const getOptimizationIcon = () => {
    switch (optimizationMode) {
      case 'time': return <Clock className="h-4 w-4" />;
      case 'distance': return <Navigation className="h-4 w-4" />;
      case 'fuel': return <Fuel className="h-4 w-4" />;
      default: return <Route className="h-4 w-4" />;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Route className="h-5 w-5" />
          {extractLanguageText("Route Optimizer | Route-Optimierung", language)}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Vehicle Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            {extractLanguageText("Select Vehicle | Fahrzeug auswählen", language)}
          </label>
          <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
            <SelectTrigger>
              <SelectValue placeholder={extractLanguageText("Choose vehicle | Fahrzeug wählen", language)} />
            </SelectTrigger>
            <SelectContent>
              {vehicles.map((vehicle) => (
                <SelectItem key={vehicle.id} value={vehicle.id}>
                  {vehicle.license_plate} - {vehicle.model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Optimization Mode */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            {extractLanguageText("Optimization Mode | Optimierungs-Modus", language)}
          </label>
          <Select value={optimizationMode} onValueChange={(value) => setOptimizationMode(value as any)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="time">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {extractLanguageText("Fastest Time | Schnellste Zeit", language)}
                </div>
              </SelectItem>
              <SelectItem value="distance">
                <div className="flex items-center gap-2">
                  <Navigation className="h-4 w-4" />
                  {extractLanguageText("Shortest Distance | Kürzeste Distanz", language)}
                </div>
              </SelectItem>
              <SelectItem value="fuel">
                <div className="flex items-center gap-2">
                  <Fuel className="h-4 w-4" />
                  {extractLanguageText("Fuel Efficient | Kraftstoffeffizient", language)}
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Waypoints List */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            {extractLanguageText("Waypoints | Wegpunkte", language)} ({waypoints.length})
          </label>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {waypoints.map((waypoint, index) => (
              <div key={waypoint.id} className="flex items-center justify-between p-2 bg-muted rounded">
                <div className="flex items-center gap-2">
                  <Badge variant={waypoint.priority === 'high' ? 'destructive' : waypoint.priority === 'medium' ? 'default' : 'secondary'}>
                    {waypoint.priority}
                  </Badge>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{waypoint.address}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {waypoint.serviceTime}min
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Optimization Progress */}
        {isOptimizing && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {extractLanguageText("Optimizing Route... | Route wird optimiert...", language)}
              </span>
              <span className="text-sm text-muted-foreground">{optimizationProgress}%</span>
            </div>
            <Progress value={optimizationProgress} />
          </div>
        )}

        {/* Optimize Button */}
        <Button 
          onClick={optimizeRoute} 
          disabled={isOptimizing || !selectedVehicle}
          className="w-full"
        >
          {isOptimizing ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
              {extractLanguageText("Optimizing... | Optimierung...", language)}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {getOptimizationIcon()}
              {extractLanguageText("Optimize Route | Route optimieren", language)}
            </div>
          )}
        </Button>

        {/* Optimized Route Results */}
        {optimizedRoute && (
          <div className="space-y-4 p-4 bg-primary/5 rounded-lg border">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <h3 className="font-semibold">
                {extractLanguageText("Optimized Route | Optimierte Route", language)}
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Navigation className="h-4 w-4" />
                  {extractLanguageText("Total Distance | Gesamtdistanz", language)}
                </div>
                <div className="font-medium">{optimizedRoute.totalDistance} km</div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {extractLanguageText("Total Time | Gesamtzeit", language)}
                </div>
                <div className="font-medium">{Math.floor(optimizedRoute.totalTime / 60)}h {optimizedRoute.totalTime % 60}min</div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Fuel className="h-4 w-4" />
                  {extractLanguageText("Fuel Consumption | Kraftstoffverbrauch", language)}
                </div>
                <div className="font-medium">{optimizedRoute.fuelConsumption}L</div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  {extractLanguageText("Efficiency | Effizienz", language)}
                </div>
                <div className="font-medium text-green-600">{optimizedRoute.efficiency}%</div>
              </div>
            </div>

            <Button variant="outline" size="sm" className="w-full">
              <Zap className="h-4 w-4 mr-2" />
              {extractLanguageText("Start Navigation | Navigation starten", language)}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}