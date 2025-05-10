
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Phone, Flashlight, Archive, FireExtinguisher } from "lucide-react";

export function EmergencySafety() {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Notfall- & Sicherheitsausrüstung</h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="phone" />
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone size={16} />
            Mobiltelefon
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="flashlight" />
          <Label htmlFor="flashlight" className="flex items-center gap-2">
            <Flashlight size={16} />
            Notfalllampe
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="extinguisher" />
          <Label htmlFor="extinguisher" className="flex items-center gap-2">
            <FireExtinguisher size={16} />
            Feuerlöscher
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="documents" />
          <Label htmlFor="documents" className="flex items-center gap-2">
            <Archive size={16} />
            Dokumentenablage
          </Label>
        </div>
      </div>
    </div>
  );
}
