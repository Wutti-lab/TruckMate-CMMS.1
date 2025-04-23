
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface CostDetail {
  vehicleId: string;
  partsCost: number;
  inspectionsCost: number;
  totalCost: number;
}

const costs: CostDetail[] = [
  {
    vehicleId: "B-FR-123",
    partsCost: 400,
    inspectionsCost: 120,
    totalCost: 520,
  },
  {
    vehicleId: "B-FR-234",
    partsCost: 250,
    inspectionsCost: 80,
    totalCost: 330,
  },
  {
    vehicleId: "B-FR-345",
    partsCost: 600,
    inspectionsCost: 150,
    totalCost: 750,
  },
];

export function VehicleCosts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehicle Costs | ต้นทุนต่อยานพาหนะ</CardTitle>
        <CardDescription>
          Cost overview for replacement parts and inspection reports (฿, Thai Baht)
          <br />
          ภาพรวมต้นทุนสำหรับอะไหล่และรายงานการตรวจสอบ (บาท)
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
      </CardContent>
    </Card>
  );
}
