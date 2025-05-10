
import { useCustomerData } from "./customers/useCustomerData";
import { useCustomerActions } from "./customers/useCustomerActions";

export function useCustomers() {
  const {
    searchQuery,
    setSearchQuery,
    customers,
    setCustomers
  } = useCustomerData();

  const {
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
  } = useCustomerActions();

  return {
    // Data state
    searchQuery,
    setSearchQuery,
    customers,
    
    // Dialog state
    selectedCustomer,
    isLicensesDialogOpen,
    setIsLicensesDialogOpen,
    isCustomerDialogOpen,
    setIsCustomerDialogOpen,
    isEditMode,
    
    // Action handlers
    handleEditCustomer,
    handleDeleteCustomer: (id: string) => handleDeleteCustomer(id, customers, setCustomers),
    handleViewLicenses,
    handleAddNewCustomer,
    handleSaveCustomer: (formData: any) => handleSaveCustomer(
      formData, 
      isEditMode, 
      selectedCustomer, 
      customers, 
      setCustomers
    ),
    handleAddLicense
  };
}
