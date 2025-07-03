
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";
import { VehicleRow } from "./table/VehicleRow";
import { MobileOptimized } from "@/components/shared/mobile/MobileOptimized";
import { AccessibleCard } from "@/components/shared/accessibility/AccessibleCard";
import { useIsMobile } from "@/hooks/use-mobile";

interface Vehicle {
  id: string;
  license_plate: string;
  model: string;
  status: string;
  location: string;
  fuel_level: number;
  battery_level: number;
  engine_temp: number;
  last_service: string;
  next_service: string;
}

interface VehiclesTableProps {
  vehicles: Vehicle[];
  isLoading: boolean;
  searchQuery: string;
  onEditVehicle: (vehicle: Vehicle) => void;
  onDeleteVehicle: (id: string) => void;
}

export function VehiclesTable({ 
  vehicles, 
  isLoading, 
  searchQuery,
  onEditVehicle,
  onDeleteVehicle 
}: VehiclesTableProps) {
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  
  // Function to get the correct header text based on language
  const getHeaderText = (en: string, de: string): string => {
    return language === 'de' ? de : en;
  };

  // Get status variant for badges
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'maintenance': return 'destructive';
      case 'inactive': return 'secondary';
      default: return 'outline';
    }
  };

  // Filter vehicles based on search query
  const filteredVehicles = vehicles.filter(vehicle => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      vehicle.license_plate.toLowerCase().includes(query) ||
      vehicle.model.toLowerCase().includes(query) ||
      vehicle.status.toLowerCase().includes(query) ||
      vehicle.location.toLowerCase().includes(query)
    );
  });

  // Display loading state
  if (isLoading) {
    return (
      <MobileOptimized>
        <AccessibleCard title={getHeaderText("Loading Vehicles", "Fahrzeuge werden geladen")} ariaLabel="Loading vehicles data">
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full animate-pulse" />
            ))}
          </div>
        </AccessibleCard>
      </MobileOptimized>
    );
  }

  // Display empty state
  if (filteredVehicles.length === 0) {
    return (
      <MobileOptimized>
        <AccessibleCard 
          title={getHeaderText("No Vehicles", "Keine Fahrzeuge")} 
          ariaLabel="No vehicles found message"
        >
          <p className="text-muted-foreground text-center">
            {searchQuery
              ? getHeaderText("No vehicles match your search query", "Keine Fahrzeuge entsprechen Ihrer Suchanfrage")
              : getHeaderText("No vehicles found", "Keine Fahrzeuge gefunden")}
          </p>
        </AccessibleCard>
      </MobileOptimized>
    );
  }

  // Mobile card view
  if (isMobile) {
    return (
      <MobileOptimized enableSwipe>
        <div className="space-y-4">
          {filteredVehicles.map((vehicle) => (
            <AccessibleCard 
              key={vehicle.id}
              title={vehicle.license_plate}
              ariaLabel={`Vehicle ${vehicle.license_plate} details`}
              className="hover-scale"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{vehicle.model}</span>
                  <Badge variant={getStatusVariant(vehicle.status)}>
                    {vehicle.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">{getHeaderText("Location", "Standort")}:</span>
                    <p className="font-medium">{vehicle.location}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{getHeaderText("Fuel", "Kraftstoff")}:</span>
                    <p className="font-medium">{vehicle.fuel_level}%</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{getHeaderText("Battery", "Batterie")}:</span>
                    <p className="font-medium">{vehicle.battery_level}%</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{getHeaderText("Temp", "Temperatur")}:</span>
                    <p className="font-medium">{vehicle.engine_temp}°C</p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-xs text-muted-foreground">
                    {getHeaderText("Next Service", "Nächste Wartung")}: {new Date(vehicle.next_service).toLocaleDateString()}
                  </span>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onEditVehicle(vehicle)}
                      aria-label={`Edit vehicle ${vehicle.license_plate}`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onDeleteVehicle(vehicle.id)}
                      aria-label={`Delete vehicle ${vehicle.license_plate}`}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </div>
            </AccessibleCard>
          ))}
        </div>
      </MobileOptimized>
    );
  }

  // Desktop table view
  return (
    <MobileOptimized>
      <AccessibleCard 
        title={getHeaderText("Vehicles Overview", "Fahrzeugübersicht")}
        ariaLabel="Vehicles data table"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{getHeaderText("License Plate", "Kennzeichen")}</TableHead>
              <TableHead>{getHeaderText("Model", "Modell")}</TableHead>
              <TableHead>{getHeaderText("Status", "Status")}</TableHead>
              <TableHead>{getHeaderText("Location", "Standort")}</TableHead>
              <TableHead>{getHeaderText("Fuel", "Kraftstoff")}</TableHead>
              <TableHead>{getHeaderText("Battery", "Batterie")}</TableHead>
              <TableHead>{getHeaderText("Engine Temp", "Motortemperatur")}</TableHead>
              <TableHead>{getHeaderText("Next Service", "Nächste Wartung")}</TableHead>
              <TableHead className="text-right">{getHeaderText("Actions", "Aktionen")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVehicles.map((vehicle) => (
              <TableRow key={vehicle.id} className="hover:bg-muted/50 transition-colors">
                <td className="font-medium">{vehicle.license_plate}</td>
                <td>{vehicle.model}</td>
                <td>
                  <Badge variant={getStatusVariant(vehicle.status)}>
                    {vehicle.status}
                  </Badge>
                </td>
                <td>{vehicle.location}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <span>{vehicle.fuel_level}%</span>
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${vehicle.fuel_level}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <span>{vehicle.battery_level}%</span>
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-accent transition-all duration-300"
                        style={{ width: `${vehicle.battery_level}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <span className={vehicle.engine_temp > 90 ? 'text-destructive font-medium' : ''}>
                    {vehicle.engine_temp}°C
                  </span>
                </td>
                <td>{new Date(vehicle.next_service).toLocaleDateString()}</td>
                <td className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onEditVehicle(vehicle)}
                      aria-label={`Edit vehicle ${vehicle.license_plate}`}
                      className="hover-scale"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onDeleteVehicle(vehicle.id)}
                      aria-label={`Delete vehicle ${vehicle.license_plate}`}
                      className="hover-scale"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </td>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AccessibleCard>
    </MobileOptimized>
  );
}
