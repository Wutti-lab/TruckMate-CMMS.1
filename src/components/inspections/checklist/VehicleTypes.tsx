
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CarFront, Bus, Forklift, Truck } from "lucide-react";

export function VehicleTypes() {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Truck Types and Sizes | ประเภทและขนาดรถบรรทุก</h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="truck_types" />
          <Label htmlFor="truck_types" className="flex items-center gap-2">
            <Truck size={16} />
            Various Truck Types Identified | ระบุประเภทรถบรรทุกต่างๆ
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="truck_sizes" />
          <Label htmlFor="truck_sizes" className="flex items-center gap-2">
            <CarFront size={16} />
            Size Classes and Payloads Known | ทราบชั้นขนาดและน้ำหนักบรรทุก
          </Label>
        </div>
      </div>
      <div className="p-4 bg-secondary rounded-lg text-sm space-y-2">
        <div className="flex items-center gap-2">
          <Bus size={16} />
          <p>Vehicle Types | ประเภทยานพาหนะ:</p>
        </div>
        <ul className="list-disc pl-5">
          <li>Box Van (up to 3.5t) | รถตู้บรรทุก (ไม่เกิน 3.5 ตัน)</li>
          <li>Light Trucks (3.5t - 7.5t) | รถบรรทุกขนาดเล็ก (3.5 - 7.5 ตัน)</li>
          <li>Medium Trucks (7.5t - 12t) | รถบรรทุกขนาดกลาง (7.5 - 12 ตัน)</li>
          <li>Heavy Trucks (over 12t) | รถบรรทุกขนาดใหญ่ (มากกว่า 12 ตัน)</li>
          <li>Semi-Trucks and Trailers | รถหัวลากและพ่วง</li>
          <li>Special Vehicles (Refrigerated, Tanker) | ยานพาหนะพิเศษ (รถห้องเย็น รถบรรทุกน้ำมัน)</li>
        </ul>
        <div className="flex items-center gap-2 mt-2">
          <Forklift size={16} />
          <p>Additional Equipment per Vehicle Type | อุปกรณ์เสริมตามประเภทยานพาหนะ:</p>
        </div>
        <ul className="list-disc pl-5">
          <li>Loading Ramps | แทนยกของ</li>
          <li>Crane Attachments | อุปกรณ์ติดตั้งเครน</li>
          <li>Temperature-Controlled Cargo Spaces | พื้นที่บรรทุกควบคุมอุณหภูมิ</li>
          <li>Hazardous Goods Transport Equipment | อุปกรณ์ขนส่งสินค้าอันตราย</li>
        </ul>
      </div>
    </div>
  );
}
