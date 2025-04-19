import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Filter, MapPin, Search, Phone } from "lucide-react";
import { MapComponent } from "@/components/MapComponent";
import { EmergencyContacts } from "@/components/inspections/EmergencyContacts";

export default function Map() {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);
  
  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 p-6 relative overflow-hidden">
        <div className="mb-4 flex flex-wrap gap-4 items-center justify-between">
          <h1 className="text-2xl font-bold">Karte</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Adresse oder Fahrzeug suchen..."
                className="pl-8 w-[200px] md:w-[300px]"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter size={16} />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setShowEmergencyContacts(!showEmergencyContacts)}
              className={showEmergencyContacts ? "bg-red-100 text-red-600" : ""}
            >
              <Phone size={16} />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="map" className="h-[calc(100%-40px)]">
          <TabsList>
            <TabsTrigger value="map">Karte</TabsTrigger>
            <TabsTrigger value="satellite">Satellit</TabsTrigger>
            <TabsTrigger value="traffic">Verkehr</TabsTrigger>
          </TabsList>
          <TabsContent value="map" className="h-full">
            <div className="relative rounded-md h-full border overflow-hidden">
              <MapComponent />
              
              {[
                { id: "car1", position: { top: "20%", left: "30%" } },
                { id: "car2", position: { top: "40%", left: "50%" } },
                { id: "car3", position: { top: "60%", left: "25%" } },
                { id: "car4", position: { top: "35%", left: "70%" } },
              ].map((vehicle) => (
                <Button
                  key={vehicle.id}
                  variant="outline"
                  size="icon"
                  className="absolute w-8 h-8 rounded-full bg-fleet-500 text-white hover:bg-fleet-600 border-2 border-white shadow-md"
                  style={{ top: vehicle.position.top, left: vehicle.position.left }}
                  onClick={() => setSelectedVehicle(vehicle.id)}
                >
                  <Car size={14} />
                </Button>
              ))}
              
              <Card className="absolute right-4 bottom-4 w-auto">
                <CardContent className="p-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span>Im Einsatz</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span>Inaktiv</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span>Problem</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {showEmergencyContacts && (
                <div className="absolute left-4 top-4 w-[350px] max-h-[80vh] overflow-y-auto bg-white rounded-lg shadow-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Notfallkontakte</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowEmergencyContacts(false)}
                    >
                      ✕
                    </Button>
                  </div>
                  <EmergencyContacts />
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="satellite" className="h-full">
            <div className="relative rounded-md h-full border overflow-hidden">
              <MapComponent />
            </div>
          </TabsContent>
          <TabsContent value="traffic" className="h-full">
            <div className="relative rounded-md h-full border overflow-hidden">
              <MapComponent />
            </div>
          </TabsContent>
          
          <div className="mt-2 text-xs text-muted-foreground">
            <p>Hinweis: Mapbox Token erforderlich für die Kartenfunktion. Bitte in MapComponent.tsx konfigurieren</p>
          </div>
        </Tabs>
        
        {selectedVehicle && (
          <Card className="absolute left-6 top-28 w-[300px] shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-fleet-500" />
                  <h3 className="font-medium">B-FR {selectedVehicle.slice(-1)}23</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedVehicle(null)}
                >
                  ✕
                </Button>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-fleet-500" />
                  <span>Berlin, Mitte</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">Fahrer:</span> Michael Schmidt
                </div>
                <div className="text-sm">
                  <span className="font-medium">Status:</span>{" "}
                  <span className="text-green-600">In Fahrt</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">Geschwindigkeit:</span> 42 km/h
                </div>
                <div className="text-sm">
                  <span className="font-medium">Kraftstoff:</span> 68%
                </div>
              </div>
              
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" size="sm">Details</Button>
                <Button size="sm" className="bg-fleet-500">Navigation</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
