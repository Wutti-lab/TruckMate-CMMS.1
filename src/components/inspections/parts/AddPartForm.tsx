
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PartInfo } from "../models/PartInfo";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface AddPartFormProps {
  onAddPart: (part: PartInfo) => void;
  onCancel: () => void;
  nextPartId: string;
}

export function AddPartForm({ onAddPart, onCancel, nextPartId }: AddPartFormProps) {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [newPart, setNewPart] = useState<Partial<PartInfo>>({
    id: nextPartId,
    installedDate: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPart.name || !newPart.supplier || !newPart.vehicleId || !newPart.vehicleModel || !newPart.warrantyEnd) {
      toast({
        title: language === 'de' ? "Fehlende Felder" : "Missing fields",
        description: language === 'de' ? "Bitte füllen Sie alle erforderlichen Felder aus" : "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }

    onAddPart(newPart as PartInfo);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="vehicleId" className="text-sm font-medium">
            {language === 'de' ? "Fahrzeug-ID *" : "Vehicle ID *"}
          </label>
          <input
            id="vehicleId"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            value={newPart.vehicleId || ''}
            onChange={(e) => setNewPart({...newPart, vehicleId: e.target.value})}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="vehicleModel" className="text-sm font-medium">
            {language === 'de' ? "Fahrzeugmodell *" : "Vehicle Model *"}
          </label>
          <input
            id="vehicleModel"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            value={newPart.vehicleModel || ''}
            onChange={(e) => setNewPart({...newPart, vehicleModel: e.target.value})}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          {language === 'de' ? "Teilname *" : "Part Name *"}
        </label>
        <input
          id="name"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          value={newPart.name || ''}
          onChange={(e) => setNewPart({...newPart, name: e.target.value})}
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="supplier" className="text-sm font-medium">
          {language === 'de' ? "Lieferant *" : "Supplier *"}
        </label>
        <input
          id="supplier"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          value={newPart.supplier || ''}
          onChange={(e) => setNewPart({...newPart, supplier: e.target.value})}
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="installedDate" className="text-sm font-medium">
            {language === 'de' ? "Installationsdatum *" : "Installation Date *"}
          </label>
          <input
            id="installedDate"
            type="date"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            value={newPart.installedDate || ''}
            onChange={(e) => setNewPart({...newPart, installedDate: e.target.value})}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="warrantyEnd" className="text-sm font-medium">
            {language === 'de' ? "Garantie bis *" : "Warranty Until *"}
          </label>
          <input
            id="warrantyEnd"
            type="date"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            value={newPart.warrantyEnd || ''}
            onChange={(e) => setNewPart({...newPart, warrantyEnd: e.target.value})}
            required
          />
        </div>
      </div>
      
      <div className="flex justify-end gap-2 pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
        >
          {language === 'de' ? "Abbrechen" : "Cancel"}
        </Button>
        <Button type="submit" className="bg-fleet-500">
          {language === 'de' ? "Teil hinzufügen" : "Add Part"}
        </Button>
      </div>
    </form>
  );
}
