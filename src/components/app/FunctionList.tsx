
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { appFunctions } from "./functions/function-data";
import { UserFunctionsView } from "./functions/UserFunctionsView";
import { AllFunctionsView } from "./functions/AllFunctionsView";
import { getViewTitle, getTabLabel } from "./functions/utils";

export function FunctionList() {
  const { language } = useLanguage();
  const { hasRole } = useAuth();
  const [viewMode, setViewMode] = useState<"user" | "all">("user");
  
  return (
    <div className="space-y-6">
      <div className="border rounded-lg p-4 bg-white shadow-sm">
        <h2 className="text-xl font-semibold mb-4">
          {getViewTitle(language)}
        </h2>
        
        <Tabs defaultValue={viewMode} onValueChange={(value) => setViewMode(value as "user" | "all")}>
          <TabsList className="mb-4">
            <TabsTrigger value="user">
              {getTabLabel('user', language)}
            </TabsTrigger>
            <TabsTrigger value="all">
              {getTabLabel('all', language)}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="user" className="mt-0">
            <UserFunctionsView 
              functions={appFunctions} 
              language={language}
              hasRole={hasRole}
            />
          </TabsContent>
          
          <TabsContent value="all" className="mt-0">
            <AllFunctionsView 
              functions={appFunctions}
              language={language}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
