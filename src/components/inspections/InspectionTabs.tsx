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

export function InspectionTabs() {
  return (
    <Tabs defaultValue="inspections" className="w-full">
      <TabsList>
        <TabsTrigger value="inspections" className="flex items-center gap-2">
          <ClipboardList size={16} />
          Inspections | การตรวจสอบ
        </TabsTrigger>
        <TabsTrigger value="deliveries" className="flex items-center gap-2">
          <MapPin size={16} />
          Deliveries | การจัดส่ง
        </TabsTrigger>
        <TabsTrigger value="templates" className="flex items-center gap-2">
          <CheckSquare size={16} />
          Checklist Templates | แม่แบบรายการตรวจสอบ
        </TabsTrigger>
        <TabsTrigger value="maintenance" className="flex items-center gap-2">
          <Truck size={16} />
          Truck Maintenance | การบำรุงรักษารถบรรทุก
        </TabsTrigger>
        <TabsTrigger value="timeRestrictions" className="flex items-center gap-2">
          <Clock size={16} />
          Drive Times | เวลาขับรถ
        </TabsTrigger>
        <TabsTrigger value="drivers" className="flex items-center gap-2">
          <UserCog size={16} />
          Driver Qualifications | คุณสมบัติผู้ขับขี่
        </TabsTrigger>
        <TabsTrigger value="emergency" className="flex items-center gap-2">
          <Phone size={16} />
          Emergency Contacts | ติดต่อฉุกเฉิน
        </TabsTrigger>
        <TabsTrigger value="parts" className="flex items-center gap-2">
          <Package size={16} />
          Vehicle Parts | อะไหล่รถ
        </TabsTrigger>
      </TabsList>
      <TabsContent value="inspections" className="mt-6">
        <VehicleInspectionList />
      </TabsContent>
      <TabsContent value="deliveries" className="mt-6">
        <DeliveryManagement />
      </TabsContent>
      <TabsContent value="templates" className="mt-6">
        <ChecklistTemplates />
      </TabsContent>
      <TabsContent value="maintenance" className="mt-6">
        <MaintenanceChecklist />
      </TabsContent>
      <TabsContent value="timeRestrictions" className="mt-6">
        <TransportRegulations />
      </TabsContent>
      <TabsContent value="drivers" className="mt-6">
        <DriverRequirements />
      </TabsContent>
      <TabsContent value="emergency" className="mt-6">
        <EmergencyContacts />
      </TabsContent>
      <TabsContent value="parts" className="mt-6">
        <VehicleParts />
      </TabsContent>
    </Tabs>
  );
}
