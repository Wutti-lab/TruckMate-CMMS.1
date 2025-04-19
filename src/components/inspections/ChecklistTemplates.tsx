
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ClipboardList, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for checklist templates
const templates = [
  {
    id: 1,
    name: "Routine Inspection | การตรวจสอบประจำวัน",
    description: "Standard checklist for daily vehicle inspections | รายการตรวจสอบมาตรฐานสำหรับการตรวจสอบยานพาหนะประจำวัน",
    itemCount: 15,
  },
  {
    id: 2,
    name: "Maintenance Protocol | โปรโตคอลการบำรุงรักษา",
    description: "Comprehensive checklist for regular maintenance | รายการตรวจสอบที่ครอบคลุมสำหรับการบำรุงรักษาตามปกติ",
    itemCount: 25,
  },
  {
    id: 3,
    name: "Safety Check | การตรวจสอบความปลอดภัย",
    description: "Safety-relevant checkpoints | จุดตรวจสอบด้านความปลอดภัย",
    itemCount: 20,
  },
];

export function ChecklistTemplates() {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <Card key={template.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">{template.name}</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuItem>Edit | แก้ไข</DropdownMenuItem>
                <DropdownMenuItem>Duplicate | ทำซ้ำ</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">Delete | ลบ</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ClipboardList size={14} />
                {template.itemCount} Points | จุด
              </div>
              <Button variant="outline" size="sm">
                Use | ใช้
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Card className="flex flex-col items-center justify-center p-6 border-dashed">
        <Button variant="ghost" className="h-auto flex-col gap-2 p-6">
          <Plus size={24} className="text-muted-foreground" />
          <span className="text-muted-foreground">Create New Template | สร้างแม่แบบใหม่</span>
        </Button>
      </Card>
    </div>
  );
}
