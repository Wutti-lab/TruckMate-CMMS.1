
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Thermometer } from "lucide-react";

interface CostDetail {
  vehicleId: string;
  partsCost: number;
  inspectionsCost: number;
  engineTemp: number; // Temperatur in °C
  totalCost: number;
}

const costs: CostDetail[] = [
  {
    vehicleId: "B-FR-123",
    partsCost: 400,
    inspectionsCost: 120,
    engineTemp: 84,
    totalCost: 520,
  },
  {
    vehicleId: "B-FR-234",
    partsCost: 250,
    inspectionsCost: 80,
    engineTemp: 78,
    totalCost: 330,
  },
  {
    vehicleId: "B-FR-345",
    partsCost: 600,
    inspectionsCost: 150,
    engineTemp: 92,
    totalCost: 750,
  },
];

export function VehicleCosts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehicle Costs | ต้นทุนต่อยานพาหนะ</CardTitle>
        <CardDescription>
          Cost overview for replacement parts, inspection reports and engine temperature (฿, Thai Baht)
          <br />
          ภาพรวมต้นทุนสำหรับอะไหล่ รายงานการตรวจสอบ และอุณหภูมิเครื่องยนต์ (บาทและเซลเซียส)
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-muted/50 text-muted-foreground">
              <th className="font-semibold py-2 px-4 text-left">Vehicle ID | รหัสรถ</th>
              <th className="font-semibold py-2 px-4 text-left">Parts Cost | อะไหล่ (฿)</th>
              <th className="font-semibold py-2 px-4 text-left">Inspections | ตรวจสอบ (฿)</th>
              <th className="font-semibold py-2 px-4 text-left flex items-center gap-1">
                <Thermometer size={16} className="inline-block mr-1" /> Motor Temp (°C)
              </th>
              <th className="font-semibold py-2 px-4 text-left">Total | รวม (฿)</th>
            </tr>
          </thead>
          <tbody>
            {costs.map((row) => (
              <tr key={row.vehicleId} className="border-t">
                <td className="py-2 px-4">{row.vehicleId}</td>
                <td className="py-2 px-4">{row.partsCost.toLocaleString('th-TH')}</td>
                <td className="py-2 px-4">{row.inspectionsCost.toLocaleString('th-TH')}</td>
                <td className="py-2 px-4">
                  <div className="flex items-center gap-1">
                    <Thermometer size={14} className={row.engineTemp > 90 ? "text-red-500" : row.engineTemp > 85 ? "text-yellow-500" : "text-blue-500"} />
                    {row.engineTemp}°C
                  </div>
                </td>
                <td className="py-2 px-4 font-medium">{row.totalCost.toLocaleString('th-TH')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
