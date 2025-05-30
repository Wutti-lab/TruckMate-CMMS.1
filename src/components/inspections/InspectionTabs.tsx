
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  ClipboardList, 
  CheckSquare, 
  Truck, 
  Clock, 
  MapPin, 
  Phone
} from "lucide-react";
import { VehicleInspectionList } from "./VehicleInspectionList";
import { ChecklistTemplates } from "./ChecklistTemplates";
import { MaintenanceChecklist } from "./MaintenanceChecklist";
import { TransportRegulations } from "./TransportRegulations";
import { DeliveryManagement } from "./DeliveryManagement";
import { EmergencyContacts } from "./EmergencyContacts";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

export function InspectionTabs() {
  const { language } = useLanguage();
  const { toast } = useToast();

  const getTabLabel = (en: string, de: string, th: string): string => {
    if (language === 'th') return th;
    if (language === 'de') return de;
    return en;
  };

  return (
    <Tabs defaultValue="inspections" className="w-full">
      <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 p-2 mb-6">
        <TabsTrigger value="inspections" className="flex items-center gap-2 py-2 px-3">
          <ClipboardList size={16} />
          {getTabLabel("Inspections", "Inspektionen", "การตรวจสอบ")}
        </TabsTrigger>
        <TabsTrigger value="deliveries" className="flex items-center gap-2 py-2 px-3">
          <MapPin size={16} />
          {getTabLabel("Deliveries", "Lieferungen", "การส่งมอบ")}
        </TabsTrigger>
        <TabsTrigger value="templates" className="flex items-center gap-2 py-2 px-3">
          <CheckSquare size={16} />
          {getTabLabel("Templates", "Vorlagen", "แม่แบบ")}
        </TabsTrigger>
        <TabsTrigger value="maintenance" className="flex items-center gap-2 py-2 px-3">
          <Truck size={16} />
          {getTabLabel("Maintenance", "Wartung", "การบำรุงรักษา")}
        </TabsTrigger>
        <TabsTrigger value="timeRestrictions" className="flex items-center gap-2 py-2 px-3">
          <Clock size={16} />
          {getTabLabel("Driving Times", "Fahrzeiten", "เวลาขับขี่")}
        </TabsTrigger>
        <TabsTrigger value="emergency" className="flex items-center gap-2 py-2 px-3">
          <Phone size={16} />
          {getTabLabel("Emergency", "Notfall", "ฉุกเฉิน")}
        </TabsTrigger>
      </TabsList>
      
      <div className="mt-4 md:mt-8">
        <Card className="border shadow-sm">
          <CardContent className="p-6 space-y-8">
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
            <TabsContent value="emergency" className="mt-0">
              <EmergencyContacts />
            </TabsContent>
          </CardContent>
        </Card>
      </div>
    </Tabs>
  );
}
