
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Filter, Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CustomersHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddNewCustomer: () => void;
}

export function CustomersHeader({ 
  searchQuery, 
  onSearchChange, 
  onAddNewCustomer 
}: CustomersHeaderProps) {
  const { language } = useLanguage();

  return (
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
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter size={16} />
        </Button>
        <Button 
          onClick={onAddNewCustomer}
          className="bg-fleet-500"
        >
          <Plus size={16} className="mr-2" />
          {language === 'de' ? 'Neuer Kunde' : 'New Customer'}
        </Button>
      </div>
    </div>
  );
}
