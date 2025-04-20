
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
    type: "Routine | ประจำวัน",
    status: "Pending | รอดำเนินการ",
    date: "25.04.2023",
    completedItems: 0,
    totalItems: 15,
  },
  {
    id: 2,
    vehicleId: "B-FR-234",
    type: "Maintenance | การบำรุงรักษา",
    status: "Completed | เสร็จสิ้น",
    date: "20.04.2023",
    completedItems: 12,
    totalItems: 12,
  },
  {
    id: 3,
    vehicleId: "B-FR-345",
    type: "Safety | ความปลอดภัย",
    status: "In Progress | กำลังดำเนินการ",
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
          <TableHead>Vehicle | ยานพาหนะ</TableHead>
          <TableHead>Type | ประเภท</TableHead>
          <TableHead>Status | สถานะ</TableHead>
          <TableHead>Date | วันที่</TableHead>
          <TableHead>Progress | ความคืบหน้า</TableHead>
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
                  inspection.status.includes("Completed")
                    ? "border-green-200 bg-green-50 text-green-600"
                    : inspection.status.includes("Progress")
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
                  <DropdownMenuItem>View Details | ดูรายละเอียด</DropdownMenuItem>
                  <DropdownMenuItem>Edit | แก้ไข</DropdownMenuItem>
                  <DropdownMenuItem>Export PDF | ส่งออก PDF</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Delete | ลบ</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
