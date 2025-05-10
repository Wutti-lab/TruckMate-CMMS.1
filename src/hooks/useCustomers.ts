
import { useState, useEffect } from "react";
import { Customer, SoftwareLicense } from "@/lib/types/customer-types";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

export function useCustomers() {
  const { toast } = useToast();
  const { language } = useLanguage();
  const { pendingUsers } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isLicensesDialogOpen, setIsLicensesDialogOpen] = useState(false);
  const [isCustomerDialogOpen, setIsCustomerDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Initialize with mock data and add pending users as customers
  useEffect(() => {
    // Start with mock customer data
    const mockCustomers: Customer[] = [
      {
        id: "1",
        name: "Max Mustermann",
        company: "Autohaus Schmidt GmbH",
        email: "max@schmidt-auto.de",
        phone: "+49 123 456789",
        country: "Deutschland",
        registrationDate: "2024-01-12",
        licenses: [
          {
            id: "l1",
            productName: "TruckMate CMMS Pro",
            licenseKey: "TRUCK-PRO-1234-ABCD",
            purchaseDate: "2024-01-15",
            expiryDate: "2025-01-15",
            status: "active",
            price: 2499.99
          },
          {
            id: "l2",
            productName: "FleetTracker Plus",
            licenseKey: "FLEET-PLS-5678-EFGH",
            purchaseDate: "2023-11-20",
            expiryDate: "2024-11-20",
            status: "active",
            price: 1299.50
          }
        ],
        totalSpent: 3799.49,
        status: "active"
      },
      {
        id: "2",
        name: "Julia Weber",
        company: "Weber Logistics AG",
        email: "j.weber@weber-logistics.com",
        phone: "+49 987 654321",
        country: "Österreich",
        registrationDate: "2023-09-05",
        licenses: [
          {
            id: "l3",
            productName: "TruckMate CMMS Basic",
            licenseKey: "TRUCK-BSC-9012-IJKL",
            purchaseDate: "2023-09-07",
            expiryDate: "2023-12-07",
            status: "expired",
            price: 899.99
          }
        ],
        totalSpent: 899.99,
        status: "inactive"
      }
    ];

    // Add paid pending users as customers
    const paidPendingUsers = pendingUsers
      .filter(user => user.paymentStatus === 'paid')
      .map(user => {
        // Convert PendingUser to Customer
        const customer: Customer = {
          id: user.id,
          name: user.name,
          company: user.name + " GmbH", // Default company name
          email: user.email,
          phone: "", // Empty as default
          country: "Deutschland", // Default country
          registrationDate: user.createdAt.split('T')[0],
          licenses: [
            {
              id: `auto-${user.id}`,
              productName: "TruckMate Standard Lizenz",
              licenseKey: `TRUCK-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
              purchaseDate: user.createdAt.split('T')[0],
              expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
              status: "active",
              price: 2000.00 // Standard price
            }
          ],
          totalSpent: 2000.00, // Standard price
          status: user.approvalStatus === 'approved' ? "active" : "inactive"
        };
        return customer;
      });

    // Combine mock customers with paid pending users
    setCustomers([...mockCustomers, ...paidPendingUsers]);
  }, [pendingUsers]);

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsEditMode(true);
    setIsCustomerDialogOpen(true);
  };

  const handleDeleteCustomer = (id: string) => {
    setCustomers(customers.filter(customer => customer.id !== id));
    toast({
      title: language === 'de' ? 'Kunde gelöscht' : 'Customer deleted',
      description: language === 'de' 
        ? 'Der Kunde wurde erfolgreich gelöscht' 
        : 'The customer has been successfully deleted',
    });
  };

  const handleViewLicenses = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsLicensesDialogOpen(true);
  };

  const handleAddNewCustomer = () => {
    setSelectedCustomer(null);
    setIsEditMode(false);
    setIsCustomerDialogOpen(true);
  };

  const handleSaveCustomer = (formData: any) => {
    if (isEditMode && selectedCustomer) {
      // Update existing customer
      const updatedCustomers = customers.map(customer => 
        customer.id === selectedCustomer.id
          ? { 
              ...customer,
              name: formData.name,
              company: formData.company,
              email: formData.email,
              phone: formData.phone,
              country: formData.country
            }
          : customer
      );
      setCustomers(updatedCustomers);
      
      toast({
        title: language === 'de' ? 'Kunde aktualisiert' : 'Customer updated',
        description: language === 'de'
          ? `Die Daten für ${formData.name} wurden aktualisiert`
          : `Information for ${formData.name} has been updated`,
      });
    } else {
      // Add new customer
      const newCustomer: Customer = {
        id: Date.now().toString(),
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        registrationDate: new Date().toISOString().split('T')[0],
        licenses: [],
        totalSpent: 0,
        status: 'active'
      };
      
      setCustomers([...customers, newCustomer]);
      
      toast({
        title: language === 'de' ? 'Kunde hinzugefügt' : 'Customer added',
        description: language === 'de'
          ? `${formData.name} wurde als neuer Kunde hinzugefügt`
          : `${formData.name} has been added as a new customer`,
      });
    }
  };

  const handleAddLicense = (customerId: string) => {
    toast({
      title: language === 'de' ? 'Lizenz hinzufügen' : 'Add License',
      description: language === 'de'
        ? 'Funktion zum Hinzufügen einer Lizenz wird implementiert'
        : 'License addition feature will be implemented',
    });
  };

  return {
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
  };
}
