
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { InspectionHeader } from "@/components/inspections/InspectionHeader";
import { InspectionKPIs } from "@/components/inspections/InspectionKPIs";
import { InspectionTabs } from "@/components/inspections/InspectionTabs";
import { NewInspectionForm } from "@/components/inspections/NewInspectionForm";
import { Button } from "@/components/ui/button";
import { PlusCircle, XCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Inspections() {
  const [showNewInspection, setShowNewInspection] = useState(false);
  const { language } = useLanguage();
  
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
              <h2 className="text-xl font-bold">
                {language === 'en' 
                  ? 'New Inspection' 
                  : language === 'th' 
                    ? 'การตรวจสอบใหม่'
                    : 'Neue Inspektion'}
              </h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowNewInspection(false)}
                className="flex items-center gap-1"
              >
                <XCircle size={16} />
                {language === 'en' 
                  ? 'Cancel' 
                  : language === 'th' 
                    ? 'ยกเลิก'
                    : 'Abbrechen'}
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
              {language === 'en' 
                ? 'New Inspection' 
                : language === 'th' 
                  ? 'การตรวจสอบใหม่'
                  : 'Neue Inspektion'}
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
