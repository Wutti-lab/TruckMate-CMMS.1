
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
    name: "Brake Pads | ผ้าเบรก",
    installedDate: "2024-03-15",
    supplier: "BrakeTech Co. | เบรคเทค จำกัด",
    warrantyEnd: "2025-03-15",
    vehicleId: "B-FR-123",
    vehicleModel: "Tesla Model Y"
  },
  {
    id: "P002",
    name: "Air Filter | กรองอากาศ",
    installedDate: "2024-02-20",
    supplier: "FilterPro | ฟิลเตอร์โปร",
    warrantyEnd: "2025-02-20",
    vehicleId: "B-FR-234",
    vehicleModel: "VW ID.4"
  },
  {
    id: "P003",
    name: "Battery | แบตเตอรี่",
    installedDate: "2024-01-10",
    supplier: "PowerCell | พาวเวอร์เซลล์",
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

  const handleAddPart = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPart.name || !newPart.supplier || !newPart.vehicleId || !newPart.vehicleModel || !newPart.warrantyEnd) {
      toast({
        title: "Missing fields | ข้อมูลไม่ครบถ้วน",
        description: "Please fill out all required fields | กรุณากรอกข้อมูลให้ครบถ้วน",
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
      title: "Part added successfully | เพิ่มชิ้นส่วนสำเร็จ",
      description: `${partToAdd.name} has been added | ${partToAdd.name} ได้ถูกเพิ่มแล้ว`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          <h2 className="text-lg font-semibold">
            Replacement Parts | อะไหล่ทดแทน
          </h2>
        </div>
        <Button 
          onClick={() => setIsAddPartOpen(true)} 
          className="flex items-center gap-1 bg-fleet-500"
        >
          <Plus size={16} />
          Add Part | เพิ่มชิ้นส่วน
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle ID | รหัสรถ</TableHead>
                <TableHead>Vehicle Model | รุ่นรถ</TableHead>
                <TableHead>Part Name | ชื่อชิ้นส่วน</TableHead>
                <TableHead>Installation Date | วันที่ติดตั้ง</TableHead>
                <TableHead>Supplier | ผู้จัดจำหน่าย</TableHead>
                <TableHead>Warranty Until | รับประกันถึง</TableHead>
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
            <DialogTitle>Add New Part | เพิ่มชิ้นส่วนใหม่</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleAddPart} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="vehicleId" className="text-sm font-medium">
                  Vehicle ID | รหัสรถ *
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
                  Vehicle Model | รุ่นรถ *
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
                Part Name | ชื่อชิ้นส่วน *
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
                Supplier | ผู้จัดจำหน่าย *
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
                  Installation Date | วันที่ติดตั้ง *
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
                  Warranty Until | รับประกันถึง *
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
                Cancel | ยกเลิก
              </Button>
              <Button type="submit" className="bg-fleet-500">
                Add Part | เพิ่มชิ้นส่วน
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
