
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";

export function DriverRequirements() {
  const { language } = useLanguage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{extractLanguageText("Driver Qualifications & Health | คุณสมบัติและสุขภาพของผู้ขับขี่", language)}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* License & Qualification Section */}
          <div>
            <h3 className="text-lg font-medium mb-4">{extractLanguageText("License & Qualification | ใบอนุญาตและคุณสมบัติ", language)}</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <span>{extractLanguageText("Class 3 License | ใบขับขี่ประเภท 3", language)}</span>
              </div>
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <span>{extractLanguageText("Class 4 License | ใบขับขี่ประเภท 4", language)}</span>
              </div>
            </div>
          </div>

          {/* Medical Examinations Section */}
          <div>
            <h3 className="text-lg font-medium mb-4">{extractLanguageText("Medical Examinations | การตรวจสุขภาพ", language)}</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <span>{extractLanguageText("Medical Examination Passed | ผ่านการตรวจสุขภาพ", language)}</span>
              </div>
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <span>{extractLanguageText("Vision Test Passed | ผ่านการทดสอบสายตา", language)}</span>
              </div>
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <span>{extractLanguageText("Color Blindness Test Passed | ผ่านการทดสอบตาบอดสี", language)}</span>
              </div>
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <span>{extractLanguageText("Hearing Test Passed | ผ่านการทดสอบการได้ยิน", language)}</span>
              </div>
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <span>{extractLanguageText("Drug Test Passed | ผ่านการทดสอบยา", language)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Driver Duties Section */}
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">{extractLanguageText("Main Driver Duties | หน้าที่หลักของผู้ขับขี่", language)}</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Check className="h-3 w-3 text-blue-600" />
              </div>
              <span className="text-sm">{extractLanguageText("Safe and timely delivery of goods | การจัดส่งสินค้าอย่างปลอดภัยและตรงเวลา", language)}</span>
            </li>
            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Check className="h-3 w-3 text-blue-600" />
              </div>
              <span className="text-sm">{extractLanguageText("Maintaining logbook and documentation | การดูแลสมุดบันทึกและเอกสาร", language)}</span>
            </li>
            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Check className="h-3 w-3 text-blue-600" />
              </div>
              <span className="text-sm">{extractLanguageText("Daily vehicle inspection and maintenance | การตรวจสอบและบำรุงรักษายานพาหนะประจำวัน", language)}</span>
            </li>
            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Check className="h-3 w-3 text-blue-600" />
              </div>
              <span className="text-sm">{extractLanguageText("Compliance with traffic rules and rest periods | การปฏิบัติตามกฎจราจรและช่วงเวลาพัก", language)}</span>
            </li>
            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Check className="h-3 w-3 text-blue-600" />
              </div>
              <span className="text-sm">{extractLanguageText("Cargo security and control | การรักษาความปลอดภัยและควบคุมสินค้า", language)}</span>
            </li>
            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Check className="h-3 w-3 text-blue-600" />
              </div>
              <span className="text-sm">{extractLanguageText("Communication with customers and dispatch | การสื่อสารกับลูกค้าและการจัดส่ง", language)}</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
