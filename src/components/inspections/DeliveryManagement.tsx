
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, User, Phone, Mail, MoreHorizontal } from "lucide-react";
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
    customerName: "Firma ABC GmbH",
    contactPerson: "Hans Mueller",
    phone: "+49 123 456789",
    email: "h.mueller@abc.de",
    pickupLocation: "Industriestraße 1, Berlin",
    deliveryLocation: "Hafenstraße 10, Hamburg",
    status: "Aktiv",
  },
  {
    id: 2,
    customerName: "Logistik XYZ",
    contactPerson: "Maria Schmidt",
    phone: "+49 987 654321",
    email: "m.schmidt@xyz.de",
    pickupLocation: "Hauptstraße 25, München",
    deliveryLocation: "Bahnhofstraße 5, Frankfurt",
    status: "In Bearbeitung",
  },
];

export function DeliveryManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Lieferungen & Kunden</h2>
        <Button>
          Neue Lieferung
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kunde</TableHead>
            <TableHead>Kontakt</TableHead>
            <TableHead>Abholort</TableHead>
            <TableHead>Lieferort</TableHead>
            <TableHead>Status</TableHead>
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
                    delivery.status === "Aktiv"
                      ? "border-green-200 bg-green-50 text-green-600"
                      : "border-orange-200 bg-orange-50 text-orange-600"
                  }
                >
                  {delivery.status}
                </Badge>
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
                    <DropdownMenuItem className="text-red-600">Löschen</DropdownMenuItem>
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
