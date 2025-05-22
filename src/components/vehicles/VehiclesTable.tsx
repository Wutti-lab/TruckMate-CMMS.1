
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";
import { VehicleRow } from "./table/VehicleRow";

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
  
  // Function to get the correct header text based on language
  const getHeaderText = (en: string, de: string): string => {
    return language === 'de' ? de : en;
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
      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Display empty state
  if (filteredVehicles.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">
            {searchQuery
              ? getHeaderText("No vehicles match your search query", "Keine Fahrzeuge entsprechen Ihrer Suchanfrage")
              : getHeaderText("No vehicles found", "Keine Fahrzeuge gefunden")}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
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
              <TableRow key={vehicle.id}>
                <td className="font-medium">{vehicle.license_plate}</td>
                <td>{vehicle.model}</td>
                <td>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    vehicle.status === 'active' ? 'bg-green-100 text-green-800' :
                    vehicle.status === 'maintenance' ? 'bg-amber-100 text-amber-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {vehicle.status}
                  </span>
                </td>
                <td>{vehicle.location}</td>
                <td>{vehicle.fuel_level}%</td>
                <td>{vehicle.battery_level}%</td>
                <td>{vehicle.engine_temp}°C</td>
                <td>{new Date(vehicle.next_service).toLocaleDateString()}</td>
                <td className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onEditVehicle(vehicle)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onDeleteVehicle(vehicle.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </td>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
