
import { TableCell } from "@/components/ui/table";
import { Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface VehicleServiceProps {
  nextService: string;
}

export function VehicleService({ nextService }: VehicleServiceProps) {
  return (
    <TableCell>
      <div className="flex items-center gap-1">
        <Calendar size={14} className="text-muted-foreground" />
        {nextService}
      </div>
    </TableCell>
  );
}
