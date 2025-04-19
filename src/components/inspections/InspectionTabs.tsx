
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ClipboardList, CheckSquare, UserCog, Truck, Clock } from "lucide-react";
import { VehicleInspectionList } from "./VehicleInspectionList";
import { ChecklistTemplates } from "./ChecklistTemplates";
import { DriverRequirements } from "./DriverRequirements";
import { MaintenanceChecklist } from "./MaintenanceChecklist";
import { TransportRegulations } from "./TransportRegulations";

export function InspectionTabs() {
  return (
    <Tabs defaultValue="inspections" className="w-full">
      <TabsList>
        <TabsTrigger value="inspections" className="flex items-center gap-2">
          <ClipboardList size={16} />
          Inspektionen
        </TabsTrigger>
        <TabsTrigger value="templates" className="flex items-center gap-2">
          <CheckSquare size={16} />
          Checklisten-Vorlagen
        </TabsTrigger>
        <TabsTrigger value="maintenance" className="flex items-center gap-2">
          <Truck size={16} />
          LKW-Wartung
        </TabsTrigger>
        <TabsTrigger value="timeRestrictions" className="flex items-center gap-2">
          <Clock size={16} />
          Fahrzeiten
        </TabsTrigger>
        <TabsTrigger value="drivers" className="flex items-center gap-2">
          <UserCog size={16} />
          Fahrerqualifikationen
        </TabsTrigger>
      </TabsList>
      <TabsContent value="inspections" className="mt-6">
        <VehicleInspectionList />
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
    </Tabs>
  );
}
