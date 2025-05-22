
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { VehicleFilters } from "@/components/vehicles/VehicleFilters";
import { VehicleTable } from "@/components/vehicles/VehicleTable";
import { VehicleParts } from "@/components/inspections/VehicleParts";
import { Card } from "@/components/ui/card";
import { AddVehicleDialog } from "@/components/vehicles/AddVehicleDialog";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Vehicle } from "@/components/vehicles/types/Vehicle";

export default function Vehicles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();
  const { toast } = useToast();
  
  // Fetch vehicles from Supabase
  useEffect(() => {
    async function fetchVehicles() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('vehicles')
          .select('*, vehicle_assignments(driver_id, drivers(*))');
        
        if (error) {
          throw error;
        }
        
        if (data && data.length > 0) {
          // Transform data to match Vehicle interface
          const transformedVehicles: Vehicle[] = data.map(vehicle => ({
            id: vehicle.license_plate,
            driver: vehicle.vehicle_assignments && 
                  vehicle.vehicle_assignments[0]?.drivers?.name || "Nicht zugewiesen",
            model: vehicle.model,
            location: vehicle.location || "Unbekannt",
            status: vehicle.status,
            fuelLevel: vehicle.fuel_level || 0,
            batteryLevel: vehicle.battery_level || 0,
            lastService: vehicle.last_service ? new Date(vehicle.last_service).toLocaleDateString() : "",
            nextService: vehicle.next_service ? new Date(vehicle.next_service).toLocaleDateString() : "",
            engineTemp: vehicle.engine_temp || 75,
            coordinates: vehicle.lat && vehicle.lng ? {
              lat: vehicle.lat,
              lng: vehicle.lng
            } : undefined,
            lastUpdated: vehicle.updated_at ? new Date(vehicle.updated_at).toLocaleTimeString() : undefined
          }));
          
          setVehicles(transformedVehicles);
        } else {
          // If no data, set empty array
          setVehicles([]);
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        toast({
          title: extractLanguageText("Error | ข้อผิดพลาด | Fehler", language),
          description: extractLanguageText("Failed to load vehicles | ไม่สามารถโหลดข้อมูลยานพาหนะ | Fahrzeuge konnten nicht geladen werden", language),
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchVehicles();
  }, [toast, language]);
  
  // Filter vehicles based on search query
  const filteredVehicles = vehicles.filter((vehicle) => 
    vehicle.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle adding a new vehicle
  const handleAddVehicle = async (newVehicle: Vehicle) => {
    try {
      // Convert to database format
      const vehicleData = {
        license_plate: newVehicle.id,
        model: newVehicle.model,
        status: newVehicle.status,
        location: newVehicle.location,
        fuel_level: newVehicle.fuelLevel,
        battery_level: newVehicle.batteryLevel,
        engine_temp: newVehicle.engineTemp,
        last_service: newVehicle.lastService ? new Date(newVehicle.lastService) : null,
        next_service: newVehicle.nextService ? new Date(newVehicle.nextService) : null
      };
      
      // Insert into Supabase
      const { data, error } = await supabase
        .from('vehicles')
        .insert(vehicleData)
        .select();
        
      if (error) {
        throw error;
      }
      
      // Update UI with new data
      if (data && data.length > 0) {
        const insertedVehicle: Vehicle = {
          id: data[0].license_plate,
          driver: newVehicle.driver,
          model: data[0].model,
          location: data[0].location || "Unbekannt",
          status: data[0].status,
          fuelLevel: data[0].fuel_level || 0,
          batteryLevel: data[0].battery_level || 0,
          lastService: data[0].last_service ? new Date(data[0].last_service).toLocaleDateString() : "",
          nextService: data[0].next_service ? new Date(data[0].next_service).toLocaleDateString() : "",
          engineTemp: data[0].engine_temp || 75
        };
        
        setVehicles([insertedVehicle, ...vehicles]);
        
        // If a driver was specified, create a vehicle assignment
        if (newVehicle.driver && newVehicle.driver !== "Nicht zugewiesen") {
          // TODO: In a real app, you would select the driver from a dropdown 
          // and use the driver's ID here
          console.log("Would assign driver:", newVehicle.driver);
        }
      }
    } catch (error) {
      console.error("Error adding vehicle:", error);
      toast({
        title: extractLanguageText("Error | ข้อผิดพลาด | Fehler", language),
        description: extractLanguageText("Failed to add vehicle | ไม่สามารถเพิ่มยานพาหนะ | Fahrzeug konnte nicht hinzugefügt werden", language),
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 p-6 overflow-auto">
        <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
          <h1 className="text-2xl font-bold">{extractLanguageText("Fleet | กองยานพาหนะ | Fahrzeugflotte", language)}</h1>
          <div className="flex items-center gap-2">
            <VehicleFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            <Button className="bg-fleet-500" onClick={() => setIsAddVehicleOpen(true)}>
              <Plus size={16} className="mr-2" />
              {extractLanguageText("Add New Vehicle | เพิ่มยานพาหนะใหม่ | Neues Fahrzeug hinzufügen", language)}
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            {isLoading ? (
              <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fleet-500"></div>
              </div>
            ) : (
              <VehicleTable vehicles={filteredVehicles} />
            )}
          </Card>

          <Card className="p-6">
            <VehicleParts />
          </Card>
        </div>
      </main>
      
      <AddVehicleDialog 
        open={isAddVehicleOpen} 
        onOpenChange={setIsAddVehicleOpen}
        onSubmit={handleAddVehicle}
      />
    </div>
  );
}
