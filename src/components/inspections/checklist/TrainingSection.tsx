
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { GraduationCap } from "lucide-react";

export function TrainingSection() {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Training and Maintenance | การฝึกอบรมและการบำรุงรักษา</h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="training" />
          <Label htmlFor="training" className="flex items-center gap-2">
            <GraduationCap size={16} />
            Regular Safety Training Completed | ผ่านการฝึกอบรมความปลอดภัยประจำ
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="cleaning_supplies" />
          <Label htmlFor="cleaning_supplies">Vehicle Cleaning Products Available | มีผลิตภัณฑ์ทำความสะอาดยานพาหนะ</Label>
        </div>
      </div>
      <div className="p-4 bg-secondary rounded-lg text-sm space-y-2">
        <p>• Theoretical Traffic Safety Training | การอบรมความปลอดภัยการจราจรภาคทฤษฎี</p>
        <p>• Practical Driving Training under Supervision | การฝึกอบรมการขับขี่ภาคปฏิบัติภายใต้การควบคุม</p>
        <p>• Cargo Securing Training | การอบรมการรัดตรึงสินค้า</p>
        <p>• First Aid Course Completed | ผ่านหลักสูตรปฐมพยาบาล</p>
        <p>• Hazardous Goods Training (if required) | การอบรมสินค้าอันตราย (หากจำเป็น)</p>
        <p>• Digital Tachograph Training | การอบรมเครื่องบันทึกข้อมูลการขับขี่ดิจิทัล</p>
        <p>• Eco-Driving Training | การอบรมการขับขี่ประหยัดพลังงาน</p>
      </div>
    </div>
  );
}
