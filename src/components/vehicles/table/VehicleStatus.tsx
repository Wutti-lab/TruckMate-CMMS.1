
import { TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface VehicleStatusProps {
  status: string;
}

export function VehicleStatus({ status }: VehicleStatusProps) {
  return (
    <TableCell>
      <Badge
        variant="outline"
        className={
          status === "Active"
            ? "border-green-200 bg-green-50 text-green-600"
            : status === "Inactive"
            ? "border-gray-200 bg-gray-50 text-gray-600"
            : "border-orange-200 bg-orange-50 text-orange-600"
        }
      >
        {status}
      </Badge>
    </TableCell>
  );
}
