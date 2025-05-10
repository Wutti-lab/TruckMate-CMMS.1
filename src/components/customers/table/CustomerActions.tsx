
import { Customer } from "@/lib/types/customer-types";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2, CreditCard, Mail } from "lucide-react";

interface CustomerActionsProps {
  customer: Customer;
  onEditCustomer: (customer: Customer) => void;
  onDeleteCustomer: (id: string) => void;
  onViewLicenses: (customer: Customer) => void;
}

export function CustomerActions({ 
  customer, 
  onEditCustomer, 
  onDeleteCustomer, 
  onViewLicenses 
}: CustomerActionsProps) {
  const { toast } = useToast();
  const { language } = useLanguage();

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
  );
}
