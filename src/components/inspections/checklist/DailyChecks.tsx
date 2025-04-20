
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function DailyChecks() {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Daily Checks | การตรวจสอบประจำวัน</h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="cleaning" />
          <Label htmlFor="cleaning">Vehicle cleaned inside and outside | ทำความสะอาดยานพาหนะทั้งภายในและภายนอก</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="engine" />
          <Label htmlFor="engine">Engine condition checked | ตรวจสอบสภาพเครื่องยนต์</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="overall" />
          <Label htmlFor="overall">Overall vehicle condition checked | ตรวจสอบสภาพทั่วไปของยานพาหนะ</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="manual" />
          <Label htmlFor="manual">Manual read and understood | อ่านและทำความเข้าใจคู่มือ</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="damage" />
          <Label htmlFor="damage">Checked for damages | ตรวจสอบความเสียหาย</Label>
        </div>
      </div>
    </div>
  );
}
