
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface PartInfo {
  id: string;
  name: string;
  installedDate: string;
  supplier: string;
  warrantyEnd: string;
  vehicleId: string;
  vehicleModel: string;
}

const vehicleParts: PartInfo[] = [
  {
    id: "P001",
    name: "Brake Pads | Bremsbeläge",
    installedDate: "2024-03-15",
    supplier: "BrakeTech Co. | BrakeTech GmbH",
    warrantyEnd: "2025-03-15",
    vehicleId: "B-FR-123",
    vehicleModel: "Tesla Model Y"
  },
  {
    id: "P002",
    name: "Air Filter | Luftfilter",
    installedDate: "2024-02-20",
    supplier: "FilterPro | FilterPro GmbH",
    warrantyEnd: "2025-02-20",
    vehicleId: "B-FR-234",
    vehicleModel: "VW ID.4"
  },
  {
    id: "P003",
    name: "Battery | Batterie",
    installedDate: "2024-01-10",
    supplier: "PowerCell | PowerCell GmbH",
    warrantyEnd: "2026-01-10",
    vehicleId: "B-FR-345",
    vehicleModel: "Audi e-tron"
  },
];

export function VehicleParts() {
  const [isAddPartOpen, setIsAddPartOpen] = useState(false);
  const [newPart, setNewPart] = useState<Partial<PartInfo>>({
    id: `P00${vehicleParts.length + 1}`,
    installedDate: new Date().toISOString().split('T')[0],
  });
  const { toast } = useToast();
  const [parts, setParts] = useState<PartInfo[]>(vehicleParts);
  const { language } = useLanguage();

  const handleAddPart = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPart.name || !newPart.supplier || !newPart.vehicleId || !newPart.vehicleModel || !newPart.warrantyEnd) {
      toast({
        title: language === 'de' ? "Fehlende Felder" : "Missing fields",
        description: language === 'de' ? "Bitte füllen Sie alle erforderlichen Felder aus" : "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }

    const partToAdd = {
      ...newPart,
      id: `P00${parts.length + 1}`,
      installedDate: newPart.installedDate || new Date().toISOString().split('T')[0],
    } as PartInfo;

    setParts([partToAdd, ...parts]);
    setIsAddPartOpen(false);
    setNewPart({
      id: `P00${parts.length + 2}`,
      installedDate: new Date().toISOString().split('T')[0],
    });
    
    toast({
      title: language === 'de' ? "Teil erfolgreich hinzugefügt" : "Part added successfully",
      description: language === 'de' ? 
        `${partToAdd.name} wurde hinzugefügt` : 
        `${partToAdd.name} has been added`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          <h2 className="text-lg font-semibold">
            {language === 'de' ? "Ersatzteile" : "Replacement Parts"}
          </h2>
        </div>
        <Button 
          onClick={() => setIsAddPartOpen(true)} 
          className="flex items-center gap-1 bg-fleet-500"
        >
          <Plus size={16} />
          {language === 'de' ? "Teil hinzufügen" : "Add Part"}
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{language === 'de' ? "Fahrzeug-ID" : "Vehicle ID"}</TableHead>
                <TableHead>{language === 'de' ? "Fahrzeugmodell" : "Vehicle Model"}</TableHead>
                <TableHead>{language === 'de' ? "Teilname" : "Part Name"}</TableHead>
                <TableHead>{language === 'de' ? "Installationsdatum" : "Installation Date"}</TableHead>
                <TableHead>{language === 'de' ? "Lieferant" : "Supplier"}</TableHead>
                <TableHead>{language === 'de' ? "Garantie bis" : "Warranty Until"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parts.map((part) => (
                <TableRow key={part.id}>
                  <TableCell>{part.vehicleId}</TableCell>
                  <TableCell>{part.vehicleModel}</TableCell>
                  <TableCell>{part.name}</TableCell>
                  <TableCell>{part.installedDate}</TableCell>
                  <TableCell>{part.supplier}</TableCell>
                  <TableCell>{part.warrantyEnd}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isAddPartOpen} onOpenChange={setIsAddPartOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{language === 'de' ? "Neues Teil hinzufügen" : "Add New Part"}</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleAddPart} className="space-y-4">
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
                onClick={() => setIsAddPartOpen(false)}
              >
                {language === 'de' ? "Abbrechen" : "Cancel"}
              </Button>
              <Button type="submit" className="bg-fleet-500">
                {language === 'de' ? "Teil hinzufügen" : "Add Part"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
