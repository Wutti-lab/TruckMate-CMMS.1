
import React from "react";
import { Header } from "@/components/layout/Header";
import { BackToDashboard } from "@/components/layout/BackToDashboard";
import { FunctionList } from "@/components/app/FunctionList";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FunctionListPage() {
  const { language } = useLanguage();
  
  const getPageTitle = () => {
    switch(language) {
      case 'de': return 'Detaillierte Funktionsübersicht';
      case 'th': return 'ภาพรวมฟังก์ชันโดยละเอียด';
      default: return 'Detailed Function Overview';
    }
  };

  const getPageDescription = () => {
    switch(language) {
      case 'de': 
        return 'Eine detaillierte Übersicht aller Funktionen der TruckMate CMMS Plattform nach Benutzerrollen';
      case 'th': 
        return 'ภาพรวมโดยละเอียดของฟังก์ชันทั้งหมดของแพลตฟอร์ม TruckMate CMMS ตามบทบาทผู้ใช้';
      default: 
        return 'A detailed overview of all functions in the TruckMate CMMS platform organized by user roles';
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 p-6 overflow-auto">
        <BackToDashboard />
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
