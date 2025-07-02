
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { ReportsHeader } from "@/components/reports/ReportsHeader";
import { ReportsTabs } from "@/components/reports/ReportsTabs";
import { FuelConsumptionReport } from "@/components/reports/FuelConsumptionReport";
import { DriverPerformanceReport } from "@/components/reports/DriverPerformanceReport";
import { CostAnalysisReport } from "@/components/reports/CostAnalysisReport";
import { MaintenanceHistoryReport } from "@/components/reports/MaintenanceHistoryReport";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Reports() {
  const [activeTab, setActiveTab] = useState("fuel");
  const { t } = useLanguage();

  const renderContent = () => {
    switch (activeTab) {
      case "fuel":
        return <FuelConsumptionReport />;
      case "driver":
        return <DriverPerformanceReport />;
      case "cost":
        return <CostAnalysisReport />;
      case "maintenance":
        return <MaintenanceHistoryReport />;
      default:
        return <FuelConsumptionReport />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 p-6 overflow-auto bg-gray-50">
        <ReportsHeader />
        <ReportsTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="mt-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
