
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Customer } from "@/lib/types/customer-types";
import { useLanguage } from "@/contexts/LanguageContext";
import { CustomerActions } from "./CustomerActions";

interface CustomerRowProps {
  customer: Customer;
  onEditCustomer: (customer: Customer) => void;
  onDeleteCustomer: (id: string) => void;
  onViewLicenses: (customer: Customer) => void;
  formatCurrency: (amount: number) => string;
}

export function CustomerRow({ 
  customer, 
  onEditCustomer, 
  onDeleteCustomer, 
  onViewLicenses, 
  formatCurrency 
}: CustomerRowProps) {
  return (
    <tr className="border-b transition-colors hover:bg-muted/50">
      <td className="p-4 align-middle">
        <div>
          <div className="font-medium">{customer.name}</div>
          <div className="text-sm text-muted-foreground">{customer.company}</div>
        </div>
      </td>
      <td className="p-4 align-middle">
        <div className="text-sm">
          <div>{customer.email}</div>
          <div>{customer.phone}</div>
        </div>
      </td>
      <td className="p-4 align-middle">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onViewLicenses(customer)}
        >
          {customer.licenses.length} {
            useLanguage().language === 'de' ? 'Lizenzen' : 
            useLanguage().language === 'th' ? 'ใบอนุญาต' : 
            'licenses'
          }
        </Button>
      </td>
      <td className="p-4 align-middle">
        <div className="font-medium">
          {formatCurrency(customer.totalSpent)}
        </div>
      </td>
      <td className="p-4 align-middle">
        <Badge 
          variant={customer.status === 'active' ? "default" : "destructive"}
          className="capitalize"
        >
          {customer.status}
        </Badge>
      </td>
      <td className="p-4 align-middle">
        <CustomerActions 
          customer={customer}
          onEditCustomer={onEditCustomer}
          onDeleteCustomer={onDeleteCustomer}
          onViewLicenses={onViewLicenses}
        />
      </td>
    </tr>
  );
}
