
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, ClipboardList, CheckSquare } from "lucide-react";
import { VehicleInspectionList } from "@/components/inspections/VehicleInspectionList";
import { ChecklistTemplates } from "@/components/inspections/ChecklistTemplates";

export default function Inspections() {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 p-6 overflow-auto">
        <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
          <h1 className="text-2xl font-bold">Inspektionen & Checklisten</h1>
          <Button className="bg-fleet-500">
            <Plus size={16} className="mr-2" />
            Neue Inspektion
          </Button>
        </div>

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
          </TabsList>
          <TabsContent value="inspections" className="mt-6">
            <VehicleInspectionList />
          </TabsContent>
          <TabsContent value="templates" className="mt-6">
            <ChecklistTemplates />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
