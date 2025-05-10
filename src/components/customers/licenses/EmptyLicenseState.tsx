
import { TableCell, TableRow } from "@/components/ui/table";
import { useLanguage } from "@/contexts/LanguageContext";

export function EmptyLicenseState() {
  const { language } = useLanguage();
  
  return (
    <TableRow>
      <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
        {language === 'de' ? 'Keine Lizenzen gefunden' : 
         language === 'th' ? 'ไม่พบใบอนุญาต' : 
         'No licenses found'}
      </TableCell>
    </TableRow>
  );
}
