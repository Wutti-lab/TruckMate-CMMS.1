
import React from "react";
import { UserRole } from "@/lib/types/user-roles";
import { AppFunction } from "./types";
import { RoleFunctionsGroup } from "./RoleFunctionsGroup";
import { getFunctionsByRole } from "./utils";

interface AllFunctionsViewProps {
  functions: AppFunction[];
  language: string;
}

export function AllFunctionsView({ functions, language }: AllFunctionsViewProps) {
  // All roles used in the system
  const allRoles = Object.values(UserRole);
  
  return (
    <div className="space-y-8">
      {allRoles.map((role) => {
        const roleFunctions = getFunctionsByRole(functions, role);
        return (
          <RoleFunctionsGroup 
            key={role} 
            role={role} 
            functions={roleFunctions}
            language={language} 
          />
        );
      })}
    </div>
  );
}
