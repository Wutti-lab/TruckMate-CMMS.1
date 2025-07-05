
import { useState } from "react";
import { Customer, SoftwareLicense } from "@/lib/types/customer-types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useLicenseOperations(
  customers: Customer[], 
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>,
  selectedCustomer: Customer | null, 
  setSelectedCustomer: React.Dispatch<React.SetStateAction<Customer | null>>
) {
  const [isLicensesDialogOpen, setIsLicensesDialogOpen] = useState(false);
  const { toast } = useToast();

  // Handle viewing licenses
  const handleViewLicenses = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsLicensesDialogOpen(true);
  };

  // Handle adding a license
  const handleAddLicense = async (license: any) => {
    if (!selectedCustomer) return;
    
    try {
      // Convert to database format
      const licenseData = {
        customer_id: selectedCustomer.id,
        license_number: license.licenseKey,
        license_type: license.productName,
        issue_date: license.purchaseDate || null,
        expiry_date: license.expiryDate || null,
        status: license.status
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
        // Update total spent (using price from license input, not database)
        const licensePrice = Number(license.price) || 0;
        const newTotalSpent = selectedCustomer.totalSpent + licensePrice;
        
        await supabase
          .from('customers')
          .update({ total_spent: newTotalSpent })
          .eq('id', selectedCustomer.id);
        
        // Update local state
        const newLicense = {
          id: data[0].id,
          productName: data[0].license_type || 'Unknown',
          licenseKey: data[0].license_number,
          purchaseDate: data[0].issue_date 
            ? new Date(data[0].issue_date).toISOString().split('T')[0]
            : "",
          expiryDate: data[0].expiry_date 
            ? new Date(data[0].expiry_date).toISOString().split('T')[0]
            : "",
          status: data[0].status as "active" | "expired" | "revoked",
          price: 0, // Not stored in current schema
          role: undefined // Not stored in current schema
        };
        
        setCustomers(customers.map(customer => {
          if (customer.id === selectedCustomer.id) {
            return {
              ...customer,
              licenses: [...customer.licenses, { ...newLicense, price: licensePrice }],
              totalSpent: newTotalSpent
            };
          }
          return customer;
        }));
        
        // Update selected customer
        setSelectedCustomer({
          ...selectedCustomer,
          licenses: [...selectedCustomer.licenses, { ...newLicense, price: licensePrice }],
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
    isLicensesDialogOpen,
    setIsLicensesDialogOpen,
    handleViewLicenses,
    handleAddLicense
  };
}
