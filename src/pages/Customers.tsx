
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomersTable } from "@/components/customers/CustomersTable";
import { CustomerLicensesDialog } from "@/components/customers/CustomerLicensesDialog";
import { CustomerDialog } from "@/components/customers/CustomerDialog";
import { CustomersHeader } from "@/components/customers/CustomersHeader";
import { useCustomers } from "@/hooks/useCustomers";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Customers() {
  const { language } = useLanguage();
  const { 
    searchQuery,
    setSearchQuery,
    customers,
    selectedCustomer,
    isLicensesDialogOpen,
    setIsLicensesDialogOpen,
    isCustomerDialogOpen,
    setIsCustomerDialogOpen,
    isEditMode,
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
        <CustomersHeader 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddNewCustomer={handleAddNewCustomer}
        />

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'de' ? 'Softwarekunden' : 'Software Customers'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <CustomersTable 
              customers={customers}
              searchQuery={searchQuery}
              onEditCustomer={handleEditCustomer}
              onDeleteCustomer={handleDeleteCustomer}
              onViewLicenses={handleViewLicenses}
            />
          </CardContent>
        </Card>
      </main>

      {/* Customer Licenses Dialog */}
      <CustomerLicensesDialog 
        customer={selectedCustomer}
        open={isLicensesDialogOpen}
        onOpenChange={setIsLicensesDialogOpen}
        onAddLicense={handleAddLicense}
      />

      {/* Add/Edit Customer Dialog */}
      <CustomerDialog 
        customer={isEditMode ? selectedCustomer : null}
        open={isCustomerDialogOpen}
        onOpenChange={setIsCustomerDialogOpen}
        onSave={handleSaveCustomer}
      />
    </div>
  );
}
