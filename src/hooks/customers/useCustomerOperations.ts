import { Customer } from "@/lib/types/customer-types";
import { CustomerFormValues } from "@/components/customers/forms/CustomerForm";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useOptimistic } from "@/components/shared/OptimisticState";
import { useLoadingState } from "@/hooks/useLoadingState";

export function useCustomerOperations(
  customers: Customer[], 
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>
) {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isCustomerDialogOpen, setIsCustomerDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { toast } = useToast();
  
  const optimisticCustomers = useOptimistic(customers, {
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const { isLoading, executeAsync } = useLoadingState({
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Handle editing a customer
  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsEditMode(true);
    setIsCustomerDialogOpen(true);
  };

  // Handle deleting a customer with optimistic updates
  const handleDeleteCustomer = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) {
      return;
    }

    const optimisticData = customers.filter(customer => customer.id !== id);
    
    optimisticCustomers.updateOptimistic(
      optimisticData,
      async () => {
        const { error } = await supabase
          .from('customers')
          .delete()
          .eq('id', id);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Customer deleted successfully",
        });
        
        return optimisticData;
      }
    );
    
    setCustomers(optimisticData);
  };

  // Handle adding a new customer
  const handleAddNewCustomer = () => {
    setIsEditMode(false);
    setSelectedCustomer(null);
    setIsCustomerDialogOpen(true);
  };

  // Handle saving a customer with loading state
  const handleSaveCustomer = async (formData: CustomerFormValues) => {
    await executeAsync(async () => {
      // Convert to database format
      const customerData = {
        name: formData.name,
        company: formData.company || "",
        email: formData.email || "",
        phone: formData.phone || "",
        country: formData.country || "",
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
                // Keep existing values for these properties
                status: customer.status,
                registrationDate: customer.registrationDate,
                totalSpent: customer.totalSpent
              }
            : customer
        ));
        
        toast({
          title: "Success",
          description: "Customer updated successfully",
        });
      } else {
        // Insert - we need to provide default values for the fields not in the form
        const dbData = {
          ...customerData,
          status: 'active',
          registration_date: new Date().toISOString().split('T')[0],
          total_spent: 0
        };

        const { data, error } = await supabase
          .from('customers')
          .insert(dbData)
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
    });
  };

  return {
    selectedCustomer,
    setSelectedCustomer,
    isCustomerDialogOpen,
    setIsCustomerDialogOpen,
    isEditMode,
    isLoading,
    optimisticState: optimisticCustomers,
    handleEditCustomer,
    handleDeleteCustomer,
    handleAddNewCustomer,
    handleSaveCustomer
  };
}
