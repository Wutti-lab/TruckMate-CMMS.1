
import { useState } from "react";
import { Customer, SoftwareLicense } from "@/lib/types/customer-types";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export function useCustomerActions() {
  const { toast } = useToast();
  const { language } = useLanguage();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isLicensesDialogOpen, setIsLicensesDialogOpen] = useState(false);
  const [isCustomerDialogOpen, setIsCustomerDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsEditMode(true);
    setIsCustomerDialogOpen(true);
  };

  const handleDeleteCustomer = (id: string, customers: Customer[], setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>) => {
    setCustomers(customers.filter(customer => customer.id !== id));
    toast({
      title: language === 'de' ? 'Kunde gelöscht' : 
             language === 'th' ? 'ลบลูกค้าแล้ว' :
             'Customer deleted',
      description: language === 'de' 
        ? 'Der Kunde wurde erfolgreich gelöscht' 
        : language === 'th'
        ? 'ลูกค้าถูกลบออกเรียบร้อยแล้ว'
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

  const handleSaveCustomer = (
    formData: any, 
    isEditMode: boolean, 
    selectedCustomer: Customer | null,
    customers: Customer[],
    setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>
  ) => {
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
        title: language === 'de' ? 'Kunde aktualisiert' : 
               language === 'th' ? 'อัปเดตลูกค้าแล้ว' :
               'Customer updated',
        description: language === 'de'
          ? `Die Daten für ${formData.name} wurden aktualisiert`
          : language === 'th'
          ? `ข้อมูลสำหรับ ${formData.name} ได้รับการอัปเดตแล้ว`
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
        title: language === 'de' ? 'Kunde hinzugefügt' : 
               language === 'th' ? 'เพิ่มลูกค้าแล้ว' :
               'Customer added',
        description: language === 'de'
          ? `${formData.name} wurde als neuer Kunde hinzugefügt`
          : language === 'th'
          ? `${formData.name} ได้ถูกเพิ่มเป็นลูกค้าใหม่แล้ว`
          : `${formData.name} has been added as a new customer`,
      });
    }
  };

  const handleAddLicense = (customerId: string) => {
    toast({
      title: language === 'de' ? 'Lizenz hinzufügen' : 
             language === 'th' ? 'เพิ่มใบอนุญาต' :
             'Add License',
      description: language === 'de'
        ? 'Funktion zum Hinzufügen einer Lizenz wird implementiert'
        : language === 'th'
        ? 'คุณสมบัติการเพิ่มใบอนุญาตจะถูกนำมาใช้'
        : 'License addition feature will be implemented',
    });
  };

  return {
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
