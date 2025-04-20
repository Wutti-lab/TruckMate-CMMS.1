
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function StandardEquipment() {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Standard Equipment | อุปกรณ์มาตรฐาน</h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="firstaid" />
          <Label htmlFor="firstaid">First Aid Kit | ชุดปฐมพยาบาล</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="warning" />
          <Label htmlFor="warning">Warning Triangle | สามเหลี่ยมเตือนภัย</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="vest" />
          <Label htmlFor="vest">Safety Vest | เสื้อกั๊กสะท้อนแสง</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="cones" />
          <Label htmlFor="cones">2 Traffic Cones | กรวยจราจร 2 อัน</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="tools" />
          <Label htmlFor="tools">Toolbox | กล่องเครื่องมือ</Label>
        </div>
      </div>
    </div>
  );
}
