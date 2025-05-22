
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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
    isEditMode,
    
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Customers</h1>
          <Button 
            className="bg-fleet-500"
            onClick={handleAddNewCustomer}
          >
            <Plus className="mr-2" size={16} />
            Add New Customer
          </Button>
        </div>

        <CustomersHeader 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
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
        isEditMode={isEditMode}
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
