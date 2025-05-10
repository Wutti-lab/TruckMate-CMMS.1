
import { TableCell, TableRow } from "@/components/ui/table";
import { useLanguage } from "@/contexts/LanguageContext";

export function EmptyState() {
  const { language } = useLanguage();
  
  return (
    <TableRow>
      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
        {language === 'de' ? 'Keine Kunden gefunden' : 
         language === 'th' ? 'ไม่พบลูกค้า' : 
         'No customers found'}
      </TableCell>
    </TableRow>
  );
}
