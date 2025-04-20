
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DailyChecks } from "./checklist/DailyChecks";
import { StandardEquipment } from "./checklist/StandardEquipment";
import { EmergencySafety } from "./checklist/EmergencySafety";
import { SleepingArea } from "./checklist/SleepingArea";
import { TrainingSection } from "./checklist/TrainingSection";
import { VehicleTypes } from "./checklist/VehicleTypes";
import { ProductTransport } from "./checklist/ProductTransport";

export function MaintenanceChecklist() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Truck Maintenance Checklist | รายการตรวจสอบการบำรุงรักษารถบรรทุก</CardTitle>
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
