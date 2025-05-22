
import { useState, useEffect } from "react";
import { Customer } from "@/lib/types/customer-types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useCustomers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isLicensesDialogOpen, setIsLicensesDialogOpen] = useState(false);
  const [isCustomerDialogOpen, setIsCustomerDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { toast } = useToast();

  // Fetch customers from Supabase
  useEffect(() => {
    async function fetchCustomers() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('customers')
          .select(`
            *,
            licenses(*)
          `);
        
        if (error) {
          throw error;
        }
        
        if (data) {
          // Transform data to match Customer interface
          const transformedCustomers: Customer[] = data.map(customer => ({
            id: customer.id,
            name: customer.name,
            company: customer.company || "",
            email: customer.email || "",
            phone: customer.phone || "",
            country: customer.country || "",
            registrationDate: customer.registration_date 
              ? new Date(customer.registration_date).toISOString().split('T')[0] 
              : "",
            licenses: customer.licenses ? customer.licenses.map(license => ({
              id: license.id,
              productName: license.product_name,
              licenseKey: license.license_key,
              purchaseDate: license.purchase_date 
                ? new Date(license.purchase_date).toISOString().split('T')[0]
                : "",
              expiryDate: license.expiry_date 
                ? new Date(license.expiry_date).toISOString().split('T')[0]
                : "",
              status: license.status as "active" | "expired" | "revoked",
              price: license.price,
              role: license.role
            })) : [],
            totalSpent: Number(customer.total_spent) || 0,
            status: customer.status as "active" | "inactive"
          }));
          
          setCustomers(transformedCustomers);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
        toast({
          title: "Error",
          description: "Failed to load customers",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchCustomers();
  }, [toast]);

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

  // Handle viewing licenses
  const handleViewLicenses = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsLicensesDialogOpen(true);
  };

  // Handle adding a new customer
  const handleAddNewCustomer = () => {
    setIsEditMode(false);
    setSelectedCustomer(null);
    setIsCustomerDialogOpen(true);
  };

  // Handle saving a customer
  const handleSaveCustomer = async (formData: any) => {
    try {
      // Convert to database format
      const customerData = {
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        status: formData.status,
        registration_date: formData.registrationDate ? new Date(formData.registrationDate) : null,
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
            ? { ...customer, ...formData }
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

  // Handle adding a license
  const handleAddLicense = async (license: any) => {
    if (!selectedCustomer) return;
    
    try {
      // Convert to database format
      const licenseData = {
        customer_id: selectedCustomer.id,
        product_name: license.productName,
        license_key: license.licenseKey,
        purchase_date: license.purchaseDate ? new Date(license.purchaseDate) : null,
        expiry_date: license.expiryDate ? new Date(license.expiryDate) : null,
        status: license.status,
        price: license.price,
        role: license.role
      };
      
      // Insert into database
      const { data, error } = await supabase
        .from('licenses')
        .insert(licenseData)
        .select();
        
      if (error) {
        throw error;
      }
      
      if (data && data.length > 0) {
        // Update total spent
        const newTotalSpent = selectedCustomer.totalSpent + Number(license.price);
        
        await supabase
          .from('customers')
          .update({ total_spent: newTotalSpent })
          .eq('id', selectedCustomer.id);
        
        // Update local state
        const newLicense = {
          id: data[0].id,
          productName: data[0].product_name,
          licenseKey: data[0].license_key,
          purchaseDate: data[0].purchase_date 
            ? new Date(data[0].purchase_date).toISOString().split('T')[0]
            : "",
          expiryDate: data[0].expiry_date 
            ? new Date(data[0].expiry_date).toISOString().split('T')[0]
            : "",
          status: data[0].status as "active" | "expired" | "revoked",
          price: data[0].price,
          role: data[0].role
        };
        
        setCustomers(customers.map(customer => {
          if (customer.id === selectedCustomer.id) {
            return {
              ...customer,
              licenses: [...customer.licenses, newLicense],
              totalSpent: newTotalSpent
            };
          }
          return customer;
        }));
        
        // Update selected customer
        setSelectedCustomer({
          ...selectedCustomer,
          licenses: [...selectedCustomer.licenses, newLicense],
          totalSpent: newTotalSpent
        });
        
        toast({
          title: "Success",
          description: "License added successfully",
        });
      }
    } catch (error) {
      console.error("Error adding license:", error);
      toast({
        title: "Error",
        description: "Failed to add license",
        variant: "destructive"
      });
    }
  };

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
