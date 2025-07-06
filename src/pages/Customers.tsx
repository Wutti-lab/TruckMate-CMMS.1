
import { Header } from "@/components/layout/Header";
import { BackToDashboard } from "@/components/layout/BackToDashboard";
import { CustomersHeader } from "@/components/customers/CustomersHeader";
import { CustomersTable } from "@/components/customers/CustomersTable";
import { CustomerDialog } from "@/components/customers/CustomerDialog";
import { CustomerLicensesDialog } from "@/components/customers/CustomerLicensesDialog";
import { useCustomers } from "@/hooks/useCustomers";

export default function Customers() {
  const {
    // Data state
    searchQuery,
    setSearchQuery,
    customers,
    isLoading,
    
    // Dialog state
    selectedCustomer,
    isLicensesDialogOpen,
    setIsLicensesDialogOpen,
    isCustomerDialogOpen,
    setIsCustomerDialogOpen,
    
    // Action handlers
    handleEditCustomer,
    handleDeleteCustomer,
    handleViewLicenses,
    handleAddNewCustomer,
    handleSaveCustomer,
    handleAddLicense
  } = useCustomers();

  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 p-6 overflow-auto">
        <BackToDashboard />
        <CustomersHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddNewCustomer={handleAddNewCustomer}
        />

        <div className="mt-4">
          <CustomersTable
            customers={customers}
            isLoading={isLoading}
            searchQuery={searchQuery}
            onEditCustomer={handleEditCustomer}
            onDeleteCustomer={handleDeleteCustomer}
            onViewLicenses={handleViewLicenses}
          />
        </div>
      </main>
      
      <CustomerDialog 
        open={isCustomerDialogOpen} 
        onOpenChange={setIsCustomerDialogOpen} 
        customer={selectedCustomer}
        onSave={handleSaveCustomer}
      />
      
      <CustomerLicensesDialog 
        open={isLicensesDialogOpen} 
        onOpenChange={setIsLicensesDialogOpen} 
        customer={selectedCustomer}
        onAddLicense={handleAddLicense}
      />
    </div>
  );
}
