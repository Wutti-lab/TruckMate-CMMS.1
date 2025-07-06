import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Shield, 
  AlertTriangle, 
  MapPin, 
  Plus,
  Trash2,
  Eye,
  Settings,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useLanguage, extractLanguageText } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from '@/contexts/LocationContext';

interface Geofence {
  id: string;
  name: string;
  center: [number, number];
  radius: number; // meters
  type: 'entry' | 'exit' | 'both';
  isActive: boolean;
  vehicleIds: string[];
  notifications: {
    email: boolean;
    sms: boolean; 
    push: boolean;
  };
  createdAt: string;
  violations: number;
}

interface GeofenceViolation {
  id: string;
  geofenceId: string;
  vehicleId: string;
  violationType: 'entry' | 'exit';
  timestamp: string;
  coordinates: [number, number];
}

interface GeofenceManagerProps {
  vehicles: any[];
}

export function GeofenceManager({ vehicles }: GeofenceManagerProps) {
  const { language } = useLanguage();
  const { toast } = useToast();
  const { vehiclesFromDB, vehicleLocations } = useLocation();
  
  const [geofences, setGeofences] = useState<Geofence[]>([
    {
      id: '1',
      name: 'Bangkok Downtown',
      center: [100.5332, 13.7244],
      radius: 2000,
      type: 'both',
      isActive: true,
      vehicleIds: [],
      notifications: { email: true, sms: false, push: true },
      createdAt: new Date().toISOString(),
      violations: 3
    },
    {
      id: '2', 
      name: 'Warehouse Zone',
      center: [100.5609, 13.7376],
      radius: 500,
      type: 'entry',
      isActive: true,
      vehicleIds: [],
      notifications: { email: true, sms: true, push: true },
      createdAt: new Date().toISOString(),
      violations: 0
    }
  ]);

  const [violations, setViolations] = useState<GeofenceViolation[]>([
    {
      id: '1',
      geofenceId: '1',
      vehicleId: vehicles[0]?.id || 'v1',
      violationType: 'exit',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      coordinates: [100.5332, 13.7244]
    }
  ]);

  const [newGeofence, setNewGeofence] = useState({
    name: '',
    center: [100.5332, 13.7244] as [number, number],
    radius: 1000,
    type: 'both' as 'entry' | 'exit' | 'both'
  });

  const [showCreateForm, setShowCreateForm] = useState(false);

  // Monitor vehicle positions for geofence violations
  useEffect(() => {
    const checkGeofenceViolations = () => {
      geofences.forEach(geofence => {
        if (!geofence.isActive) return;

        vehiclesFromDB.forEach(vehicle => {
          if (!vehicle.lat || !vehicle.lng) return;

          const distance = calculateDistance(
            [vehicle.lng, vehicle.lat],
            geofence.center
          );

          const isInside = distance <= geofence.radius;
          const wasInside = getLastKnownPosition(vehicle.id, geofence.id);

          // Detect entry violation
          if (!wasInside && isInside && (geofence.type === 'entry' || geofence.type === 'both')) {
            handleViolation(geofence, vehicle, 'entry', [vehicle.lng, vehicle.lat]);
          }

          // Detect exit violation  
          if (wasInside && !isInside && (geofence.type === 'exit' || geofence.type === 'both')) {
            handleViolation(geofence, vehicle, 'exit', [vehicle.lng, vehicle.lat]);
          }
        });
      });
    };

    const interval = setInterval(checkGeofenceViolations, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, [geofences, vehiclesFromDB]);

  const calculateDistance = (point1: [number, number], point2: [number, number]): number => {
    const R = 6371000; // Earth's radius in meters
    const lat1Rad = (point1[1] * Math.PI) / 180;
    const lat2Rad = (point2[1] * Math.PI) / 180;
    const deltaLat = ((point2[1] - point1[1]) * Math.PI) / 180;
    const deltaLng = ((point2[0] - point1[0]) * Math.PI) / 180;

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
              Math.cos(lat1Rad) * Math.cos(lat2Rad) *
              Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const getLastKnownPosition = (vehicleId: string, geofenceId: string): boolean => {
    // Simple implementation - in real app would check historical data
    return Math.random() > 0.5;
  };

  const handleViolation = (geofence: Geofence, vehicle: any, type: 'entry' | 'exit', coords: [number, number]) => {
    const violation: GeofenceViolation = {
      id: `violation_${Date.now()}`,
      geofenceId: geofence.id,
      vehicleId: vehicle.id,
      violationType: type,
      timestamp: new Date().toISOString(),
      coordinates: coords
    };

    setViolations(prev => [violation, ...prev]);
    
    // Update violation count
    setGeofences(prev => prev.map(gf => 
      gf.id === geofence.id 
        ? { ...gf, violations: gf.violations + 1 }
        : gf
    ));

    // Send notifications
    if (geofence.notifications.push) {
      toast({
        title: extractLanguageText("Geofence Violation | Geofence-Verletzung", language),
        description: extractLanguageText(
          `Vehicle ${vehicle.license_plate} ${type === 'entry' ? 'entered' : 'exited'} ${geofence.name} | Fahrzeug ${vehicle.license_plate} ${type === 'entry' ? 'betrat' : 'verließ'} ${geofence.name}`,
          language
        ),
        variant: "destructive"
      });
    }
  };

  const createGeofence = () => {
    if (!newGeofence.name.trim()) {
      toast({
        title: extractLanguageText("Error | Fehler", language), 
        description: extractLanguageText("Please enter a geofence name | Bitte geben Sie einen Geofence-Namen ein", language),
        variant: "destructive"
      });
      return;
    }

    const geofence: Geofence = {
      id: `gf_${Date.now()}`,
      name: newGeofence.name,
      center: newGeofence.center,
      radius: newGeofence.radius,
      type: newGeofence.type,
      isActive: true,
      vehicleIds: [],
      notifications: { email: true, sms: false, push: true },
      createdAt: new Date().toISOString(),
      violations: 0
    };

    setGeofences(prev => [...prev, geofence]);
    setNewGeofence({ name: '', center: [100.5332, 13.7244], radius: 1000, type: 'both' });
    setShowCreateForm(false);

    toast({
      title: extractLanguageText("Geofence Created | Geofence erstellt", language),
      description: extractLanguageText("New geofence has been created | Neuer Geofence wurde erstellt", language)
    });
  };

  const toggleGeofence = (id: string) => {
    setGeofences(prev => prev.map(gf => 
      gf.id === id ? { ...gf, isActive: !gf.isActive } : gf
    ));
  };

  const deleteGeofence = (id: string) => {
    setGeofences(prev => prev.filter(gf => gf.id !== id));
    toast({
      title: extractLanguageText("Geofence Deleted | Geofence gelöscht", language),
      description: extractLanguageText("Geofence has been removed | Geofence wurde entfernt", language)
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              {extractLanguageText("Geofence Manager | Geofence-Manager", language)}
            </CardTitle>
            <Button onClick={() => setShowCreateForm(!showCreateForm)} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              {extractLanguageText("Create | Erstellen", language)}
            </Button>
          </div>
        </CardHeader>
        
        {showCreateForm && (
          <CardContent className="space-y-4 border-t">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {extractLanguageText("Name | Name", language)}
                </label>
                <Input
                  value={newGeofence.name}
                  onChange={(e) => setNewGeofence(prev => ({ ...prev, name: e.target.value }))}
                  placeholder={extractLanguageText("Enter geofence name | Geofence-Name eingeben", language)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {extractLanguageText("Type | Typ", language)}
                </label>
                <Select value={newGeofence.type} onValueChange={(value) => setNewGeofence(prev => ({ ...prev, type: value as any }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">{extractLanguageText("Entry Only | Nur Eintritt", language)}</SelectItem>
                    <SelectItem value="exit">{extractLanguageText("Exit Only | Nur Austritt", language)}</SelectItem>
                    <SelectItem value="both">{extractLanguageText("Entry & Exit | Ein- und Austritt", language)}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {extractLanguageText("Radius (meters) | Radius (Meter)", language)}
                </label>
                <Input
                  type="number"
                  value={newGeofence.radius}
                  onChange={(e) => setNewGeofence(prev => ({ ...prev, radius: parseInt(e.target.value) || 1000 }))}
                  min="100"
                  max="10000"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={createGeofence} size="sm">
                {extractLanguageText("Create Geofence | Geofence erstellen", language)}
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)} size="sm">
                {extractLanguageText("Cancel | Abbrechen", language)}
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Active Geofences */}
      <div className="grid gap-4">
        {geofences.map((geofence) => (
          <Card key={geofence.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-semibold">{geofence.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {extractLanguageText("Radius | Radius", language)}: {geofence.radius}m | 
                      {extractLanguageText("Type | Typ", language)}: {geofence.type}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant={geofence.violations > 0 ? "destructive" : "secondary"}>
                    {geofence.violations} {extractLanguageText("violations | Verletzungen", language)}
                  </Badge>
                  <Switch
                    checked={geofence.isActive}
                    onCheckedChange={() => toggleGeofence(geofence.id)}
                  />
                  <Button variant="ghost" size="sm" onClick={() => deleteGeofence(geofence.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {geofence.isActive ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-gray-500" />
                    )}
                    <span className={geofence.isActive ? 'text-green-600' : 'text-muted-foreground'}>
                      {geofence.isActive 
                        ? extractLanguageText("Active | Aktiv", language)
                        : extractLanguageText("Inactive | Inaktiv", language)
                      }
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {extractLanguageText("Monitoring | Überwachung", language)}: {vehicles.length} {extractLanguageText("vehicles | Fahrzeuge", language)}
                    </span>
                  </div>
                </div>
                
                <Badge variant="outline">
                  {extractLanguageText("Created | Erstellt", language)}: {new Date(geofence.createdAt).toLocaleDateString()}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Violations */}
      {violations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              {extractLanguageText("Recent Violations | Letzte Verletzungen", language)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {violations.slice(0, 5).map((violation) => {
                const geofence = geofences.find(gf => gf.id === violation.geofenceId);
                const vehicle = vehicles.find(v => v.id === violation.vehicleId);
                
                return (
                  <div key={violation.id} className="flex items-center justify-between p-3 bg-destructive/5 rounded border-l-4 border-l-destructive">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      <div>
                        <p className="font-medium">
                          {vehicle?.license_plate || violation.vehicleId} 
                          <span className="text-muted-foreground ml-1">
                            {violation.violationType === 'entry' 
                              ? extractLanguageText("entered | betrat", language)
                              : extractLanguageText("exited | verließ", language)
                            } {geofence?.name}
                          </span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(violation.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <Badge variant="destructive">
                      {violation.violationType}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}