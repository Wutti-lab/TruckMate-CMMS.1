
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { BackToDashboard } from "@/components/layout/BackToDashboard";
import { ReportsHeader } from "@/components/reports/ReportsHeader";
import { ReportsTabs } from "@/components/reports/ReportsTabs";
import { FuelConsumptionReport } from "@/components/reports/FuelConsumptionReport";
import { DriverPerformanceReport } from "@/components/reports/DriverPerformanceReport";
import { CostAnalysisReport } from "@/components/reports/CostAnalysisReport";
import { MaintenanceHistoryReport } from "@/components/reports/MaintenanceHistoryReport";
import { AnalyticsOverview } from "@/components/analytics/AnalyticsOverview";
import { AdvancedCharts } from "@/components/analytics/AdvancedCharts";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Reports() {
  const [activeTab, setActiveTab] = useState("overview");
  const { t } = useLanguage();

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <AnalyticsOverview />;
      case "advanced":
        return <AdvancedCharts />;
      case "fuel":
        return <FuelConsumptionReport />;
      case "driver":
        return <DriverPerformanceReport />;
      case "cost":
        return <CostAnalysisReport />;
      case "maintenance":
        return <MaintenanceHistoryReport />;
      default:
        return <AnalyticsOverview />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 p-6 overflow-auto bg-gray-50">
        <BackToDashboard />
        <ReportsHeader />
        <ReportsTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="mt-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
