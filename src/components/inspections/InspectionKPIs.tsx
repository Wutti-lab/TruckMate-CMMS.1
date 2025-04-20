
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity, AlertTriangle, CheckSquare, Clock, TrendingUp } from "lucide-react";

const inspectionMetrics = {
  totalInspections: 156,
  completionRate: 85,
  averageTime: "45 min",
  overdueInspections: 3,
  complianceRate: 92,
};

export function InspectionKPIs() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Inspektionen Total | Total Inspections | การตรวจสอบทั้งหมด
          </CardTitle>
          <Activity className="h-4 w-4 text-fleet-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inspectionMetrics.totalInspections}</div>
          <div className="flex items-center text-xs text-green-500 mt-2">
            <TrendingUp className="h-3 w-3 mr-1" />
            <span>12% mehr als letzten Monat | 12% more than last month | เพิ่มขึ้น 12% จากเดือนที่แล้ว</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Abschlussrate | Completion Rate | อัตราการเสร็จสิ้น
          </CardTitle>
          <CheckSquare className="h-4 w-4 text-fleet-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inspectionMetrics.completionRate}%</div>
          <div className="flex items-center gap-2 mt-2">
            <Progress value={inspectionMetrics.completionRate} className="h-2" />
            <span className="text-xs text-muted-foreground">
              {inspectionMetrics.completionRate}%
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Durchschnittliche Zeit | Average Time | เวลาเฉลี่ย
          </CardTitle>
          <Clock className="h-4 w-4 text-fleet-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inspectionMetrics.averageTime}</div>
          <p className="text-xs text-muted-foreground mt-2">
            Pro abgeschlossene Inspektion | Per completed inspection | ต่อการตรวจสอบที่เสร็จสิ้น
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Überfällige Inspektionen | Overdue Inspections | การตรวจสอบที่เกินกำหนด
          </CardTitle>
          <AlertTriangle className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inspectionMetrics.overdueInspections}</div>
          <div className="flex items-center text-orange-500 mt-2">
            <AlertTriangle className="h-3 w-3 mr-1" />
            <span className="text-xs">
              Erfordern Aufmerksamkeit | Require attention | ต้องการความสนใจ
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
