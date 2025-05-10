
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Car, Calendar, ClipboardCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for inspections with English and Thai translations
const inspections = [
  {
    id: 1,
    vehicleId: "B-FR-123",
    type: { en: "Routine", th: "ประจำวัน" },
    status: { en: "Pending", th: "รอดำเนินการ" },
    date: "25.04.2023",
    completedItems: 0,
    totalItems: 15,
  },
  {
    id: 2,
    vehicleId: "B-FR-234",
    type: { en: "Maintenance", th: "บำรุงรักษา" },
    status: { en: "Completed", th: "เสร็จสมบูรณ์" },
    date: "20.04.2023",
    completedItems: 12,
    totalItems: 12,
  },
  {
    id: 3,
    vehicleId: "B-FR-345",
    type: { en: "Safety", th: "ความปลอดภัย" },
    status: { en: "In Progress", th: "กำลังดำเนินการ" },
    date: "22.04.2023",
    completedItems: 8,
    totalItems: 20,
  },
];

export function VehicleInspectionList() {
  const { language } = useLanguage();
  const isThaiLanguage = language === 'th';

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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{isThaiLanguage ? "ยานพาหนะ" : "Fahrzeug"}</TableHead>
          <TableHead>{isThaiLanguage ? "ประเภท" : "Typ"}</TableHead>
          <TableHead>{isThaiLanguage ? "สถานะ" : "Status"}</TableHead>
          <TableHead>{isThaiLanguage ? "วันที่" : "Datum"}</TableHead>
          <TableHead>{isThaiLanguage ? "ความคืบหน้า" : "Fortschritt"}</TableHead>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                  <DropdownMenuItem>
                    {isThaiLanguage ? "แสดงรายละเอียด" : "Details anzeigen"}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {isThaiLanguage ? "แก้ไข" : "Bearbeiten"}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {isThaiLanguage ? "ส่งออก PDF" : "PDF exportieren"}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    {isThaiLanguage ? "ลบ" : "Löschen"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
