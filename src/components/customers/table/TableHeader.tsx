
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLanguage } from "@/contexts/LanguageContext";

export function CustomersTableHeader() {
  const { language } = useLanguage();
  
  return (
    <TableHeader>
      <TableRow>
        <TableHead>
          {language === 'de' ? 'Kunde/Firma' : 
           language === 'th' ? 'ลูกค้า/บริษัท' : 
           'Customer/Company'}
        </TableHead>
        <TableHead>
          {language === 'de' ? 'Kontakt' : 
           language === 'th' ? 'ติดต่อ' : 
           'Contact'}
        </TableHead>
        <TableHead>
          {language === 'de' ? 'Lizenzen' : 
           language === 'th' ? 'ใบอนุญาต' : 
           'Licenses'}
        </TableHead>
        <TableHead>
          {language === 'de' ? 'Ausgaben (฿)' : 
           language === 'th' ? 'จำนวนเงินที่ใช้ทั้งหมด (฿)' : 
           'Total Spent (฿)'}
        </TableHead>
        <TableHead>
          {language === 'de' ? 'Status' : 
           language === 'th' ? 'สถานะ' : 
           'Status'}
        </TableHead>
        <TableHead className="w-[80px]"></TableHead>
      </TableRow>
    </TableHeader>
  );
}
