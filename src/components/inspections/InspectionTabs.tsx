
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  ClipboardList, 
  CheckSquare, 
  UserCog, 
  Truck, 
  Clock, 
  MapPin, 
  Phone,
  Package 
} from "lucide-react";
import { VehicleInspectionList } from "./VehicleInspectionList";
import { ChecklistTemplates } from "./ChecklistTemplates";
import { DriverRequirements } from "./DriverRequirements";
import { MaintenanceChecklist } from "./MaintenanceChecklist";
import { TransportRegulations } from "./TransportRegulations";
import { DeliveryManagement } from "./DeliveryManagement";
import { EmergencyContacts } from "./EmergencyContacts";
import { VehicleParts } from "./VehicleParts";
import { Card, CardContent } from "@/components/ui/card";

export function InspectionTabs() {
  return (
    <Tabs defaultValue="inspections" className="w-full">
      <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-3 p-2 mb-6">
        <TabsTrigger value="inspections" className="flex items-center gap-2 py-2 px-3">
          <ClipboardList size={16} />
          Inspections | การตรวจสอบ
        </TabsTrigger>
        <TabsTrigger value="deliveries" className="flex items-center gap-2 py-2 px-3">
          <MapPin size={16} />
          Deliveries | การจัดส่ง
        </TabsTrigger>
        <TabsTrigger value="templates" className="flex items-center gap-2 py-2 px-3">
          <CheckSquare size={16} />
          Templates | แม่แบบ
        </TabsTrigger>
        <TabsTrigger value="maintenance" className="flex items-center gap-2 py-2 px-3">
          <Truck size={16} />
          Maintenance | บำรุงรักษา
        </TabsTrigger>
        <TabsTrigger value="timeRestrictions" className="flex items-center gap-2 py-2 px-3">
          <Clock size={16} />
          Drive Times | เวลาขับรถ
        </TabsTrigger>
        <TabsTrigger value="drivers" className="flex items-center gap-2 py-2 px-3">
          <UserCog size={16} />
          Drivers | ผู้ขับขี่
        </TabsTrigger>
        <TabsTrigger value="emergency" className="flex items-center gap-2 py-2 px-3">
          <Phone size={16} />
          Emergency | ฉุกเฉิน
        </TabsTrigger>
        <TabsTrigger value="parts" className="flex items-center gap-2 py-2 px-3">
          <Package size={16} />
          Parts | อะไหล่
        </TabsTrigger>
      </TabsList>
      
      <div className="mt-12">
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <TabsContent value="inspections" className="mt-0">
              <VehicleInspectionList />
            </TabsContent>
            <TabsContent value="deliveries" className="mt-0">
              <DeliveryManagement />
            </TabsContent>
            <TabsContent value="templates" className="mt-0">
              <ChecklistTemplates />
            </TabsContent>
            <TabsContent value="maintenance" className="mt-0">
              <MaintenanceChecklist />
            </TabsContent>
            <TabsContent value="timeRestrictions" className="mt-0">
              <TransportRegulations />
            </TabsContent>
            <TabsContent value="drivers" className="mt-0">
              <DriverRequirements />
            </TabsContent>
            <TabsContent value="emergency" className="mt-0">
              <EmergencyContacts />
            </TabsContent>
            <TabsContent value="parts" className="mt-0">
              <VehicleParts />
            </TabsContent>
          </CardContent>
        </Card>
      </div>
    </Tabs>
  );
}
