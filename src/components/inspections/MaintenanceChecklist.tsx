
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DailyChecks } from "./checklist/DailyChecks";
import { StandardEquipment } from "./checklist/StandardEquipment";
import { EmergencySafety } from "./checklist/EmergencySafety";
import { SleepingArea } from "./checklist/SleepingArea";
import { TrainingSection } from "./checklist/TrainingSection";
import { VehicleTypes } from "./checklist/VehicleTypes";
import { ProductTransport } from "./checklist/ProductTransport";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/lib/types/user-roles";
import { Info } from "lucide-react";

export function MaintenanceChecklist() {
  const { user } = useAuth();
  const isDriver = user?.role === UserRole.DRIVER;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          Truck Maintenance Checklist | รายการตรวจสอบการบำรุงรักษารถบรรทุก
          {isDriver && (
            <div className="ml-2 p-1 bg-blue-100 text-blue-700 rounded-md flex items-center text-xs">
              <Info size={14} className="mr-1" />
              <span>Driver View | มุมมองคนขับ</span>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <DailyChecks />
        <StandardEquipment />
        <EmergencySafety />
        <SleepingArea />
        <TrainingSection />
        <VehicleTypes />
        <ProductTransport />
      </CardContent>
    </Card>
  );
}
