
import { TableBody } from "@/components/ui/table";
import { Customer } from "@/lib/types/customer-types";
import { CustomerRow } from "./CustomerRow";
import { EmptyState } from "./EmptyState";

interface CustomersListProps {
  customers: Customer[];
  searchQuery: string;
  onEditCustomer: (customer: Customer) => void;
  onDeleteCustomer: (id: string) => void;
  onViewLicenses: (customer: Customer) => void;
  formatCurrency: (amount: number) => string;
}

export function CustomersList({
  customers,
  searchQuery,
  onEditCustomer,
  onDeleteCustomer,
  onViewLicenses,
  formatCurrency
}: CustomersListProps) {
  // Filter customers based on search query
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <TableBody>
      {filteredCustomers.length > 0 ? (
        filteredCustomers.map((customer) => (
          <CustomerRow
            key={customer.id}
            customer={customer}
            onEditCustomer={onEditCustomer}
            onDeleteCustomer={onDeleteCustomer}
            onViewLicenses={onViewLicenses}
            formatCurrency={formatCurrency}
          />
        ))
      ) : (
        <EmptyState />
      )}
    </TableBody>
  );
}
