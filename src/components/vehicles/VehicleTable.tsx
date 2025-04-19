
import { 
  Table, 
  TableBody, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { VehicleTableRow } from "./VehicleTableRow";

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

interface VehicleTableProps {
  vehicles: Vehicle[];
}

export function VehicleTable({ vehicles }: VehicleTableProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ทะเบียน</TableHead>
              <TableHead>คนขับ</TableHead>
              <TableHead>รุ่น</TableHead>
              <TableHead>ตำแหน่ง</TableHead>
              <TableHead>สถานะ</TableHead>
              <TableHead>ระดับแบตเตอรี่</TableHead>
              <TableHead>ซ่อมบำรุงครั้งต่อไป</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map((vehicle) => (
              <VehicleTableRow key={vehicle.id} vehicle={vehicle} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
