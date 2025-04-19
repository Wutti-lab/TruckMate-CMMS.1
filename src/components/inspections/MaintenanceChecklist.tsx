
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Phone, Flashlight, Archive, FireExtinguisher, GraduationCap, Box, Truck, Bus, Forklift, CarFront } from "lucide-react";

export function MaintenanceChecklist() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Truck Maintenance Checklist | รายการตรวจสอบการบำรุงรักษารถบรรทุก</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
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

        <div className="space-y-4">
          <h3 className="font-semibold">Emergency & Safety Equipment | อุปกรณ์ฉุกเฉินและความปลอดภัย</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="phone" />
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone size={16} />
                Mobile Phone | โทรศัพท์มือถือ
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="flashlight" />
              <Label htmlFor="flashlight" className="flex items-center gap-2">
                <Flashlight size={16} />
                Emergency Flashlight | ไฟฉายฉุกเฉิน
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="extinguisher" />
              <Label htmlFor="extinguisher" className="flex items-center gap-2">
                <FireExtinguisher size={16} />
                Fire Extinguisher | เครื่องดับเพลิง
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="documents" />
              <Label htmlFor="documents" className="flex items-center gap-2">
                <Archive size={16} />
                Document Storage | ที่เก็บเอกสาร
              </Label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Sleeping Area | พื้นที่นอน</h3>
          <div className="p-4 bg-secondary rounded-lg text-sm">
            <p>• Sleeping spaces for 2-4 people available | มีพื้นที่นอนสำหรับ 2-4 คน</p>
            <p>• Beds/Mattresses in good condition | เตียง/ที่นอนอยู่ในสภาพดี</p>
          </div>
        </div>

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

        <div className="space-y-4">
          <h3 className="font-semibold">Delivery Guidelines | แนวทางการจัดส่ง</h3>
          <div className="p-4 bg-secondary rounded-lg text-sm space-y-2">
            <p>• Careful Handling of Customer Products | การจัดการผลิตภัณฑ์ของลูกค้าอย่างระมัดระวัง</p>
            <p>• Safe and Accident-Free Delivery | การจัดส่งที่ปลอดภัยและปราศจากอุบัติเหตุ</p>
            <p>• Regular Documentation of Vehicle Condition | การบันทึกสภาพยานพาหนะอย่างสม่ำเสมอ</p>
            <p>• Immediate Reporting of Damages or Anomalies | การรายงานความเสียหายหรือความผิดปกติทันที</p>
          </div>
        </div>

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
      </CardContent>
    </Card>
  );
}
