
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { InspectionHeader } from "@/components/inspections/InspectionHeader";
import { InspectionKPIs } from "@/components/inspections/InspectionKPIs";
import { InspectionTabs } from "@/components/inspections/InspectionTabs";
import { NewInspectionForm } from "@/components/inspections/NewInspectionForm";
import { Button } from "@/components/ui/button";
import { PlusCircle, XCircle } from "lucide-react";

export default function Inspections() {
  const [showNewInspection, setShowNewInspection] = useState(false);
  
  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 p-6 overflow-auto">
        <InspectionHeader />
        <div className="mb-8">
          <InspectionKPIs />
        </div>
        
        {showNewInspection ? (
          <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">New Inspection | การตรวจสอบใหม่</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowNewInspection(false)}
                className="flex items-center gap-1"
              >
                <XCircle size={16} />
                Cancel | ยกเลิก
              </Button>
            </div>
            <NewInspectionForm onSubmitSuccess={() => setShowNewInspection(false)} />
          </div>
        ) : (
          <div className="mb-8">
            <Button 
              onClick={() => setShowNewInspection(true)}
              className="flex items-center gap-1"
            >
              <PlusCircle size={16} />
              New Inspection | การตรวจสอบใหม่
            </Button>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow">
          <InspectionTabs />
        </div>
      </main>
    </div>
  );
}
