
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
        <div className="mb-6">
          <InspectionKPIs />
        </div>
        <InspectionTabs />
      </main>
    </div>
  );
}
