
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Car, Calendar, ClipboardCheck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for inspections
const inspections = [
  {
    id: 1,
    vehicleId: "B-FR-123",
    type: "Routine",
    status: "Ausstehend",
    date: "25.04.2023",
    completedItems: 0,
    totalItems: 15,
  },
  {
    id: 2,
    vehicleId: "B-FR-234",
    type: "Wartung",
    status: "Abgeschlossen",
    date: "20.04.2023",
    completedItems: 12,
    totalItems: 12,
  },
  {
    id: 3,
    vehicleId: "B-FR-345",
    type: "Sicherheit",
    status: "In Bearbeitung",
    date: "22.04.2023",
    completedItems: 8,
    totalItems: 20,
  },
];

export function VehicleInspectionList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Fahrzeug</TableHead>
          <TableHead>Typ</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Datum</TableHead>
          <TableHead>Fortschritt</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {inspections.map((inspection) => (
          <TableRow key={inspection.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Car size={16} className="text-fleet-500" />
                {inspection.vehicleId}
              </div>
            </TableCell>
            <TableCell>{inspection.type}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={
                  inspection.status === "Abgeschlossen"
                    ? "border-green-200 bg-green-50 text-green-600"
                    : inspection.status === "In Bearbeitung"
                    ? "border-orange-200 bg-orange-50 text-orange-600"
                    : "border-gray-200 bg-gray-50 text-gray-600"
                }
              >
                {inspection.status}
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                  <DropdownMenuItem>Details anzeigen</DropdownMenuItem>
                  <DropdownMenuItem>Bearbeiten</DropdownMenuItem>
                  <DropdownMenuItem>PDF exportieren</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Löschen</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
