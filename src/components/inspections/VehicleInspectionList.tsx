import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Car, Calendar, ClipboardCheck, FileText, Edit, FileDown, Trash } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Mock data for inspections with English and Thai translations
const inspections = [
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
  
  const [selectedInspection, setSelectedInspection] = useState<typeof inspections[0] | null>(null);
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

  const handleViewDetails = (inspection: typeof inspections[0]) => {
    setSelectedInspection(inspection);
    setIsDetailsDialogOpen(true);
  };

  const handleEdit = (inspection: typeof inspections[0]) => {
    setSelectedInspection(inspection);
    setIsEditDialogOpen(true);
  };

  const handleExportPDF = (inspection: typeof inspections[0]) => {
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

  const handleDelete = (inspection: typeof inspections[0]) => {
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
            <TableRow key={inspection.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Car size={16} className="text-fleet-500" />
                  {inspection.vehicleId}
                </div>
              </TableCell>
              <TableCell>{isThaiLanguage ? inspection.type.th : inspection.type.en}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={getStatusBadgeClass(isThaiLanguage ? inspection.status.th : inspection.status.en)}
                >
                  {isThaiLanguage ? inspection.status.th : inspection.status.en}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Calendar size={14} className="text-muted-foreground" />
                  {inspection.date}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 h-1.5 rounded-full">
                    <div
                      className="h-1.5 rounded-full bg-fleet-500"
                      style={{
                        width: `${(inspection.completedItems / inspection.totalItems) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {inspection.completedItems}/{inspection.totalItems}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white">
                    <DropdownMenuItem onClick={() => handleViewDetails(inspection)} className="cursor-pointer">
                      <FileText size={16} className="mr-2" />
                      {isThaiLanguage ? "แสดงรายละเอียด" : "Details anzeigen"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEdit(inspection)} className="cursor-pointer">
                      <Edit size={16} className="mr-2" />
                      {isThaiLanguage ? "แก้ไข" : "Bearbeiten"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExportPDF(inspection)} className="cursor-pointer">
                      <FileDown size={16} className="mr-2" />
                      {isThaiLanguage ? "ส่งออก PDF" : "PDF exportieren"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(inspection)} className="cursor-pointer text-red-600">
                      <Trash size={16} className="mr-2" />
                      {isThaiLanguage ? "ลบ" : "Löschen"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {isThaiLanguage ? "รายละเอียดการตรวจสอบ" : "Inspektionsdetails"}
            </DialogTitle>
          </DialogHeader>
          {selectedInspection && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isThaiLanguage ? "ยานพาหนะ" : "Fahrzeug"}
                  </p>
                  <p className="font-medium">{selectedInspection.vehicleId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isThaiLanguage ? "ประเภท" : "Typ"}
                  </p>
                  <p className="font-medium">
                    {isThaiLanguage ? selectedInspection.type.th : selectedInspection.type.en}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isThaiLanguage ? "วันที่" : "Datum"}
                  </p>
                  <p className="font-medium">{selectedInspection.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isThaiLanguage ? "สถานะ" : "Status"}
                  </p>
                  <Badge
                    variant="outline"
                    className={getStatusBadgeClass(
                      isThaiLanguage ? selectedInspection.status.th : selectedInspection.status.en
                    )}
                  >
                    {isThaiLanguage ? selectedInspection.status.th : selectedInspection.status.en}
                  </Badge>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {isThaiLanguage ? "ความคืบหน้า" : "Fortschritt"}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div
                        className="h-2 rounded-full bg-fleet-500"
                        style={{
                          width: `${
                            (selectedInspection.completedItems / selectedInspection.totalItems) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm">
                      {selectedInspection.completedItems}/{selectedInspection.totalItems}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDetailsDialogOpen(false)}
            >
              {isThaiLanguage ? "ปิด" : "Schließen"}
            </Button>
            <Button 
              onClick={() => {
                setIsDetailsDialogOpen(false);
                if (selectedInspection) handleEdit(selectedInspection);
              }}
            >
              {isThaiLanguage ? "แก้ไข" : "Bearbeiten"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog - placeholder for now */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {isThaiLanguage ? "แก้ไขการตรวจสอบ" : "Inspektion bearbeiten"}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {/* Form would go here in a real implementation */}
            <p className="text-center text-muted-foreground">
              {isThaiLanguage
                ? "ฟอร์มแก้ไขการตรวจสอบจะแสดงที่นี่"
                : "Hier würde das Bearbeitungsformular angezeigt werden"}
            </p>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEditDialogOpen(false)}
            >
              {isThaiLanguage ? "ยกเลิก" : "Abbrechen"}
            </Button>
            <Button 
              onClick={() => {
                setIsEditDialogOpen(false);
                toast({
                  title: isThaiLanguage ? "บันทึกสำเร็จ" : "Erfolgreich gespeichert",
                  description: isThaiLanguage 
                    ? "บันทึกการเปลี่ยนแปลงสำเร็จ" 
                    : "Änderungen wurden gespeichert",
                });
              }}
            >
              {isThaiLanguage ? "บันทึก" : "Speichern"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isThaiLanguage ? "ยืนยันการลบ" : "Löschen bestätigen"}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              {isThaiLanguage
                ? "คุณแน่ใจหรือไม่ว่าต้องการลบการตรวจสอบนี้? การกระทำนี้ไม่สามารถเปลี่ยนกลับได้"
                : "Sind Sie sicher, dass Sie diese Inspektion löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden."}
            </p>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              {isThaiLanguage ? "ยกเลิก" : "Abbrechen"}
            </Button>
            <Button 
              variant="destructive"
              onClick={confirmDelete}
            >
              {isThaiLanguage ? "ลบ" : "Löschen"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
