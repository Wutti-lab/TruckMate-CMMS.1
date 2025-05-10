
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { SoftwareLicense } from "@/lib/types/customer-types";
import { useLicenseFormatters } from "../hooks/useLicenseFormatters";

interface LicenseRowProps {
  license: SoftwareLicense;
}

export function LicenseRow({ license }: LicenseRowProps) {
  const { formatDate, formatCurrency, getLicenseStatusVariant } = useLicenseFormatters();
  
  return (
    <TableRow>
      <TableCell className="font-medium">{license.productName}</TableCell>
      <TableCell className="font-mono text-xs">{license.licenseKey}</TableCell>
      <TableCell>{license.role || '-'}</TableCell>
      <TableCell>{formatDate(license.purchaseDate)}</TableCell>
      <TableCell>{formatDate(license.expiryDate)}</TableCell>
      <TableCell>{formatCurrency(license.price)}</TableCell>
      <TableCell>
        <Badge 
          variant={getLicenseStatusVariant(license.status)}
          className="capitalize"
        >
          {license.status}
        </Badge>
      </TableCell>
    </TableRow>
  );
}
