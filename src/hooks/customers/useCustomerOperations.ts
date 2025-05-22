
import { Customer } from "@/lib/types/customer-types";
import { CustomerFormValues } from "@/components/customers/forms/CustomerForm";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function useCustomerOperations(
  customers: Customer[], 
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>
) {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isCustomerDialogOpen, setIsCustomerDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { toast } = useToast();

  // Handle editing a customer
  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsEditMode(true);
    setIsCustomerDialogOpen(true);
  };

  // Handle deleting a customer
  const handleDeleteCustomer = async (id: string) => {
    try {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      setCustomers(customers.filter(customer => customer.id !== id));
      
      toast({
        title: "Success",
        description: "Customer deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting customer:", error);
      toast({
        title: "Error",
        description: "Failed to delete customer",
        variant: "destructive"
      });
    }
  };

  // Handle adding a new customer
  const handleAddNewCustomer = () => {
    setIsEditMode(false);
    setSelectedCustomer(null);
    setIsCustomerDialogOpen(true);
  };

  // Handle saving a customer
  const handleSaveCustomer = async (formData: CustomerFormValues) => {
    try {
      // Convert to database format
      const customerData = {
        name: formData.name,
        company: formData.company || "",
        email: formData.email || "",
        phone: formData.phone || "",
        country: formData.country || "",
        status: formData.status || 'active',
        registration_date: formData.registrationDate || null,
        total_spent: formData.totalSpent || 0
      };
      
      if (isEditMode && selectedCustomer) {
        // Update
        const { error } = await supabase
          .from('customers')
          .update(customerData)
          .eq('id', selectedCustomer.id);
          
        if (error) {
          throw error;
        }
        
        // Update local state
        setCustomers(customers.map(customer => 
          customer.id === selectedCustomer.id 
            ? { 
                ...customer, 
                name: formData.name,
                company: formData.company || "",
                email: formData.email || "",
                phone: formData.phone || "",
                country: formData.country || "",
                status: formData.status || 'active',
                registrationDate: formData.registrationDate || "",
                totalSpent: formData.totalSpent || 0
              }
            : customer
        ));
        
        toast({
          title: "Success",
          description: "Customer updated successfully",
        });
      } else {
        // Insert
        const { data, error } = await supabase
          .from('customers')
          .insert(customerData)
          .select();
          
        if (error) {
          throw error;
        }
        
        if (data && data.length > 0) {
          const newCustomer: Customer = {
            id: data[0].id,
            name: data[0].name,
            company: data[0].company || "",
            email: data[0].email || "",
            phone: data[0].phone || "",
            country: data[0].country || "",
            registrationDate: data[0].registration_date 
              ? new Date(data[0].registration_date).toISOString().split('T')[0]
              : "",
            licenses: [],
            totalSpent: Number(data[0].total_spent) || 0,
            status: data[0].status as "active" | "inactive"
          };
          
          setCustomers([newCustomer, ...customers]);
          
          toast({
            title: "Success",
            description: "Customer added successfully",
          });
        }
      }
      
      setIsCustomerDialogOpen(false);
    } catch (error) {
      console.error("Error saving customer:", error);
      toast({
        title: "Error",
        description: "Failed to save customer",
        variant: "destructive"
      });
    }
  };

  return {
    selectedCustomer,
    setSelectedCustomer,
    isCustomerDialogOpen,
    setIsCustomerDialogOpen,
    isEditMode,
    handleEditCustomer,
    handleDeleteCustomer,
    handleAddNewCustomer,
    handleSaveCustomer
  };
}
