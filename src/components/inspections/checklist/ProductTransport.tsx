
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Box } from "lucide-react";

export function ProductTransport() {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Product Transport | การขนส่งผลิตภัณฑ์</h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="product_types" />
          <Label htmlFor="product_types" className="flex items-center gap-2">
            <Box size={16} />
            Product Types Identified and Documented | ระบุและบันทึกประเภทผลิตภัณฑ์
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="transport_conditions" />
          <Label htmlFor="transport_conditions">Specific Transport Conditions Observed | สังเกตเงื่อนไขการขนส่งเฉพาะ</Label>
        </div>
      </div>
      <div className="p-4 bg-secondary rounded-lg text-sm space-y-2">
        <p>• Food: Temperature Control and Hygiene | อาหาร: ควบคุมอุณหภูมิและสุขอนามัย</p>
        <p>• Chemicals: Comply with Hazardous Goods Regulations | สารเคมี: ปฏิบัติตามระเบียบสินค้าอันตราย</p>
        <p>• Electronic Devices: Shock-Protected Packaging | อุปกรณ์อิเล็กทรอนิกส์: บรรจุภัณฑ์กันกระแทก</p>
        <p>• Medical Products: Sterile Conditions | ผลิตภัณฑ์ทางการแพทย์: สภาพปราศจากเชื้อ</p>
        <p>• Sensitive Goods: Careful Handling | สินค้าที่ละเอียดอ่อน: จัดการอย่างระมัดระวัง</p>
        <p>• Perishable Goods: Maintain Cold Chain | สินค้าที่เน่าเสียง่าย: รักษาห่วงโซ่ความเย็น</p>
      </div>
    </div>
  );
}
