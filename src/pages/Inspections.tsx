
import { Header } from "@/components/layout/Header";
import { InspectionHeader } from "@/components/inspections/InspectionHeader";
import { InspectionKPIs } from "@/components/inspections/InspectionKPIs";
import { InspectionTabs } from "@/components/inspections/InspectionTabs";

export default function Inspections() {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 p-6 overflow-auto">
        <InspectionHeader />
        <div className="mb-8">
          <InspectionKPIs />
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <InspectionTabs />
        </div>
      </main>
    </div>
  );
}
