import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck, Phone } from "lucide-react";

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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehicle Costs | ต้นทุนต่อยานพาหนะ</CardTitle>
        <CardDescription>
          Cost overview for replacement parts & inspection reports (฿, Thai Baht)
          <br />
          ภาพรวมต้นทุนสำหรับอะไหล่ รายงานการตรวจสอบ (บาท)
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-muted/50 text-muted-foreground">
              <th className="font-semibold py-2 px-4 text-left">Vehicle ID | รหัสรถ</th>
              <th className="font-semibold py-2 px-4 text-left">Parts Cost | อะไหล่ (฿)</th>
              <th className="font-semibold py-2 px-4 text-left">Inspections | ตรวจสอบ (฿)</th>
              <th className="font-semibold py-2 px-4 text-left">Total | รวม (฿)</th>
            </tr>
          </thead>
          <tbody>
            {costs.map((row) => (
              <tr key={row.vehicleId} className="border-t">
                <td className="py-2 px-4">{row.vehicleId}</td>
                <td className="py-2 px-4">{row.partsCost.toLocaleString('th-TH')}</td>
                <td className="py-2 px-4">{row.inspectionsCost.toLocaleString('th-TH')}</td>
                <td className="py-2 px-4 font-medium">{row.totalCost.toLocaleString('th-TH')}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6 grid grid-cols-2 gap-4 p-4">
          <div>
            <div className="font-semibold text-base mb-2 flex items-center gap-2">
              <ShieldCheck className="text-blue-500" size={18}/> Insurance | ประกัน
            </div>
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-muted-foreground">
                  <th className="font-semibold py-2 px-4 text-left">Vehicle ID | รหัสรถ</th>
                  <th className="font-semibold py-2 px-4 text-left">Insurance | ประกัน</th>
                </tr>
              </thead>
              <tbody>
                {costs.map((row) => (
                  <tr key={row.vehicleId} className="border-t">
                    <td className="py-2 px-4">{row.vehicleId}</td>
                    <td className="py-2 px-4">
                      <div className="flex items-center gap-1">
                        <ShieldCheck size={14} className="text-blue-500" />
                        <span>{row.insurance}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="font-semibold text-base mb-2 flex items-center gap-2">
              <Phone className="text-green-600" size={18}/> Emergency | โทรฉุกเฉิน
            </div>
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-muted-foreground">
                  <th className="font-semibold py-2 px-4 text-left">Vehicle ID | รหัสรถ</th>
                  <th className="font-semibold py-2 px-4 text-left">Emergency Phone | โทรฉุกเฉิน</th>
                </tr>
              </thead>
              <tbody>
                {costs.map((row) => (
                  <tr key={row.vehicleId} className="border-t">
                    <td className="py-2 px-4">{row.vehicleId}</td>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
