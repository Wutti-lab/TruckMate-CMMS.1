
import React from "react";
import { UserRole } from "@/lib/types/user-roles";
import { AppFunction } from "./types";
import { FunctionCard } from "./FunctionCard";
import { getRoleLabel } from "./utils";

interface RoleFunctionsGroupProps {
  role: UserRole;
  functions: AppFunction[];
  language: string;
}

export function RoleFunctionsGroup({ role, functions, language }: RoleFunctionsGroupProps) {
  if (functions.length === 0) return null;
  
  return (
    <div className="border-t pt-4 first:border-t-0 first:pt-0">
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        <span className="inline-block w-3 h-3 rounded-full bg-fleet-500 mr-2"></span>
        {getRoleLabel(role, language)}
        <span className="text-sm ml-2 text-muted-foreground">
          ({functions.length} {language === 'de' ? 'Funktionen' : 
                            language === 'th' ? 'ฟังก์ชัน' : 
                            'functions'})
        </span>
      </h3>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {functions.map((func, index) => (
          <FunctionCard key={index} func={func} language={language} />
        ))}
      </div>
    </div>
  );
}
