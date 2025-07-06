import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Download, 
  Printer, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Calendar,
  Car,
  User,
  ClipboardList
} from "lucide-react";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Inspection {
  id: string;
  vehicle_id: string;
  inspector_id: string;
  type: string;
  inspection_date: string;
  status: string;
  passed: boolean | null;
  checklist_data: any;
  notes: string | null;
  created_at: string;
  vehicles?: {
    license_plate: string;
    make: string;
    model: string;
    vin?: string;
  };
  profiles?: {
    full_name: string;
    email?: string;
  };
}

interface InspectionReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inspection: Inspection | null;
}

export function InspectionReportModal({
  open,
  onOpenChange,
  inspection
}: InspectionReportModalProps) {
  const { language } = useLanguage();
  const { toast } = useToast();
  const printRef = useRef<HTMLDivElement>(null);

  if (!inspection) return null;

  const getStatusBadge = (status: string, passed: boolean | null) => {
    if (status === "completed") {
      return (
        <Badge variant={passed ? "default" : "destructive"} className="gap-1">
          {passed ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
          {passed 
            ? extractLanguageText("PASSED | BESTANDEN", language)
            : extractLanguageText("FAILED | NICHT BESTANDEN", language)
          }
        </Badge>
      );
    }
    
    return (
      <Badge variant="outline" className="gap-1">
        <AlertTriangle className="h-3 w-3" />
        {extractLanguageText("PENDING | AUSSTEHEND", language)}
      </Badge>
    );
  };

  const getTypeLabel = (type: string) => {
    const typeMap: Record<string, string> = {
      "daily": extractLanguageText("Daily Check | Tägliche Kontrolle", language),
      "weekly": extractLanguageText("Weekly Inspection | Wöchentliche Inspektion", language),
      "monthly": extractLanguageText("Monthly Service | Monatliche Wartung", language),
      "annual": extractLanguageText("Annual Inspection | Jahresinspektion", language),
      "pre_trip": extractLanguageText("Pre-Trip Inspection | Fahrtantritt-Inspektion", language),
      "post_trip": extractLanguageText("Post-Trip Inspection | Fahrtende-Inspektion", language)
    };
    return typeMap[type] || type;
  };

  const handlePrint = () => {
    if (printRef.current) {
      const printContent = printRef.current.innerHTML;
      const originalContent = document.body.innerHTML;
      
      document.body.innerHTML = `
        <div style="font-family: Arial, sans-serif;">
          <style>
            @media print {
              .no-print { display: none !important; }
              .print-break { page-break-after: always; }
            }
          </style>
          ${printContent}
        </div>
      `;
      
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload();
    }
  };

  const handleDownloadPDF = () => {
    // This would typically use a PDF generation library like jsPDF
    toast({
      title: extractLanguageText("PDF Export | PDF-Export", language),
      description: extractLanguageText("PDF generation feature coming soon | PDF-Generierung kommt bald", language)
    });
  };

  const renderChecklistItem = (item: any) => {
    const getItemStatus = () => {
      if (item.type === 'checkbox') {
        return item.value ? 'pass' : 'fail';
      }
      if (item.type === 'radio') {
        if (item.value === 'Pass' || item.value === 'Good' || item.value === 'Clean') return 'pass';
        if (item.value === 'Fail' || item.value === 'Poor' || item.value === 'Replace') return 'fail';
        return 'warning';
      }
      return item.value ? 'pass' : 'na';
    };

    const status = getItemStatus();
    const statusIcon = {
      pass: <CheckCircle className="h-4 w-4 text-green-600" />,
      fail: <XCircle className="h-4 w-4 text-red-600" />,
      warning: <AlertTriangle className="h-4 w-4 text-amber-600" />,
      na: <div className="h-4 w-4 rounded-full bg-gray-300" />
    };

    return (
      <div key={item.id} className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0">
        <div className="flex-shrink-0 mt-0.5">
          {statusIcon[status]}
        </div>
        <div className="flex-1">
          <div className="font-medium text-sm">{item.label}</div>
          {item.value && (
            <div className="text-sm text-gray-600 mt-1">
              {extractLanguageText("Result | Ergebnis", language)}: {item.value.toString()}
            </div>
          )}
          {item.notes && (
            <div className="text-sm text-gray-500 mt-1 italic">
              {extractLanguageText("Notes | Notizen", language)}: {item.notes}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="no-print">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {extractLanguageText("Inspection Report | Inspektionsbericht", language)}
            </DialogTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
                <Download className="h-4 w-4 mr-2" />
                {extractLanguageText("PDF | PDF", language)}
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                {extractLanguageText("Print | Drucken", language)}
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div ref={printRef} className="space-y-6">
          {/* Header */}
          <div className="text-center border-b pb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {extractLanguageText("VEHICLE INSPECTION REPORT | FAHRZEUG-INSPEKTIONSBERICHT", language)}
            </h1>
            <div className="mt-2 flex justify-center">
              {getStatusBadge(inspection.status, inspection.passed)}
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Car className="h-5 w-5" />
                  {extractLanguageText("Vehicle Information | Fahrzeuginformationen", language)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">{extractLanguageText("License Plate | Kennzeichen", language)}:</span>
                  <span className="font-medium">{inspection.vehicles?.license_plate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{extractLanguageText("Make & Model | Marke & Modell", language)}:</span>
                  <span className="font-medium">{inspection.vehicles?.make} {inspection.vehicles?.model}</span>
                </div>
                {inspection.vehicles?.vin && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">{extractLanguageText("VIN | FIN", language)}:</span>
                    <span className="font-medium">{inspection.vehicles.vin}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ClipboardList className="h-5 w-5" />
                  {extractLanguageText("Inspection Details | Inspektionsdetails", language)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">{extractLanguageText("Type | Typ", language)}:</span>
                  <span className="font-medium">{getTypeLabel(inspection.type)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{extractLanguageText("Date | Datum", language)}:</span>
                  <span className="font-medium">{format(new Date(inspection.inspection_date), 'dd.MM.yyyy')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{extractLanguageText("Inspector | Prüfer", language)}:</span>
                  <span className="font-medium">{inspection.profiles?.full_name || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{extractLanguageText("Status | Status", language)}:</span>
                  <span className="font-medium capitalize">{inspection.status}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checklist Results */}
          {inspection.checklist_data?.items && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {extractLanguageText("Inspection Checklist Results | Inspektions-Checkliste Ergebnisse", language)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {inspection.checklist_data.items.map((item: any) => renderChecklistItem(item))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notes */}
          {inspection.notes && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {extractLanguageText("Additional Notes | Zusätzliche Notizen", language)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap">{inspection.notes}</p>
              </CardContent>
            </Card>
          )}

          {/* Summary Statistics */}
          {inspection.checklist_data?.items && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {extractLanguageText("Inspection Summary | Inspektions-Zusammenfassung", language)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {inspection.checklist_data.items.filter((item: any) => {
                        if (item.type === 'checkbox') return item.value === true;
                        if (item.type === 'radio') return ['Pass', 'Good', 'Clean'].includes(item.value);
                        return item.value;
                      }).length}
                    </div>
                    <div className="text-sm text-green-600 font-medium">
                      {extractLanguageText("Passed | Bestanden", language)}
                    </div>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {inspection.checklist_data.items.filter((item: any) => {
                        if (item.type === 'checkbox') return item.value === false;
                        if (item.type === 'radio') return ['Fail', 'Poor', 'Replace'].includes(item.value);
                        return false;
                      }).length}
                    </div>
                    <div className="text-sm text-red-600 font-medium">
                      {extractLanguageText("Failed | Nicht bestanden", language)}
                    </div>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-lg">
                    <div className="text-2xl font-bold text-amber-600">
                      {inspection.checklist_data.items.filter((item: any) => {
                        if (item.type === 'radio') return ['Fair', 'Worn', 'Minor Issues'].includes(item.value);
                        return false;
                      }).length}
                    </div>
                    <div className="text-sm text-amber-600 font-medium">
                      {extractLanguageText("Warnings | Warnungen", language)}
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {inspection.checklist_data.items.length}
                    </div>
                    <div className="text-sm text-blue-600 font-medium">
                      {extractLanguageText("Total Items | Gesamte Punkte", language)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Footer */}
          <div className="border-t pt-4 text-center text-sm text-gray-500">
            <p>
              {extractLanguageText("Report generated on | Bericht erstellt am", language)}: {format(new Date(), 'dd.MM.yyyy HH:mm')}
            </p>
            <p className="mt-1">TruckMate CMMS - {extractLanguageText("Vehicle Inspection System | Fahrzeug-Inspektionssystem", language)}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}