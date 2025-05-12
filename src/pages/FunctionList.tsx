
import React from "react";
import { Header } from "@/components/layout/Header";
import { FunctionList } from "@/components/app/FunctionList";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FunctionListPage() {
  const { language } = useLanguage();
  
  const getPageTitle = () => {
    switch(language) {
      case 'de': return 'Funktionsübersicht';
      case 'th': return 'ภาพรวมฟังก์ชัน';
      default: return 'Function Overview';
    }
  };

  const getPageDescription = () => {
    switch(language) {
      case 'de': 
        return 'Eine Übersicht aller Funktionen der TruckMate CMMS Plattform';
      case 'th': 
        return 'ภาพรวมของฟังก์ชันทั้งหมดของแพลตฟอร์ม TruckMate CMMS';
      default: 
        return 'An overview of all functions in the TruckMate CMMS platform';
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{getPageTitle()}</h1>
            <p className="text-muted-foreground">{getPageDescription()}</p>
          </div>
          
          <FunctionList />
        </div>
      </main>
    </div>
  );
}
