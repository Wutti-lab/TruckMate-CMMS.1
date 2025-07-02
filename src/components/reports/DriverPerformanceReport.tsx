
import { DriverKPICards } from "./driver/DriverKPICards";
import { DriverPerformanceCharts } from "./driver/DriverPerformanceCharts";
import { DriverPerformanceTable } from "./driver/DriverPerformanceTable";

export function DriverPerformanceReport() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <DriverKPICards />

      {/* Performance Charts */}
      <DriverPerformanceCharts />

      {/* Driver Performance Table */}
      <DriverPerformanceTable />
    </div>
  );
}
