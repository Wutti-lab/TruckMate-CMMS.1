import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronDown, 
  Trash2, 
  Edit3, 
  MapPin, 
  Wrench, 
  FileDown,
  QrCode,
  CheckSquare
} from "lucide-react";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface VehicleBulkActionsProps {
  selectedVehicles: string[];
  onSelectAll: (selected: boolean) => void;
  onBulkDelete: (vehicleIds: string[]) => void;
  onBulkStatusChange: (vehicleIds: string[], status: string) => void;
  onBulkExport: (vehicleIds: string[]) => void;
  totalVehicles: number;
}

export function VehicleBulkActions({
  selectedVehicles,
  onSelectAll,
  onBulkDelete,
  onBulkStatusChange,
  onBulkExport,
  totalVehicles
}: VehicleBulkActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { language } = useLanguage();
  const { toast } = useToast();

  const handleSelectAll = (checked: boolean) => {
    onSelectAll(checked);
  };

  const handleBulkStatusChange = (status: string) => {
    onBulkStatusChange(selectedVehicles, status);
    toast({
      title: extractLanguageText("Status Updated | Status aktualisiert", language),
      description: extractLanguageText(
        `Updated ${selectedVehicles.length} vehicles | ${selectedVehicles.length} Fahrzeuge aktualisiert`,
        language
      )
    });
  };

  const handleBulkDelete = () => {
    onBulkDelete(selectedVehicles);
    setShowDeleteDialog(false);
    toast({
      title: extractLanguageText("Vehicles Deleted | Fahrzeuge gelöscht", language),
      description: extractLanguageText(
        `Deleted ${selectedVehicles.length} vehicles | ${selectedVehicles.length} Fahrzeuge gelöscht`,
        language
      )
    });
  };

  const handleBulkExport = () => {
    onBulkExport(selectedVehicles);
    toast({
      title: extractLanguageText("Export Started | Export gestartet", language),
      description: extractLanguageText(
        `Exporting ${selectedVehicles.length} vehicles | Exportiere ${selectedVehicles.length} Fahrzeuge`,
        language
      )
    });
  };

  if (selectedVehicles.length === 0) {
    return (
      <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
        <Checkbox
          checked={false}
          onCheckedChange={handleSelectAll}
          aria-label={extractLanguageText("Select all vehicles", "Alle Fahrzeuge auswählen")}
        />
        <span className="text-sm text-muted-foreground">
          {extractLanguageText("Select vehicles for bulk actions | Fahrzeuge für Massenaktionen auswählen", language)}
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between p-3 bg-primary/10 rounded-md border border-primary/20">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={selectedVehicles.length === totalVehicles}
            indeterminate={selectedVehicles.length > 0 && selectedVehicles.length < totalVehicles}
            onCheckedChange={handleSelectAll}
            aria-label={extractLanguageText("Toggle all vehicles selection", "Alle Fahrzeuge auswählen/abwählen")}
          />
          <Badge variant="secondary" className="gap-1">
            <CheckSquare className="h-3 w-3" />
            {selectedVehicles.length} {extractLanguageText("selected", "ausgewählt")}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          {/* Status Change Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Wrench className="h-4 w-4" />
                {extractLanguageText("Change Status", "Status ändern")}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleBulkStatusChange("active")}>
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                {extractLanguageText("Set Active", "Auf Aktiv setzen")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleBulkStatusChange("maintenance")}>
                <div className="w-2 h-2 rounded-full bg-amber-500 mr-2" />
                {extractLanguageText("Set Maintenance", "Auf Wartung setzen")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleBulkStatusChange("inactive")}>
                <div className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                {extractLanguageText("Set Inactive", "Auf Inaktiv setzen")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Actions Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Edit3 className="h-4 w-4" />
                {extractLanguageText("Actions", "Aktionen")}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleBulkExport}>
                <FileDown className="h-4 w-4 mr-2" />
                {extractLanguageText("Export Selected", "Ausgewählte exportieren")}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <QrCode className="h-4 w-4 mr-2" />
                {extractLanguageText("Generate QR Codes", "QR-Codes generieren")}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MapPin className="h-4 w-4 mr-2" />
                {extractLanguageText("View on Map", "Auf Karte anzeigen")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => setShowDeleteDialog(true)}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {extractLanguageText("Delete Selected", "Ausgewählte löschen")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {extractLanguageText("Delete Vehicles", "Fahrzeuge löschen")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {extractLanguageText(
                `Are you sure you want to delete ${selectedVehicles.length} vehicles? This action cannot be undone.`,
                `Sind Sie sicher, dass Sie ${selectedVehicles.length} Fahrzeuge löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.`
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {extractLanguageText("Cancel", "Abbrechen")}
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleBulkDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              {extractLanguageText("Delete", "Löschen")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}