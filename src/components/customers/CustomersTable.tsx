
import { Table } from "@/components/ui/table";
import { Customer } from "@/lib/types/customer-types";
import { CustomersTableHeader } from "./table/TableHeader";
import { CustomersList } from "./table/CustomersList";
import { useFormatters } from "./hooks/useFormatters";

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
  const { formatCurrency } = useFormatters();

  return (
    <Table>
      <CustomersTableHeader />
      <CustomersList 
        customers={customers}
        searchQuery={searchQuery}
        onEditCustomer={onEditCustomer}
        onDeleteCustomer={onDeleteCustomer}
        onViewLicenses={onViewLicenses}
        formatCurrency={formatCurrency}
      />
    </Table>
  );
}
