
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { History, FileText } from "lucide-react";
import { Vehicle } from "../types/Vehicle";
import { MaintenanceRecord } from "../types/Vehicle";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface VehicleHistoryDialogProps {
  vehicle: Vehicle;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VehicleHistoryDialog({ vehicle, open, onOpenChange }: VehicleHistoryDialogProps) {
  const { toast } = useToast();
  const { language } = useLanguage();
  
  // Mock maintenance history
  const maintenanceHistory: MaintenanceRecord[] = [
    { date: "15.03.2023", type: "Regular Service", cost: "12,500 ฿", notes: "Oil change, filter replacement" },
    { date: "22.09.2022", type: "Tire Replacement", cost: "24,800 ฿", notes: "Replaced all tires" },
    { date: "05.06.2022", type: "Battery Service", cost: "3,200 ฿", notes: "Battery check and cleaning" },
    { date: "12.03.2022", type: "Full Inspection", cost: "8,500 ฿", notes: "Annual inspection passed" },
    { date: "25.11.2021", type: "Brake Repair", cost: "15,300 ฿", notes: "Front brake pads replaced" },
  ];

  // Calculate totals
  const totalCosts = maintenanceHistory.reduce((sum, record) => {
    const costValue = parseInt(record.cost.replace(/[^\d]/g, ""));
    return sum + (isNaN(costValue) ? 0 : costValue);
  }, 0);
  
  const monthlyAverage = Math.round(totalCosts / 18); // Assuming 18 months period

  const exportReport = () => {
    try {
      // Create PDF document
      const doc = new jsPDF();
      
      // Add title
      const title = language === 'de' ? 'Fahrzeug-Wartungsbericht' : 'Vehicle Maintenance Report';
      doc.setFontSize(20);
      doc.text(title, 105, 15, { align: 'center' });
      
      // Add vehicle info
      doc.setFontSize(12);
      doc.text(`${language === 'de' ? 'Fahrzeug-ID:' : 'Vehicle ID:'} ${vehicle.id}`, 14, 30);
      doc.text(`${language === 'de' ? 'Modell:' : 'Model:'} ${vehicle.model}`, 14, 37);
      doc.text(`${language === 'de' ? 'Status:' : 'Status:'} ${vehicle.status}`, 14, 44);
      
      // Format date
      const today = new Date();
      const dateStr = today.toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US');
      doc.text(`${language === 'de' ? 'Datum:' : 'Date:'} ${dateStr}`, 14, 51);
      
      // Add maintenance table
      const tableColumn = language === 'de' 
        ? ['Datum', 'Serviceart', 'Kosten', 'Anmerkungen'] 
        : ['Date', 'Service Type', 'Cost', 'Notes'];
        
      const tableRows = maintenanceHistory.map(record => [
        record.date,
        record.type,
        record.cost,
        record.notes
      ]);
      
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 60,
        theme: 'striped',
        headStyles: { fillColor: [82, 96, 117] }
      });
      
      // Add summary at the end
      const finalY = (doc as any).lastAutoTable.finalY + 10;
      
      doc.text(
        `${language === 'de' ? 'Gesamtwartungskosten:' : 'Total maintenance costs:'} ${totalCosts.toLocaleString()} ฿`, 
        14, 
        finalY
      );
      
      doc.text(
        `${language === 'de' ? 'Durchschnittliche monatliche Kosten:' : 'Average monthly cost:'} ${monthlyAverage.toLocaleString()} ฿`, 
        14, 
        finalY + 7
      );
      
      // Add footer
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text("TruckMate CMMS - " + (language === 'de' ? 'Generiert am ' : 'Generated on ') + dateStr, 105, 285, { align: 'center' });
      
      // Save the PDF
      doc.save(`maintenance-report-${vehicle.id}.pdf`);
      
      // Show success toast
      toast({
        title: language === 'de' ? "Bericht exportiert" : "Report exported",
        description: language === 'de' 
          ? `Wartungsbericht für ${vehicle.id} wurde heruntergeladen` 
          : `Maintenance report for ${vehicle.id} has been downloaded`,
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      
      // Show error toast
      toast({
        title: language === 'de' ? "Export fehlgeschlagen" : "Export failed",
        description: language === 'de' 
          ? "Beim Exportieren des Berichts ist ein Fehler aufgetreten" 
          : "An error occurred while exporting the report",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History size={18} className="text-fleet-500" />
            Maintenance History | Wartungshistorie
            <Badge className="ml-2">{vehicle.id}</Badge>
          </DialogTitle>
          <DialogDescription>
            Complete service and maintenance records | Vollständige Service- und Wartungsaufzeichnungen
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-left text-sm text-muted-foreground">
                <th className="px-4 py-2">Date | Datum</th>
                <th className="px-4 py-2">Service Type | Serviceart</th>
                <th className="px-4 py-2">Cost | Kosten</th>
                <th className="px-4 py-2">Notes | Anmerkungen</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceHistory.map((record, i) => (
                <tr key={i} className="border-b">
                  <td className="px-4 py-3 font-medium">{record.date}</td>
                  <td className="px-4 py-3">{record.type}</td>
                  <td className="px-4 py-3">{record.cost}</td>
                  <td className="px-4 py-3 text-sm">{record.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between mt-4">
          <div>
            <p className="text-sm font-medium">Total maintenance costs | Gesamtwartungskosten</p>
            <p className="text-lg font-bold">64,300 ฿</p>
          </div>
          <div>
            <p className="text-sm font-medium">Average monthly cost | Durchschnittliche monatliche Kosten</p>
            <p className="text-lg font-bold">3,573 ฿</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close | Schließen</Button>
          <Button onClick={exportReport} className="flex items-center gap-2">
            <FileText size={16} />
            Export Report | Bericht exportieren
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
