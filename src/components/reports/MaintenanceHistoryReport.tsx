
import { MaintenanceKPICards } from "./maintenance/MaintenanceKPICards";
import { MaintenanceCharts } from "./maintenance/MaintenanceCharts";
import { MaintenanceTypesTable } from "./maintenance/MaintenanceTypesTable";
import { MaintenanceHistoryTable } from "./maintenance/MaintenanceHistoryTable";

export function MaintenanceHistoryReport() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <MaintenanceKPICards />

      {/* Charts */}
      <MaintenanceCharts />

      {/* Maintenance Types Analysis */}
      <MaintenanceTypesTable />

      {/* Recent Maintenance Records */}
      <MaintenanceHistoryTable />
    </div>
  );
}
