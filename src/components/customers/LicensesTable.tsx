
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Key } from "lucide-react";
import { SoftwareLicense } from "@/lib/types/customer-types";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { generateLicenseKey } from "@/lib/utils/customerUtils";

interface LicensesTableProps {
  licenses: SoftwareLicense[];
}

export function LicensesTable({ licenses }: LicensesTableProps) {
  const { language } = useLanguage();
  const { toast } = useToast();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'de' ? 'de-DE' : 'en-US').format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'de' ? 'de-DE' : 'en-US', { 
      style: 'currency', 
      currency: 'THB',
      currencyDisplay: 'symbol'
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
  
  const handleGenerateKey = () => {
    const newKey = generateLicenseKey();
    
    // Copy to clipboard
    navigator.clipboard.writeText(newKey).then(() => {
      toast({
        title: language === 'de' ? 'Lizenzschlüssel generiert' : 'License key generated',
        description: language === 'de' 
          ? `Der neue Schlüssel "${newKey}" wurde in die Zwischenablage kopiert` 
          : `New key "${newKey}" copied to clipboard`,
      });
    });
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button 
          onClick={handleGenerateKey}
          className="bg-fleet-600 hover:bg-fleet-700"
        >
          <Key className="mr-2 h-4 w-4" />
          {language === 'de' ? 'Neuen Lizenzschlüssel generieren' : 'Generate New License Key'}
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{language === 'de' ? 'Produkt' : 'Product'}</TableHead>
            <TableHead>{language === 'de' ? 'Lizenzschlüssel' : 'License Key'}</TableHead>
            <TableHead>{language === 'de' ? 'Gekauft am' : 'Purchase Date'}</TableHead>
            <TableHead>{language === 'de' ? 'Ablaufdatum' : 'Expiry Date'}</TableHead>
            <TableHead>{language === 'de' ? 'Preis (฿)' : 'Price (฿)'}</TableHead>
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
    </div>
  );
}
