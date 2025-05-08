
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Car, Truck, Bus } from "lucide-react";

export function VehicleTypes() {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Vehicle Types | ประเภทยานพาหนะ</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="truck" />
            <Label htmlFor="truck" className="flex items-center gap-2">
              <Truck size={16} />
              Truck | รถบรรทุก
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="car" />
            <Label htmlFor="car" className="flex items-center gap-2">
              <Car size={16} />
              Car | รถยนต์
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="bus" />
            <Label htmlFor="bus" className="flex items-center gap-2">
              <Bus size={16} />
              Bus | รถบัส
            </Label>
          </div>
        </div>
        
        <div className="p-4 bg-secondary rounded-lg text-sm space-y-2">
          <p>• Vehicle License Valid | ใบอนุญาตรถถูกต้อง</p>
          <p>• Registration Documents Current | เอกสารจดทะเบียนเป็นปัจจุบัน</p>
          <p>• Insurance Coverage Active | ความคุ้มครองประกันภัยที่ใช้งานอยู่</p>
          <p>• Regular Maintenance Record | บันทึกการบำรุงรักษาเป็นประจำ</p>
          <p>• Annual Technical Inspection | การตรวจสอบทางเทคนิคประจำปี</p>
        </div>
      </div>
    </div>
  );
}
