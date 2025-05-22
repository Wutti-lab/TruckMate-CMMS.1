
import { TableRow, TableHead } from "@/components/ui/table";
import { useLanguage } from "@/contexts/LanguageContext";

export function TableHeader() {
  const { language } = useLanguage();

  // Translate table headers based on language
  const headers = {
    customer: language === 'de' ? 'Kunde' : 
              language === 'th' ? 'ลูกค้า' : 
              'Customer',
    company: language === 'de' ? 'Unternehmen' : 
             language === 'th' ? 'บริษัท' : 
             'Company',
    email: 'Email',
    country: language === 'de' ? 'Land' : 
             language === 'th' ? 'ประเทศ' : 
             'Country',
    totalSpent: language === 'de' ? 'Gesamtausgaben' : 
                language === 'th' ? 'ค่าใช้จ่ายทั้งหมด' : 
                'Total Spent',
    status: language === 'de' ? 'Status' : 
            language === 'th' ? 'สถานะ' : 
            'Status',
    actions: language === 'de' ? 'Aktionen' : 
             language === 'th' ? 'การดำเนินการ' : 
             'Actions'
  };

  return (
    <TableRow>
      <TableHead className="w-[200px]">{headers.customer}</TableHead>
      <TableHead>{headers.company}</TableHead>
      <TableHead>{headers.email}</TableHead>
      <TableHead>{headers.country}</TableHead>
      <TableHead>{headers.totalSpent}</TableHead>
      <TableHead>{headers.status}</TableHead>
      <TableHead className="text-right">{headers.actions}</TableHead>
    </TableRow>
  );
}
