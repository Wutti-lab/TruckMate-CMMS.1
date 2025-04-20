import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { VehicleFilters } from "@/components/vehicles/VehicleFilters";
import { VehicleTable } from "@/components/vehicles/VehicleTable";
import { VehicleParts } from "@/components/inspections/VehicleParts";
import { Card } from "@/components/ui/card";

// Mock vehicle data
const vehicles = [
  {
    id: "B-FR-123",
    driver: "Max Müller",
    model: "Tesla Model Y",
    location: "Berlin, Mitte",
    status: "Aktiv",
    fuelLevel: 75,
    batteryLevel: 80,
    lastService: "15.03.2023",
    nextService: "15.09.2023",
  },
  {
    id: "B-FR-234",
    driver: "Lisa Schmidt",
    model: "VW ID.4",
    location: "Berlin, Kreuzberg",
    status: "Inaktiv",
    fuelLevel: 0,
    batteryLevel: 45,
    lastService: "22.02.2023",
    nextService: "22.08.2023",
  },
  {
    id: "B-FR-345",
    driver: "Jan Weber",
    model: "Audi e-tron",
    location: "Berlin, Charlottenburg",
    status: "Wartung",
    fuelLevel: 0,
    batteryLevel: 90,
    lastService: "05.04.2023",
    nextService: "05.10.2023",
  },
  {
    id: "B-FR-456",
    driver: "Anna Becker",
    model: "BMW i4",
    location: "Berlin, Prenzlauer Berg",
    status: "Aktiv",
    fuelLevel: 0,
    batteryLevel: 65,
    lastService: "10.01.2023",
    nextService: "10.07.2023",
  },
  {
    id: "B-FR-567",
    driver: "Thomas Meyer",
    model: "Mercedes EQC",
    location: "Berlin, Schöneberg",
    status: "Aktiv",
    fuelLevel: 0,
    batteryLevel: 55,
    lastService: "28.02.2023",
    nextService: "28.08.2023",
  },
  {
    id: "B-FR-678",
    driver: "Sarah Schulz",
    model: "Hyundai Ioniq 5",
    location: "Berlin, Tempelhof",
    status: "Aktiv",
    fuelLevel: 0,
    batteryLevel: 70,
    lastService: "12.03.2023",
    nextService: "12.09.2023",
  },
  {
    id: "B-FR-789",
    driver: "Markus Fischer",
    model: "Ford Mustang Mach-E",
    location: "Berlin, Neukölln",
    status: "Inaktiv",
    fuelLevel: 0,
    batteryLevel: 20,
    lastService: "08.02.2023",
    nextService: "08.08.2023",
  },
];

export default function Vehicles() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter vehicles based on search query
  const filteredVehicles = vehicles.filter((vehicle) => 
    vehicle.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 p-6 overflow-auto">
        <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
          <h1 className="text-2xl font-bold">Fleet | กองยานพาหนะ</h1>
          <div className="flex items-center gap-2">
            <VehicleFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            <Button className="bg-fleet-500">
              <Plus size={16} className="mr-2" />
              Add New Vehicle | เพิ่มยานพาหนะใหม่
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <VehicleTable vehicles={filteredVehicles} />
          </Card>

          <Card className="p-6">
            <VehicleParts />
          </Card>
        </div>
      </main>
    </div>
  );
}
