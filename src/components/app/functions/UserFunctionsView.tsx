
import React from "react";
import { AppFunction } from "./types";
import { FunctionCard } from "./FunctionCard";
import { getUserFunctions } from "./utils";

interface UserFunctionsViewProps {
  functions: AppFunction[];
  language: string;
  hasRole: (roles: any[]) => boolean;
}

export function UserFunctionsView({ functions, language, hasRole }: UserFunctionsViewProps) {
  const userFunctions = getUserFunctions(functions, hasRole);
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {userFunctions.map((func, index) => (
        <FunctionCard key={index} func={func} language={language} />
      ))}
    </div>
  );
}
