
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function StandardEquipment() {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Standardausrüstung</h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="firstaid" />
          <Label htmlFor="firstaid">Erste-Hilfe-Set</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="warning" />
          <Label htmlFor="warning">Warndreieck</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="vest" />
          <Label htmlFor="vest">Warnweste</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="cones" />
          <Label htmlFor="cones">2 Verkehrskegel</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="tools" />
          <Label htmlFor="tools">Werkzeugkasten</Label>
        </div>
      </div>
    </div>
  );
}
