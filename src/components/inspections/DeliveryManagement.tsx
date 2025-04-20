import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, User, Phone, Mail, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for deliveries
const deliveries = [
  {
    id: 1,
    customerName: "Company ABC Ltd. | บริษัท ABC จำกัด",
    contactPerson: "John Smith | จอห์น สมิธ",
    phone: "+66 123 456789",
    email: "j.smith@abc.com",
    pickupLocation: "Industrial Street 1, Bangkok | ถนนอุตสาหกรรม 1 กรุงเทพ",
    deliveryLocation: "Harbor Street 10, Pattaya | ถนนท่าเรือ 10 พัทยา",
    status: "Active | ใช้งาน",
  },
  {
    id: 2,
    customerName: "Logistics XYZ | โลจิสติกส์ XYZ",
    contactPerson: "Mary Johnson | แมรี่ จอห์นสัน",
    phone: "+66 987 654321",
    email: "m.johnson@xyz.com",
    pickupLocation: "Main Street 25, Bangkok | ถนนเมน 25 กรุงเทพ",
    deliveryLocation: "Station Street 5, Chonburi | ถนนสถานี 5 ชลบุรี",
    status: "In Progress | กำลังดำเนินการ",
  },
];

export function DeliveryManagement() {
  const openGoogleMaps = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Deliveries & Customers | การจัดส่งและลูกค้า</h2>
        <Button>
          New Delivery | การจัดส่งใหม่
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer | ลูกค้า</TableHead>
            <TableHead>Contact | ติดต่อ</TableHead>
            <TableHead>Pickup Location | สถานที่รับ</TableHead>
            <TableHead>Delivery Location | สถานที่ส่ง</TableHead>
            <TableHead>Status | สถานะ</TableHead>
            <TableHead>Map | แผนที่</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deliveries.map((delivery) => (
            <TableRow key={delivery.id}>
              <TableCell>
                <div className="space-y-1">
                  <div className="font-medium">{delivery.customerName}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <User size={14} />
                    {delivery.contactPerson}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone size={14} />
                    {delivery.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail size={14} />
                    {delivery.email}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-red-500" />
                  {delivery.pickupLocation}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-green-500" />
                  {delivery.deliveryLocation}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    delivery.status.includes("Active")
                      ? "border-green-200 bg-green-50 text-green-600"
                      : "border-orange-200 bg-orange-50 text-orange-600"
                  }
                >
                  {delivery.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Link to="/map">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <MapPin size={14} className="text-fleet-500" />
                      App Map | แผนที่แอป
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => openGoogleMaps(delivery.deliveryLocation)}
                  >
                    <MapPin size={14} className="text-red-500" />
                    Google Maps
                  </Button>
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
                    <DropdownMenuItem className="text-red-600">Delete | ลบ</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
