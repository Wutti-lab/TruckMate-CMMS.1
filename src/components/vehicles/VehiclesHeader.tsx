
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface VehiclesHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onAddNewVehicle: () => void;
}

export function VehiclesHeader({ 
  searchQuery, 
  onSearchChange, 
  onAddNewVehicle 
}: VehiclesHeaderProps) {
  const { language } = useLanguage();
  
  // Get translated text based on language
  const getHeaderText = () => {
    return language === 'de' 
      ? "Fahrzeuge Verwalten" 
      : language === 'th' 
        ? "จัดการยานพาหนะ" 
        : "Manage Vehicles";
  };

  const getSearchPlaceholder = () => {
    return language === 'de' 
      ? "Nach Kennzeichen oder Modell suchen" 
      : language === 'th' 
        ? "ค้นหาตามป้ายทะเบียนหรือรุ่น" 
        : "Search by license plate or model";
  };

  const getAddButtonText = () => {
    return language === 'de' 
      ? "Fahrzeug hinzufügen" 
      : language === 'th' 
        ? "เพิ่มยานพาหนะ" 
        : "Add Vehicle";
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <h1 className="text-2xl font-bold">{getHeaderText()}</h1>
      <div className="flex w-full md:w-auto flex-col md:flex-row gap-4">
        <Input
          placeholder={getSearchPlaceholder()}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full md:w-80"
        />
        <Button onClick={onAddNewVehicle} className="gap-2">
          <PlusCircle className="h-4 w-4" />
          {getAddButtonText()}
        </Button>
      </div>
    </div>
  );
}
