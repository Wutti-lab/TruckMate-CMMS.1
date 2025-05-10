
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { SoftwareLicense } from "@/lib/types/customer-types";
import { useLanguage } from "@/contexts/LanguageContext";

interface LicensesTableProps {
  licenses: SoftwareLicense[];
}

export function LicensesTable({ licenses }: LicensesTableProps) {
  const { language } = useLanguage();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'de' ? 'de-DE' : 'en-US').format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'de' ? 'de-DE' : 'en-US', { 
      style: 'currency', 
      currency: 'EUR'
    }).format(amount);
  };

  const getLicenseStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'expired': return 'secondary';
      case 'revoked': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{language === 'de' ? 'Produkt' : 'Product'}</TableHead>
          <TableHead>{language === 'de' ? 'Lizenzschlüssel' : 'License Key'}</TableHead>
          <TableHead>{language === 'de' ? 'Gekauft am' : 'Purchase Date'}</TableHead>
          <TableHead>{language === 'de' ? 'Ablaufdatum' : 'Expiry Date'}</TableHead>
          <TableHead>{language === 'de' ? 'Preis' : 'Price'}</TableHead>
          <TableHead>{language === 'de' ? 'Status' : 'Status'}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {licenses.length > 0 ? (
          licenses.map((license) => (
            <TableRow key={license.id}>
              <TableCell className="font-medium">{license.productName}</TableCell>
              <TableCell className="font-mono text-xs">{license.licenseKey}</TableCell>
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
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
              {language === 'de' ? 'Keine Lizenzen gefunden' : 'No licenses found'}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
