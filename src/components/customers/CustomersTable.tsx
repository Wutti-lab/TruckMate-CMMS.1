
import { Table, TableHeader, TableBody } from "@/components/ui/table";
import { Customer } from "@/lib/types/customer-types";
import { TableHeader as CustomerTableHeader } from "./table/TableHeader";
import { CustomersList } from "./table/CustomersList";
import { Card, CardContent } from "@/components/ui/card";

interface CustomersTableProps {
  customers: Customer[];
  isLoading: boolean;
  searchQuery: string;
  onEditCustomer: (customer: Customer) => void;
  onDeleteCustomer: (id: string) => void;
  onViewLicenses: (customer: Customer) => void;
}

export function CustomersTable({
  customers,
  isLoading,
  searchQuery,
  onEditCustomer,
  onDeleteCustomer,
  onViewLicenses
}: CustomersTableProps) {
  // Function to format currency based on locale
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fleet-500"></div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <CustomerTableHeader />
            </TableHeader>
            <CustomersList
              customers={customers}
              searchQuery={searchQuery}
              onEditCustomer={onEditCustomer}
              onDeleteCustomer={onDeleteCustomer}
              onViewLicenses={onViewLicenses}
              formatCurrency={formatCurrency}
            />
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
