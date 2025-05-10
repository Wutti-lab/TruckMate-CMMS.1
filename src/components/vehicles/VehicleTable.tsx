
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { VehicleTableRow } from "./VehicleTableRow";
import { useLanguage } from "@/contexts/LanguageContext";

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
  engineTemp: number;
}

interface VehicleTableProps {
  vehicles: Vehicle[];
}

export function VehicleTable({ vehicles }: VehicleTableProps) {
  const { language } = useLanguage();
  
  // Function to get the correct header text based on language
  const getHeaderText = (en: string, de: string): string => {
    return language === 'de' ? de : en;
  };

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{getHeaderText("License Plate", "Kennzeichen")}</TableHead>
              <TableHead>{getHeaderText("Driver", "Fahrer")}</TableHead>
              <TableHead>{getHeaderText("Model", "Modell")}</TableHead>
              <TableHead>{getHeaderText("Location", "Standort")}</TableHead>
              <TableHead>{getHeaderText("Status", "Status")}</TableHead>
              <TableHead>{getHeaderText("Battery Level", "Batteriestand")}</TableHead>
              <TableHead>
                <span className="flex items-center gap-1">
                  {getHeaderText("Motor Temp.", "Motortemp.")}
                </span>
              </TableHead>
              <TableHead>{getHeaderText("Next Service", "Nächste Wartung")}</TableHead>
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
