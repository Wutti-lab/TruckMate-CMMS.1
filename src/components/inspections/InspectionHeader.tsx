
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface InspectionHeaderProps {
  onNewInspection?: () => void;
}

export function InspectionHeader({ onNewInspection }: InspectionHeaderProps) {
  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <h1 className="text-xl sm:text-2xl font-bold">Inspections & Checklisten</h1>
      {onNewInspection && (
        <Button className="bg-fleet-500 w-full sm:w-auto" onClick={onNewInspection}>
          <Plus size={16} className="mr-2" />
          Neue Inspektion
        </Button>
      )}
    </div>
  );
}
