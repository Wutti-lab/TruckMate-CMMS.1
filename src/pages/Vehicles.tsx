import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { BackToDashboard } from "@/components/layout/BackToDashboard";
import { VehiclesHeader } from "@/components/vehicles/VehiclesHeader";
import { VehiclesTable } from "@/components/vehicles/VehiclesTable";
import { VehicleDialog } from "@/components/vehicles/VehicleDialog";
import { VehicleFiltersAdvanced } from "@/components/vehicles/VehicleFiltersAdvanced";
import { VehicleBulkActions } from "@/components/vehicles/VehicleBulkActions";
import { VehicleDetailsModal } from "@/components/vehicles/VehicleDetailsModal";
import { VehicleQRGenerator } from "@/components/vehicles/VehicleQRGenerator";
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
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedVehicleIds, setSelectedVehicleIds] = useState<string[]>([]);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<any>({});
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
          setFilteredVehicles(data);
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

  const handleViewVehicleDetails = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsDetailsModalOpen(true);
  };

  const handleGenerateQR = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);  
    setIsQRModalOpen(true);
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
      
      const updatedVehicles = vehicles.filter(vehicle => vehicle.id !== id);
      setVehicles(updatedVehicles);
      setFilteredVehicles(updatedVehicles);
      
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
        const updatedVehicles = vehicles.map(vehicle => 
          vehicle.id === selectedVehicle.id 
            ? { ...vehicle, ...formData }
            : vehicle
        );
        setVehicles(updatedVehicles);
        setFilteredVehicles(updatedVehicles);
        
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
          const updatedVehicles = [data[0], ...vehicles];
          setVehicles(updatedVehicles);
          setFilteredVehicles(updatedVehicles);
          
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

  // Filter and bulk action handlers
  const handleFiltersChange = (filters: any) => {
    setActiveFilters(filters);
    applyFilters(filters, searchQuery);
  };

  const applyFilters = (filters: any, search: string) => {
    let filtered = vehicles;

    // Apply search filter
    if (search.trim()) {
      filtered = filtered.filter(vehicle =>
        vehicle.license_plate?.toLowerCase().includes(search.toLowerCase()) ||
        vehicle.model?.toLowerCase().includes(search.toLowerCase()) ||
        vehicle.make?.toLowerCase().includes(search.toLowerCase()) ||
        vehicle.location?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply advanced filters
    if (filters.status) {
      filtered = filtered.filter(vehicle => vehicle.status === filters.status);
    }
    if (filters.vehicleType) {
      filtered = filtered.filter(vehicle => vehicle.vehicle_type === filters.vehicleType);
    }
    if (filters.fuelType) {
      filtered = filtered.filter(vehicle => vehicle.fuel_type === filters.fuelType);
    }
    if (filters.location) {
      filtered = filtered.filter(vehicle => 
        vehicle.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    if (filters.minMileage) {
      filtered = filtered.filter(vehicle => 
        (vehicle.mileage || 0) >= parseInt(filters.minMileage)
      );
    }
    if (filters.maxMileage) {
      filtered = filtered.filter(vehicle => 
        (vehicle.mileage || 0) <= parseInt(filters.maxMileage)
      );
    }

    setFilteredVehicles(filtered);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    applyFilters(activeFilters, query);
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedVehicleIds(filteredVehicles.map(v => v.id));
    } else {
      setSelectedVehicleIds([]);
    }
  };

  const handleBulkDelete = async (vehicleIds: string[]) => {
    try {
      const { error } = await supabase
        .from('vehicles')
        .delete()
        .in('id', vehicleIds);
      
      if (error) throw error;
      
      const updatedVehicles = vehicles.filter(v => !vehicleIds.includes(v.id));
      setVehicles(updatedVehicles);
      setFilteredVehicles(updatedVehicles.filter(v => 
        filteredVehicles.some(fv => fv.id === v.id)
      ));
      setSelectedVehicleIds([]);
    } catch (error) {
      console.error("Error deleting vehicles:", error);
      toast({
        title: "Error",
        description: "Failed to delete vehicles",
        variant: "destructive"
      });
    }
  };

  const handleBulkStatusChange = async (vehicleIds: string[], status: string) => {
    try {
      const { error } = await supabase
        .from('vehicles')
        .update({ status })
        .in('id', vehicleIds);
      
      if (error) throw error;
      
      const updatedVehicles = vehicles.map(v => 
        vehicleIds.includes(v.id) ? { ...v, status } : v
      );
      setVehicles(updatedVehicles);
      applyFilters(activeFilters, searchQuery);
    } catch (error) {
      console.error("Error updating vehicle status:", error);
      toast({
        title: "Error",
        description: "Failed to update vehicle status",
        variant: "destructive"
      });
    }
  };

  const handleBulkExport = (vehicleIds: string[]) => {
    const exportData = vehicles.filter(v => vehicleIds.includes(v.id));
    const csvContent = "data:text/csv;charset=utf-8," 
      + "License Plate,Model,Status,Location,Mileage,Next Service\n"
      + exportData.map(v => 
          `${v.license_plate},${v.model},${v.status},${v.location},${v.mileage},${v.next_service}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "vehicles_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getActiveFiltersCount = () => {
    return Object.values(activeFilters).filter(value => 
      value && value.toString().trim() !== ''
    ).length;
  };

  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 p-6 overflow-auto">
        <BackToDashboard />
        <VehiclesHeader
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onAddNewVehicle={handleAddNewVehicle}
        />

        <VehicleFiltersAdvanced
          onFiltersChange={handleFiltersChange}
          activeFiltersCount={getActiveFiltersCount()}
        />

        <VehicleBulkActions
          selectedVehicles={selectedVehicleIds}
          onSelectAll={handleSelectAll}
          onBulkDelete={handleBulkDelete}
          onBulkStatusChange={handleBulkStatusChange}
          onBulkExport={handleBulkExport}
          totalVehicles={filteredVehicles.length}
        />

        <div className="mt-4">
          <VehiclesTable
            vehicles={filteredVehicles}
            isLoading={isLoading}
            searchQuery={searchQuery}
            onEditVehicle={handleEditVehicle}
            onDeleteVehicle={handleDeleteVehicle}
            onViewDetails={handleViewVehicleDetails}
            onGenerateQR={handleGenerateQR}
            selectedVehicles={selectedVehicleIds}
            onVehicleSelect={(vehicleId, selected) => {
              if (selected) {
                setSelectedVehicleIds([...selectedVehicleIds, vehicleId]);
              } else {
                setSelectedVehicleIds(selectedVehicleIds.filter(id => id !== vehicleId));
              }
            }}
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
      
      <VehicleDetailsModal
        vehicle={selectedVehicle}
        open={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
        onEdit={handleEditVehicle}
        onDelete={handleDeleteVehicle}
      />
      
      <VehicleQRGenerator
        vehicle={selectedVehicle}
        open={isQRModalOpen}
        onOpenChange={setIsQRModalOpen}
      />
    </div>
  );
}
