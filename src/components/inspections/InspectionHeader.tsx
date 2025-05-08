
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface InspectionHeaderProps {
  onNewInspection?: () => void;
}

export function InspectionHeader({ onNewInspection }: InspectionHeaderProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
      <h1 className="text-2xl font-bold">Inspections & Checklists | การตรวจสอบและรายการตรวจสอบ</h1>
      {onNewInspection && (
        <Button className="bg-fleet-500" onClick={onNewInspection}>
          <Plus size={16} className="mr-2" />
          New Inspection | ตรวจสอบใหม่
        </Button>
      )}
    </div>
  );
}
