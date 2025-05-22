
import { useState } from "react";
import { useCustomersFetch } from "./customers/useCustomersFetch";
import { useCustomerOperations } from "./customers/useCustomerOperations";
import { useLicenseOperations } from "./customers/useLicenseOperations";

export function useCustomers() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Compose hooks
  const { customers, setCustomers, isLoading } = useCustomersFetch();
  
  const {
    selectedCustomer,
    setSelectedCustomer,
    isCustomerDialogOpen,
    setIsCustomerDialogOpen,
    isEditMode,
    handleEditCustomer,
    handleDeleteCustomer,
    handleAddNewCustomer,
    handleSaveCustomer
  } = useCustomerOperations(customers, setCustomers);

  const {
    isLicensesDialogOpen,
    setIsLicensesDialogOpen,
    handleViewLicenses,
    handleAddLicense
  } = useLicenseOperations(customers, setCustomers, selectedCustomer, setSelectedCustomer);

  return {
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
  };
}
