
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, User, MapPin, Phone, Car, Clock } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Driver {
  id: string;
  name: string;
  licenseType: string;
  phone: string;
  status: string;
  location: string;
  vehicle: string;
  lastTrip: string;
  hoursThisWeek: number;
  shift?: "AM" | "PM";  // Added shift property
}

interface DriverTableProps {
  drivers: Driver[];
}

export function DriverTable({ drivers }: DriverTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Driver ID | รหัสคนขับ</TableHead>
            <TableHead>Name | ชื่อ</TableHead>
            <TableHead>Status | สถานะ</TableHead>
            <TableHead>Shift | กะ</TableHead>
            <TableHead>License | ใบอนุญาต</TableHead>
            <TableHead>Location | ตำแหน่ง</TableHead>
            <TableHead>Vehicle | ยานพาหนะ</TableHead>
            <TableHead>Hours | ชั่วโมง</TableHead>
            <TableHead className="text-right">Actions | การดำเนินการ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {drivers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8">
                No drivers found | ไม่พบพนักงานขับรถ
              </TableCell>
            </TableRow>
          ) : (
            drivers.map((driver) => (
              <TableRow key={driver.id}>
                <TableCell className="font-medium">{driver.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-fleet-500" />
                    {driver.name}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      driver.status === "Active"
                        ? "border-green-200 bg-green-50 text-green-600"
                        : driver.status === "Off-duty"
                        ? "border-orange-200 bg-orange-50 text-orange-600"
                        : "border-red-200 bg-red-50 text-red-600"
                    }
                  >
                    {driver.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-muted-foreground" />
                    {driver.shift || "-"}
                  </div>
                </TableCell>
                <TableCell>{driver.licenseType}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-muted-foreground" />
                    {driver.location}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Car size={14} className="text-muted-foreground" />
                    {driver.vehicle}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-muted-foreground" />
                    {driver.hoursThisWeek}h
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white">
                      <DropdownMenuItem>View Details | ดูรายละเอียด</DropdownMenuItem>
                      <DropdownMenuItem>Edit | แก้ไข</DropdownMenuItem>
                      <DropdownMenuItem>Message | ข้อความ</DropdownMenuItem>
                      <DropdownMenuItem>Schedule | ตารางเวลา</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Deactivate | ปิดการใช้งาน
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
