import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Battery, 
  Calendar, 
  Car, 
  Fuel, 
  MapPin, 
  MoreHorizontal 
} from "lucide-react";
import { VehicleQRModal } from "./VehicleQRModal";

interface Vehicle {
  id: string;
  driver: string;
  model: string;
  location: string;
  status: string;
  fuelLevel: number;
  batteryLevel: number;
  lastService: string;
  nextService: string;
}

interface VehicleTableRowProps {
  vehicle: Vehicle;
}

export function VehicleTableRow({ vehicle }: VehicleTableRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          <Car size={16} className="text-fleet-500" />
          {vehicle.id}
        </div>
      </TableCell>
      <TableCell>{vehicle.driver}</TableCell>
      <TableCell>{vehicle.model}</TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <MapPin size={14} className="text-muted-foreground" />
          {vehicle.location}
        </div>
      </TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={
            vehicle.status === "Aktiv"
              ? "border-green-200 bg-green-50 text-green-600"
              : vehicle.status === "Inaktiv"
              ? "border-gray-200 bg-gray-50 text-gray-600"
              : "border-orange-200 bg-orange-50 text-orange-600"
          }
        >
          {vehicle.status}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-3 w-32">
          {vehicle.fuelLevel > 0 ? (
            <div className="flex items-center gap-1">
              <Fuel size={14} className="text-muted-foreground" />
              <span>{vehicle.fuelLevel}%</span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <Battery size={14} className="text-muted-foreground" />
              <span>{vehicle.batteryLevel}%</span>
            </div>
          )}
          <div className="w-full bg-gray-200 h-1.5 rounded-full">
            <div
              className={`h-1.5 rounded-full ${
                (vehicle.fuelLevel || vehicle.batteryLevel) > 50
                  ? "bg-green-500"
                  : (vehicle.fuelLevel || vehicle.batteryLevel) > 25
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{
                width: `${(vehicle.fuelLevel || vehicle.batteryLevel)}%`,
              }}
            ></div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <Calendar size={14} className="text-muted-foreground" />
          {vehicle.nextService}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <VehicleQRModal vehicle={vehicle} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuItem>View Details | ดูรายละเอียด</DropdownMenuItem>
              <DropdownMenuItem>Show on Map | แสดงบนแผนที่</DropdownMenuItem>
              <DropdownMenuItem>Schedule Service | กำหนดการซ่อมบำรุง</DropdownMenuItem>
              <DropdownMenuItem>Reports | รายงาน</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                Remove | ลบ
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  );
}
