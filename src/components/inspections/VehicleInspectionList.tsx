
import { useState } from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { InspectionTableRow } from "./InspectionTableRow";
import { InspectionDetailsDialog } from "./InspectionDetailsDialog";
import { InspectionEditDialog } from "./InspectionEditDialog";
import { InspectionDeleteDialog } from "./InspectionDeleteDialog";
import { Inspection } from "./types/inspection-types";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Mock data for inspections with English and Thai translations
const inspections: Inspection[] = [
  {
    id: 1,
    vehicleId: "B-FR-123",
    type: { en: "Routine", th: "ประจำวัน" },
    status: { en: "Pending", th: "รอดำเนินการ" },
    date: "25.04.2023",
    completedItems: 0,
    totalItems: 15,
  },
  {
    id: 2,
    vehicleId: "B-FR-234",
    type: { en: "Maintenance", th: "บำรุงรักษา" },
    status: { en: "Completed", th: "เสร็จสมบูรณ์" },
    date: "20.04.2023",
    completedItems: 12,
    totalItems: 12,
  },
  {
    id: 3,
    vehicleId: "B-FR-345",
    type: { en: "Safety", th: "ความปลอดภัย" },
    status: { en: "In Progress", th: "กำลังดำเนินการ" },
    date: "22.04.2023",
    completedItems: 8,
    totalItems: 20,
  },
];

export function VehicleInspectionList() {
  const { language, t } = useLanguage();
  const isThaiLanguage = language === 'th';
  const { toast } = useToast();
  
  const [selectedInspection, setSelectedInspection] = useState<Inspection | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const getStatusBadgeClass = (status: string): string => {
    switch (status) {
      case "Completed":
      case "เสร็จสมบูรณ์":
        return "border-green-200 bg-green-50 text-green-600";
      case "In Progress":
      case "กำลังดำเนินการ":
        return "border-orange-200 bg-orange-50 text-orange-600";
      default:
        return "border-gray-200 bg-gray-50 text-gray-600";
    }
  };

  const handleViewDetails = (inspection: Inspection) => {
    setSelectedInspection(inspection);
    setIsDetailsDialogOpen(true);
  };

  const handleEdit = (inspection: Inspection) => {
    setSelectedInspection(inspection);
    setIsEditDialogOpen(true);
  };

  const handleExportPDF = (inspection: Inspection) => {
    const doc = new jsPDF();
    const title = isThaiLanguage ? "รายงานการตรวจสอบ" : "Inspektionsbericht";
    
    // Add title
    doc.setFontSize(18);
    doc.text(title, 14, 22);
    
    // Add inspection details
    doc.setFontSize(12);
    doc.text(`${isThaiLanguage ? "รหัสยานพาหนะ" : "Fahrzeug-ID"}: ${inspection.vehicleId}`, 14, 30);
    doc.text(`${isThaiLanguage ? "ประเภท" : "Typ"}: ${isThaiLanguage ? inspection.type.th : inspection.type.en}`, 14, 38);
    doc.text(`${isThaiLanguage ? "วันที่" : "Datum"}: ${inspection.date}`, 14, 46);
    doc.text(`${isThaiLanguage ? "สถานะ" : "Status"}: ${isThaiLanguage ? inspection.status.th : inspection.status.en}`, 14, 54);
    doc.text(`${isThaiLanguage ? "ความคืบหน้า" : "Fortschritt"}: ${inspection.completedItems}/${inspection.totalItems}`, 14, 62);
    
    // Save the PDF
    doc.save(`inspection_${inspection.id}_${inspection.vehicleId}.pdf`);
    
    toast({
      title: isThaiLanguage ? "ส่งออกสำเร็จ" : "Erfolgreich exportiert",
      description: isThaiLanguage ? "บันทึก PDF สำเร็จ" : "PDF wurde erfolgreich gespeichert",
    });
  };

  const handleDelete = (inspection: Inspection) => {
    setSelectedInspection(inspection);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedInspection) {
      // In a real application, this would call an API to delete the inspection
      // For now, we'll just show a success message
      toast({
        title: isThaiLanguage ? "ลบสำเร็จ" : "Erfolgreich gelöscht",
        description: isThaiLanguage ? `ลบการตรวจสอบ ${selectedInspection.vehicleId} สำเร็จ` : 
          `Inspektion für ${selectedInspection.vehicleId} wurde gelöscht`,
      });
      setIsDeleteDialogOpen(false);
    }
  };

  const handleSaveEdit = () => {
    setIsEditDialogOpen(false);
    toast({
      title: isThaiLanguage ? "บันทึกสำเร็จ" : "Erfolgreich gespeichert",
      description: isThaiLanguage 
        ? "บันทึกการเปลี่ยนแปลงสำเร็จ" 
        : "Änderungen wurden gespeichert",
    });
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{isThaiLanguage ? "ยานพาหนะ" : "Fahrzeug"}</TableHead>
            <TableHead>{isThaiLanguage ? "ประเภท" : "Typ"}</TableHead>
            <TableHead>{isThaiLanguage ? "สถานะ" : "Status"}</TableHead>
            <TableHead>{isThaiLanguage ? "วันที่" : "Datum"}</TableHead>
            <TableHead>{isThaiLanguage ? "ความคืบหน้า" : "Fortschritt"}</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inspections.map((inspection) => (
            <InspectionTableRow
              key={inspection.id}
              inspection={inspection}
              isThaiLanguage={isThaiLanguage}
              onViewDetails={handleViewDetails}
              onEdit={handleEdit}
              onExportPDF={handleExportPDF}
              onDelete={handleDelete}
            />
          ))}
        </TableBody>
      </Table>

      {/* Details Dialog */}
      <InspectionDetailsDialog
        isOpen={isDetailsDialogOpen}
        onClose={() => setIsDetailsDialogOpen(false)}
        inspection={selectedInspection}
        isThaiLanguage={isThaiLanguage}
        getStatusBadgeClass={getStatusBadgeClass}
        onEdit={() => {
          setIsDetailsDialogOpen(false);
          if (selectedInspection) handleEdit(selectedInspection);
        }}
      />

      {/* Edit Dialog */}
      <InspectionEditDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        isThaiLanguage={isThaiLanguage}
        onSave={handleSaveEdit}
        inspection={selectedInspection}
      />

      {/* Delete Confirmation Dialog */}
      <InspectionDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        isThaiLanguage={isThaiLanguage}
        onConfirm={confirmDelete}
      />
    </>
  );
}
