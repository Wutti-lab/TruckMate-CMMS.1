
import { FuelKPICards } from "./fuel/FuelKPICards";
import { FuelConsumptionChart } from "./fuel/FuelConsumptionChart";
import { FuelEfficiencyChart } from "./fuel/FuelEfficiencyChart";
import { VehiclePerformanceTable } from "./fuel/VehiclePerformanceTable";
import { FuelAlerts } from "./fuel/FuelAlerts";

export function FuelConsumptionReport() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <FuelKPICards />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FuelConsumptionChart />
        <FuelEfficiencyChart />
      </div>

      {/* Vehicle Performance Table & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <VehiclePerformanceTable />
        <FuelAlerts />
      </div>
    </div>
  );
}
