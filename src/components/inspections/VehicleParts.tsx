
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { PartInfo, initialVehicleParts } from "./models/PartInfo";
import { PartsTable } from "./parts/PartsTable";
import { AddPartDialog } from "./parts/AddPartDialog";

export function VehicleParts() {
  const [isAddPartOpen, setIsAddPartOpen] = useState(false);
  const { toast } = useToast();
  const [parts, setParts] = useState<PartInfo[]>(initialVehicleParts);
  const { language } = useLanguage();

  const handleAddPart = (newPart: PartInfo) => {
    setParts([newPart, ...parts]);
    
    toast({
      title: language === 'de' ? "Teil erfolgreich hinzugefügt" : "Part added successfully",
      description: language === 'de' ? 
        `${newPart.name} wurde hinzugefügt` : 
        `${newPart.name} has been added`,
    });
  };

  const getNextPartId = () => {
    return `P00${parts.length + 1}`;
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
          <PartsTable parts={parts} />
        </CardContent>
      </Card>

      <AddPartDialog 
        isOpen={isAddPartOpen}
        onOpenChange={setIsAddPartOpen}
        onAddPart={handleAddPart}
        nextPartId={getNextPartId()}
      />
    </div>
  );
}
