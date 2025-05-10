
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Pencil, Trash2, CreditCard, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Customer } from "@/lib/types/customer-types";

interface CustomersTableProps {
  customers: Customer[];
  searchQuery: string;
  onEditCustomer: (customer: Customer) => void;
  onDeleteCustomer: (id: string) => void;
  onViewLicenses: (customer: Customer) => void;
}

export function CustomersTable({ 
  customers, 
  searchQuery, 
  onEditCustomer, 
  onDeleteCustomer,
  onViewLicenses
}: CustomersTableProps) {
  const { toast } = useToast();
  const { language } = useLanguage();

  // Filter customers based on search query
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'de' ? 'de-DE' : 'en-US', { 
      style: 'currency', 
      currency: 'THB',
      currencyDisplay: 'symbol'
    }).format(amount);
  };

  const handleSendEmail = (email: string) => {
    toast({
      title: language === 'de' ? 'Email function' : 
            language === 'th' ? 'ฟังก์ชันอีเมล' :
            'Email function',
      description: language === 'de' ? `Email feature will be implemented to send to: ${email}` :
                   language === 'th' ? `คุณสมบัติอีเมลจะถูกใช้เพื่อส่งไปที่: ${email}` :
                   `Email feature will be implemented to send to: ${email}`,
    });
  };

  return (
    <Table>
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
      <TableBody>
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{customer.name}</div>
                  <div className="text-sm text-muted-foreground">{customer.company}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <div>{customer.email}</div>
                  <div>{customer.phone}</div>
                </div>
              </TableCell>
              <TableCell>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onViewLicenses(customer)}
                >
                  {customer.licenses.length} {
                    language === 'de' ? 'Lizenzen' : 
                    language === 'th' ? 'ใบอนุญาต' : 
                    'licenses'
                  }
                </Button>
              </TableCell>
              <TableCell>
                <div className="font-medium">
                  {formatCurrency(customer.totalSpent)}
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={customer.status === 'active' ? "default" : "destructive"}
                  className="capitalize"
                >
                  {customer.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem 
                      className="cursor-pointer"
                      onClick={() => onEditCustomer(customer)}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      {language === 'de' ? 'Bearbeiten' : 
                       language === 'th' ? 'แก้ไข' : 
                       'Edit'}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="cursor-pointer"
                      onClick={() => handleSendEmail(customer.email)}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      {language === 'de' ? 'Email senden' : 
                       language === 'th' ? 'ส่งอีเมล' : 
                       'Send Email'}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="cursor-pointer"
                      onClick={() => onViewLicenses(customer)}
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      {language === 'de' ? 'Lizenzen verwalten' : 
                       language === 'th' ? 'จัดการใบอนุญาต' : 
                       'Manage Licenses'}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="cursor-pointer text-red-600"
                      onClick={() => onDeleteCustomer(customer.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      {language === 'de' ? 'Löschen' : 
                       language === 'th' ? 'ลบ' : 
                       'Delete'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
              {language === 'de' ? 'Keine Kunden gefunden' : 
               language === 'th' ? 'ไม่พบลูกค้า' : 
               'No customers found'}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
