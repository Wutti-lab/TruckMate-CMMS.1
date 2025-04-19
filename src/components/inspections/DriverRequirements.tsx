
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function DriverRequirements() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Driver Qualifications & Health | คุณสมบัติและสุขภาพของผู้ขับขี่</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-semibold">License & Qualification | ใบอนุญาตและคุณสมบัติ</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="license3" />
              <Label htmlFor="license3">Class 3 License | ใบขับขี่ประเภท 3</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="license4" />
              <Label htmlFor="license4">Class 4 License | ใบขับขี่ประเภท 4</Label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Medical Examinations | การตรวจสุขภาพ</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="medical" />
              <Label htmlFor="medical">Medical Examination Passed | ผ่านการตรวจสุขภาพ</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="vision" />
              <Label htmlFor="vision">Vision Test Passed | ผ่านการทดสอบสายตา</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="colorblind" />
              <Label htmlFor="colorblind">Color Blindness Test Passed | ผ่านการทดสอบตาบอดสี</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="hearing" />
              <Label htmlFor="hearing">Hearing Test Passed | ผ่านการทดสอบการได้ยิน</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="drugs" />
              <Label htmlFor="drugs">Drug Test Passed | ผ่านการทดสอบยา</Label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Main Driver Duties | หน้าที่หลักของผู้ขับขี่</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Safe and timely delivery of goods | การจัดส่งสินค้าอย่างปลอดภัยและตรงเวลา</li>
            <li>Maintaining logbook and documentation | การดูแลสมุดบันทึกและเอกสาร</li>
            <li>Daily vehicle inspection and maintenance | การตรวจสอบและบำรุงรักษายานพาหนะประจำวัน</li>
            <li>Compliance with traffic rules and rest periods | การปฏิบัติตามกฎจราจรและช่วงเวลาพัก</li>
            <li>Cargo security and control | การรักษาความปลอดภัยและควบคุมสินค้า</li>
            <li>Communication with customers and dispatch | การสื่อสารกับลูกค้าและการจัดส่ง</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
