import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Filter, Search } from "lucide-react";
import { CustomersTable } from "@/components/customers/CustomersTable";
import { CustomerLicensesDialog } from "@/components/customers/CustomerLicensesDialog";
import { CustomerDialog } from "@/components/customers/CustomerDialog";
import { Customer, SoftwareLicense } from "@/lib/types/customer-types";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

export default function Customers() {
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

  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 p-6 overflow-auto">
        <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
          <h1 className="text-2xl font-bold">
            {language === 'de' ? 'Kundenverwaltung' : 'Customer Management'}
          </h1>
          <div className="flex items-center gap-2">
            <div className="relative hidden lg:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={language === 'de' ? 'Kunden suchen...' : 'Search customers...'}
                className="pl-8 w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter size={16} />
            </Button>
            <Button 
              onClick={handleAddNewCustomer}
              className="bg-fleet-500"
            >
              <Plus size={16} className="mr-2" />
              {language === 'de' ? 'Neuer Kunde' : 'New Customer'}
            </Button>
          </div>
        </div>

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
