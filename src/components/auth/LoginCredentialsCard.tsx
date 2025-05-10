
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface UserCredential {
  role: string;
  email: string;
  password: string;
}

interface LoginCredentialsCardProps {
  credentials: UserCredential[];
  onSelectCredential: (role: string) => void;
}

export function LoginCredentialsCard({ 
  credentials, 
  onSelectCredential 
}: LoginCredentialsCardProps) {
  const { t } = useLanguage();
  
  return (
    <div className="p-4 border rounded-md bg-gray-50">
      <p className="text-sm font-medium mb-2">
        {t("testAccounts")}
      </p>
      <div className="space-y-1 text-xs">
        {credentials.map((cred, i) => (
          <div 
            key={i} 
            className="flex justify-between hover:bg-gray-100 p-1 rounded cursor-pointer"
            onClick={() => onSelectCredential(cred.role)}
          >
            <span className="font-medium">{cred.role}:</span>
            <span>{cred.email}</span>
          </div>
        ))}
        <div className="border-t pt-1 mt-1">
          <span className="font-medium">
            {t("passwordForAll")}
          </span>
          <span className="ml-2">123456</span>
        </div>
      </div>
    </div>
  );
}
