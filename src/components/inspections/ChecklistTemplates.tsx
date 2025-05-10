
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ClipboardList, MoreHorizontal } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for checklist templates with bilingual support
const templates = [
  {
    id: 1,
    name: { en: "Routine Inspection", th: "การตรวจสอบประจำ" },
    description: { 
      en: "Standard checklist for daily vehicle inspections", 
      th: "รายการตรวจสอบมาตรฐานสำหรับการตรวจสอบยานพาหนะประจำวัน" 
    },
    itemCount: 15,
  },
  {
    id: 2,
    name: { en: "Maintenance Log", th: "บันทึกการบำรุงรักษา" },
    description: { 
      en: "Comprehensive checklist for regular maintenance", 
      th: "รายการตรวจสอบครอบคลุมสำหรับการบำรุงรักษาตามกำหนดเวลา" 
    },
    itemCount: 25,
  },
  {
    id: 3,
    name: { en: "Safety Check", th: "การตรวจสอบความปลอดภัย" },
    description: { 
      en: "Safety-relevant control points", 
      th: "จุดควบคุมที่เกี่ยวข้องกับความปลอดภัย" 
    },
    itemCount: 20,
  },
];

export function ChecklistTemplates() {
  const { language } = useLanguage();
  const isThaiLanguage = language === 'th';

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <Card key={template.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">
              {isThaiLanguage ? template.name.th : template.name.en}
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuItem>{isThaiLanguage ? "แก้ไข" : "Bearbeiten"}</DropdownMenuItem>
                <DropdownMenuItem>{isThaiLanguage ? "ทำสำเนา" : "Duplizieren"}</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">{isThaiLanguage ? "ลบ" : "Löschen"}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {isThaiLanguage ? template.description.th : template.description.en}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ClipboardList size={14} />
                {template.itemCount} {isThaiLanguage ? "รายการ" : "Punkte"}
              </div>
              <Button variant="outline" size="sm">
                {isThaiLanguage ? "ใช้" : "Verwenden"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Card className="flex flex-col items-center justify-center p-6 border-dashed">
        <Button variant="ghost" className="h-auto flex-col gap-2 p-6">
          <Plus size={24} className="text-muted-foreground" />
          <span className="text-muted-foreground">
            {isThaiLanguage ? "สร้างแม่แบบใหม่" : "Neue Vorlage erstellen"}
          </span>
        </Button>
      </Card>
    </div>
  );
}
