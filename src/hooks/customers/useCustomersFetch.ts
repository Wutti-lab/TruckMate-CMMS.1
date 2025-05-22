
import { useState, useEffect } from "react";
import { Customer } from "@/lib/types/customer-types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useCustomersFetch() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  return {
    customers,
    setCustomers,
    isLoading
  };
}
