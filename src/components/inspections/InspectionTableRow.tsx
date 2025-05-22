import { Car, Calendar } from "lucide-react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { InspectionActions } from "./InspectionActions";
import { Inspection } from "./types/inspection-types";

interface InspectionRowProps {
  inspection: Inspection;
  isThaiLanguage: boolean;
  onViewDetails: (inspection: Inspection) => void;
  onEdit: (inspection: Inspection) => void;
  onExportPDF: (inspection: Inspection) => void;
  onDelete: (inspection: Inspection) => void;
}

export function InspectionTableRow({
  inspection,
  isThaiLanguage,
  onViewDetails,
  onEdit,
  onExportPDF,
  onDelete,
}: InspectionRowProps) {
  const getStatusBadgeClass = (status: string): string => {
    switch (status) {
      case "Completed":
      case "เสร็จสมบูรณ์":
        return "border-green-200 bg-green-50 text-green-600";
      case "In Progress":
      case "กำลังดำเนินการ":
        return "border-orange-200 bg-orange-50 text-orange-600";
      default:
        return "border-gray-200 bg-gray-50 text-gray-600";
    }
  };

  return (
    <TableRow key={inspection.id}>
      <TableCell>
        <div className="flex items-center gap-2">
          <Car size={16} className="text-fleet-500" />
          {inspection.vehicleId}
        </div>
      </TableCell>
      <TableCell>{isThaiLanguage ? inspection.type.th : inspection.type.en}</TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={getStatusBadgeClass(isThaiLanguage ? inspection.status.th : inspection.status.en)}
        >
          {isThaiLanguage ? inspection.status.th : inspection.status.en}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <Calendar size={14} className="text-muted-foreground" />
          {inspection.date}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <div className="w-32 bg-gray-200 h-1.5 rounded-full">
            <div
              className="h-1.5 rounded-full bg-fleet-500"
              style={{
                width: `${(inspection.completedItems / inspection.totalItems) * 100}%`,
              }}
            ></div>
          </div>
          <span className="text-sm text-muted-foreground">
            {inspection.completedItems}/{inspection.totalItems}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <InspectionActions
          inspection={inspection}
          isThaiLanguage={isThaiLanguage}
          onViewDetails={onViewDetails}
          onEdit={onEdit}
          onExportPDF={onExportPDF}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  );
}
