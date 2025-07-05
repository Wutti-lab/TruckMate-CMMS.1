import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { VehiclesHeader } from "@/components/vehicles/VehiclesHeader";
import { VehiclesTable } from "@/components/vehicles/VehiclesTable";
import { VehicleDialog } from "@/components/vehicles/VehicleDialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Vehicle {
  id: string;
  license_plate: string;
  make?: string;
  model?: string;
  year?: number;
  vin?: string;
  vehicle_type?: string;
  status: string;
  location?: string;
  mileage?: number;
  fuel_type?: string;
  engine_size?: string;
  insurance_expiry?: string;
  registration_expiry?: string;
  next_service?: string;
  lat?: number;
  lng?: number;
  company_id?: string;
  created_at?: string;
  updated_at?: string;
}

export default function Vehicles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchVehicles() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('vehicles')
          .select('*');
        
        if (error) {
          throw error;
        }
        
        if (data) {
          setVehicles(data);
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        toast({
          title: "Error",
          description: "Failed to load vehicles",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchVehicles();
  }, [toast]);

  const handleEditVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsEditMode(true);
    setIsEditDialogOpen(true);
  };

  const handleDeleteVehicle = async (id: string) => {
    try {
      const { error } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
      
      toast({
        title: "Success",
        description: "Vehicle deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      toast({
        title: "Error",
        description: "Failed to delete vehicle",
        variant: "destructive"
      });
    }
  };

  const handleAddNewVehicle = () => {
    setIsEditMode(false);
    setSelectedVehicle(null);
    setIsEditDialogOpen(true);
  };

  // Fix the date format for last_service and next_service
  const handleSaveVehicle = async (formData: any) => {
    // Convert Date objects to ISO strings for the database
    const vehicleData = {
      license_plate: formData.license_plate,
      model: formData.model,
      status: formData.status,
      location: formData.location,
      fuel_level: formData.fuel_level,
      battery_level: formData.battery_level,
      engine_temp: formData.engine_temp,
      last_service: formData.last_service instanceof Date 
        ? formData.last_service.toISOString() 
        : formData.last_service,
      next_service: formData.next_service instanceof Date 
        ? formData.next_service.toISOString() 
        : formData.next_service,
    };

    try {
      // Add or update vehicle based on edit mode
      if (isEditMode && selectedVehicle) {
        const { error } = await supabase
          .from('vehicles')
          .update(vehicleData)
          .eq('id', selectedVehicle.id);
          
        if (error) {
          throw error;
        }
        
        // Update local state
        setVehicles(vehicles.map(vehicle => 
          vehicle.id === selectedVehicle.id 
            ? { ...vehicle, ...formData }
            : vehicle
        ));
        
        toast({
          title: "Success",
          description: "Vehicle updated successfully",
        });
      } else {
        const { data, error } = await supabase
          .from('vehicles')
          .insert(vehicleData)
          .select();
        
        if (error) {
          throw error;
        }
        
        if (data && data.length > 0) {
          setVehicles([data[0], ...vehicles]);
          
          toast({
            title: "Success",
            description: "Vehicle added successfully",
          });
        }
      }
      
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error saving vehicle:", error);
      toast({
        title: "Error",
        description: "Failed to save vehicle",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 p-6 overflow-auto">
        <VehiclesHeader 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddNewVehicle={handleAddNewVehicle}
        />

        <div className="mt-4">
          <VehiclesTable
            vehicles={vehicles}
            isLoading={isLoading}
            searchQuery={searchQuery}
            onEditVehicle={handleEditVehicle}
            onDeleteVehicle={handleDeleteVehicle}
          />
        </div>
      </main>
      
      <VehicleDialog 
        open={isEditDialogOpen} 
        onOpenChange={setIsEditDialogOpen} 
        vehicle={selectedVehicle}
        onSave={handleSaveVehicle}
        isEditMode={isEditMode}
      />
    </div>
  );
}
