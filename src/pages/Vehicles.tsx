
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Battery, 
  Calendar, 
  Car, 
  Filter, 
  Fuel, 
  MapPin, 
  MoreHorizontal, 
  Plus, 
  Search, 
  SortAsc
} from "lucide-react";

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
          <h1 className="text-2xl font-bold">กองยานพาหนะ</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ค้นหาตามทะเบียน, คนขับ..."
                className="pl-8 w-[200px] md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuItem>รถทั้งหมด</DropdownMenuItem>
                <DropdownMenuItem>เฉพาะรถที่ใช้งาน</DropdownMenuItem>
                <DropdownMenuItem>เฉพาะรถที่ไม่ได้ใช้งาน</DropdownMenuItem>
                <DropdownMenuItem>อยู่ระหว่างการซ่อมบำรุง</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <SortAsc size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuItem>ทะเบียน (ก-ฮ)</DropdownMenuItem>
                <DropdownMenuItem>ทะเบียน (ฮ-ก)</DropdownMenuItem>
                <DropdownMenuItem>สถานะ</DropdownMenuItem>
                <DropdownMenuItem>ตำแหน่ง</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="bg-fleet-500">
              <Plus size={16} className="mr-2" />
              เพิ่มรถใหม่
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ทะเบียน</TableHead>
                  <TableHead>คนขับ</TableHead>
                  <TableHead>รุ่น</TableHead>
                  <TableHead>ตำแหน่ง</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>ระดับแบตเตอรี่</TableHead>
                  <TableHead>ซ่อมบำรุงครั้งต่อไป</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Car size={16} className="text-fleet-500" />
                        {vehicle.id}
                      </div>
                    </TableCell>
                    <TableCell>{vehicle.driver}</TableCell>
                    <TableCell>{vehicle.model}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin size={14} className="text-muted-foreground" />
                        {vehicle.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          vehicle.status === "Aktiv"
                            ? "border-green-200 bg-green-50 text-green-600"
                            : vehicle.status === "Inaktiv"
                            ? "border-gray-200 bg-gray-50 text-gray-600"
                            : "border-orange-200 bg-orange-50 text-orange-600"
                        }
                      >
                        {vehicle.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3 w-32">
                        {vehicle.fuelLevel > 0 ? (
                          <div className="flex items-center gap-1">
                            <Fuel size={14} className="text-muted-foreground" />
                            <span>{vehicle.fuelLevel}%</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <Battery size={14} className="text-muted-foreground" />
                            <span>{vehicle.batteryLevel}%</span>
                          </div>
                        )}
                        <div className="w-full bg-gray-200 h-1.5 rounded-full">
                          <div
                            className={`h-1.5 rounded-full ${
                              (vehicle.fuelLevel || vehicle.batteryLevel) > 50
                                ? "bg-green-500"
                                : (vehicle.fuelLevel || vehicle.batteryLevel) > 25
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                            style={{
                              width: `${(vehicle.fuelLevel || vehicle.batteryLevel)}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-muted-foreground" />
                        {vehicle.nextService}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white">
                          <DropdownMenuItem>Details anzeigen</DropdownMenuItem>
                          <DropdownMenuItem>Auf Karte zeigen</DropdownMenuItem>
                          <DropdownMenuItem>Wartung planen</DropdownMenuItem>
                          <DropdownMenuItem>Berichte</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Entfernen
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
