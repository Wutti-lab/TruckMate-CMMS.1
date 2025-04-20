import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { DriverTable } from "@/components/drivers/DriverTable";
import { DriverStats } from "@/components/drivers/DriverStats";
import { DriverRequirements } from "@/components/drivers/DriverRequirements";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { AddDriverModal } from "@/components/drivers/AddDriverModal";

const drivers = [
  {
    id: "D-001",
    name: "Somchai Jaidee",
    licenseType: "Class 3",
    phone: "+66 81 234 5678",
    status: "Active",
    location: "Bangkok",
    vehicle: "B-FR-123",
    lastTrip: "23.04.2023",
    hoursThisWeek: 32
  },
  {
    id: "D-002",
    name: "Max Schmidt",
    licenseType: "Class 4",
    phone: "+66 81 987 6543",
    status: "Off-duty",
    location: "Pattaya",
    vehicle: "B-FR-456",
    lastTrip: "21.04.2023",
    hoursThisWeek: 40
  },
  {
    id: "D-003",
    name: "Pranee Suksawat",
    licenseType: "Class 3",
    phone: "+66 81 222 3333",
    status: "Active",
    location: "Chiang Mai",
    vehicle: "B-FR-789",
    lastTrip: "22.04.2023",
    hoursThisWeek: 38
  },
  {
    id: "D-004",
    name: "Thomas Weber",
    licenseType: "Class 4",
    phone: "+66 81 555 6666",
    status: "Medical Leave",
    location: "Bangkok",
    vehicle: "Unassigned",
    lastTrip: "15.04.2023",
    hoursThisWeek: 12
  },
  {
    id: "D-005",
    name: "Apinya Thongchai",
    licenseType: "Class 3",
    phone: "+66 81 777 8888",
    status: "Active",
    location: "Phuket",
    vehicle: "B-FR-234",
    lastTrip: "24.04.2023",
    hoursThisWeek: 36
  }
];

export default function Drivers() {
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();
  
  const filteredDrivers = drivers.filter((driver) => 
    driver.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    driver.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    driver.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const MobileSearch = () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <Search size={16} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="p-4 space-y-4">
          <Input
            placeholder="Search drivers... | ค้นหาพนักงานขับรถ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
      </DrawerContent>
    </Drawer>
  );

  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 p-4 md:p-6 overflow-auto space-y-6">
        <div className="mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-bold">Drivers | พนักงานขับรถ</h1>
            <div className="flex items-center gap-2">
              {!isMobile && (
                <div className="relative hidden lg:block">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search drivers... | ค้นหาพนักงานขับรถ..."
                    className="pl-8 w-[200px] md:w-[300px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              )}
              <MobileSearch />
              <Button variant="outline" size="icon">
                <Filter size={16} />
              </Button>
              <AddDriverModal />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <DriverStats 
              title="Total Drivers | พนักงานทั้งหมด"
              value={drivers.length}
              icon="users"
            />
            <DriverStats 
              title="Active Drivers | พนักงานที่ทำงานอยู่"
              value={drivers.filter(d => d.status === "Active").length}
              icon="user-check"
              variant="active"
            />
            <DriverStats 
              title="Off-duty | ไม่ได้ปฏิบัติงาน"
              value={drivers.filter(d => d.status !== "Active").length}
              icon="user-x"
              variant="inactive"
            />
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardContent className="p-0 sm:p-0">
              <DriverTable drivers={filteredDrivers} />
            </CardContent>
          </Card>

          <DriverRequirements />
        </div>
      </main>
    </div>
  );
}
