
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLanguage } from "@/contexts/LanguageContext";

export function LicensesTableHeader() {
  const { language } = useLanguage();
  
  return (
    <TableHeader>
      <TableRow>
        <TableHead>
          {language === 'de' ? 'Produkt' : 
           language === 'th' ? 'สินค้า' : 
           'Product'}
        </TableHead>
        <TableHead>
          {language === 'de' ? 'Lizenzschlüssel' : 
           language === 'th' ? 'รหัสใบอนุญาต' : 
           'License Key'}
        </TableHead>
        <TableHead>
          {language === 'de' ? 'Rolle' : 
           language === 'th' ? 'บทบาท' : 
           'Role'}
        </TableHead>
        <TableHead>
          {language === 'de' ? 'Gekauft am' : 
           language === 'th' ? 'วันที่ซื้อ' : 
           'Purchase Date'}
        </TableHead>
        <TableHead>
          {language === 'de' ? 'Ablaufdatum' : 
           language === 'th' ? 'วันหมดอายุ' : 
           'Expiry Date'}
        </TableHead>
        <TableHead>
          {language === 'de' ? 'Preis (฿)' : 
           language === 'th' ? 'ราคา (฿)' : 
           'Price (฿)'}
        </TableHead>
        <TableHead>
          {language === 'de' ? 'Status' : 
           language === 'th' ? 'สถานะ' : 
           'Status'}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
