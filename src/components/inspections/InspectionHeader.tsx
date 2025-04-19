
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function InspectionHeader() {
  return (
    <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
      <h1 className="text-2xl font-bold">Inspektionen & Checklisten</h1>
      <Button className="bg-fleet-500">
        <Plus size={16} className="mr-2" />
        Neue Inspektion
      </Button>
    </div>
  );
}
