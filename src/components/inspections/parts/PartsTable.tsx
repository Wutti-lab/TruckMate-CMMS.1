
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PartInfo } from "../models/PartInfo";
import { useLanguage } from "@/contexts/LanguageContext";

interface PartsTableProps {
  parts: PartInfo[];
}

export function PartsTable({ parts }: PartsTableProps) {
  const { language } = useLanguage();
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{language === 'de' ? "Fahrzeug-ID" : "Vehicle ID"}</TableHead>
          <TableHead>{language === 'de' ? "Fahrzeugmodell" : "Vehicle Model"}</TableHead>
          <TableHead>{language === 'de' ? "Teilname" : "Part Name"}</TableHead>
          <TableHead>{language === 'de' ? "Installationsdatum" : "Installation Date"}</TableHead>
          <TableHead>{language === 'de' ? "Lieferant" : "Supplier"}</TableHead>
          <TableHead>{language === 'de' ? "Garantie bis" : "Warranty Until"}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {parts.map((part) => (
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
  );
}
