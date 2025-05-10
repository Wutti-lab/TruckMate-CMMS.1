
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck, Phone } from "lucide-react";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";

interface CostDetail {
  vehicleId: string;
  partsCost: number;
  inspectionsCost: number;
  totalCost: number;
  insurance: string;
  emergencyPhone: string;
}

const costs: CostDetail[] = [
  {
    vehicleId: "B-FR-123",
    partsCost: 400,
    inspectionsCost: 120,
    totalCost: 520,
    insurance: "HDI Fleet Premium",
    emergencyPhone: "+49 30 1234567",
  },
  {
    vehicleId: "B-FR-234",
    partsCost: 250,
    inspectionsCost: 80,
    totalCost: 330,
    insurance: "Allianz MobilSchutz",
    emergencyPhone: "+49 30 2345678",
  },
  {
    vehicleId: "B-FR-345",
    partsCost: 600,
    inspectionsCost: 150,
    totalCost: 750,
    insurance: "HUK24 Komfort",
    emergencyPhone: "+49 30 3456789",
  },
];

export function VehicleCosts() {
  const { language } = useLanguage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {extractLanguageText("Vehicle Costs | ต้นทุนต่อยานพาหนะ | Fahrzeugkosten", language)}
        </CardTitle>
        <CardDescription>
          {extractLanguageText(
            "Cost overview for replacement parts, inspection reports, insurances & emergency contact (฿, Thai Baht) | " +
            "ภาพรวมต้นทุนสำหรับอะไหล่ รายงานการตรวจสอบ ประกันภัย และเบอร์ติดต่อฉุกเฉิน (บาท) | " +
            "Kostenübersicht für Ersatzteile, Inspektionsberichte, Versicherungen und Notfallkontakt (฿, Thai Baht)",
            language
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-muted/50 text-muted-foreground">
              <th className="font-semibold py-2 px-4 text-left">
                {extractLanguageText("Vehicle ID | รหัสรถ | Fahrzeug-ID", language)}
              </th>
              <th className="font-semibold py-2 px-4 text-left">
                {extractLanguageText("Parts Cost | อะไหล่ (฿) | Teilekosten (฿)", language)}
              </th>
              <th className="font-semibold py-2 px-4 text-left">
                {extractLanguageText("Inspections | ตรวจสอบ (฿) | Inspektionen (฿)", language)}
              </th>
              <th className="font-semibold py-2 px-4 text-left flex items-center gap-1">
                <ShieldCheck size={16} className="inline-block mr-1" />
                {extractLanguageText("Insurance | ประกัน | Versicherung", language)}
              </th>
              <th className="font-semibold py-2 px-4 text-left flex items-center gap-1">
                <Phone size={16} className="inline-block mr-1" />
                {extractLanguageText("Emergency | โทรฉุกเฉิน | Notfall", language)}
              </th>
              <th className="font-semibold py-2 px-4 text-left">
                {extractLanguageText("Total | รวม (฿) | Gesamt (฿)", language)}
              </th>
            </tr>
          </thead>
          <tbody>
            {costs.map((row) => (
              <tr key={row.vehicleId} className="border-t">
                <td className="py-2 px-4">{row.vehicleId}</td>
                <td className="py-2 px-4">{row.partsCost.toLocaleString(language === 'de' ? 'de-DE' : 'th-TH')}</td>
                <td className="py-2 px-4">{row.inspectionsCost.toLocaleString(language === 'de' ? 'de-DE' : 'th-TH')}</td>
                <td className="py-2 px-4">
                  <div className="flex items-center gap-1">
                    <ShieldCheck size={14} className="text-blue-500" />
                    <span>{row.insurance}</span>
                  </div>
                </td>
                <td className="py-2 px-4">
                  <div className="flex items-center gap-1">
                    <Phone size={14} className="text-green-600" />
                    <a 
                      href={`tel:${row.emergencyPhone.replace(/\s+/g, "")}`} 
                      className="hover:underline">
                      {row.emergencyPhone}
                    </a>
                  </div>
                </td>
                <td className="py-2 px-4 font-medium">{row.totalCost.toLocaleString(language === 'de' ? 'de-DE' : 'th-TH')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
