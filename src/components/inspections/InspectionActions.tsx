
import { FileText, Edit, FileDown, Trash, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Inspection } from "./types/inspection-types";

interface InspectionActionsProps {
  inspection: Inspection;
  isThaiLanguage: boolean;
  onViewDetails: (inspection: Inspection) => void;
  onEdit: (inspection: Inspection) => void;
  onExportPDF: (inspection: Inspection) => void;
  onDelete: (inspection: Inspection) => void;
}

export function InspectionActions({
  inspection,
  isThaiLanguage,
  onViewDetails,
  onEdit,
  onExportPDF,
  onDelete,
}: InspectionActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        <DropdownMenuItem onClick={() => onViewDetails(inspection)} className="cursor-pointer">
          <FileText size={16} className="mr-2" />
          {isThaiLanguage ? "แสดงรายละเอียด" : "Details anzeigen"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEdit(inspection)} className="cursor-pointer">
          <Edit size={16} className="mr-2" />
          {isThaiLanguage ? "แก้ไข" : "Bearbeiten"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onExportPDF(inspection)} className="cursor-pointer">
          <FileDown size={16} className="mr-2" />
          {isThaiLanguage ? "ส่งออก PDF" : "PDF exportieren"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(inspection)} className="cursor-pointer text-red-600">
          <Trash size={16} className="mr-2" />
          {isThaiLanguage ? "ลบ" : "Löschen"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
