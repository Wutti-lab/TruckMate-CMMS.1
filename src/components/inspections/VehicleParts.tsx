
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Package } from "lucide-react";

interface PartInfo {
  id: string;
  name: string;
  installedDate: string;
  supplier: string;
  warrantyEnd: string;
  vehicleId: string;
  vehicleModel: string;
}

const vehicleParts: PartInfo[] = [
  {
    id: "P001",
    name: "Brake Pads | ผ้าเบรก",
    installedDate: "2024-03-15",
    supplier: "BrakeTech Co. | เบรคเทค จำกัด",
    warrantyEnd: "2025-03-15",
    vehicleId: "B-FR-123",
    vehicleModel: "Tesla Model Y"
  },
  {
    id: "P002",
    name: "Air Filter | กรองอากาศ",
    installedDate: "2024-02-20",
    supplier: "FilterPro | ฟิลเตอร์โปร",
    warrantyEnd: "2025-02-20",
    vehicleId: "B-FR-234",
    vehicleModel: "VW ID.4"
  },
  {
    id: "P003",
    name: "Battery | แบตเตอรี่",
    installedDate: "2024-01-10",
    supplier: "PowerCell | พาวเวอร์เซลล์",
    warrantyEnd: "2026-01-10",
    vehicleId: "B-FR-345",
    vehicleModel: "Audi e-tron"
  },
];

export function VehicleParts() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Package className="h-5 w-5" />
        <h2 className="text-lg font-semibold">
          Replacement Parts | อะไหล่ทดแทน
        </h2>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle ID | รหัสรถ</TableHead>
                <TableHead>Vehicle Model | รุ่นรถ</TableHead>
                <TableHead>Part Name | ชื่อชิ้นส่วน</TableHead>
                <TableHead>Installation Date | วันที่ติดตั้ง</TableHead>
                <TableHead>Supplier | ผู้จัดจำหน่าย</TableHead>
                <TableHead>Warranty Until | รับประกันถึง</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicleParts.map((part) => (
                <TableRow key={part.id}>
                  <TableCell>{part.vehicleId}</TableCell>
                  <TableCell>{part.vehicleModel}</TableCell>
                  <TableCell>{part.name}</TableCell>
                  <TableCell>{part.installedDate}</TableCell>
                  <TableCell>{part.supplier}</TableCell>
                  <TableCell>{part.warrantyEnd}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
