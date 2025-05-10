
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/language/LanguageSelector";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function Register() {
  const { t } = useLanguage();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-fleet-50 to-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/1275ea89-d888-449c-bc6c-295e38039de9.png" 
              alt="TruckMate CMMS Logo" 
              className="h-32 w-auto"
            />
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-fleet-900">
            TruckMate CMMS
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            {t("easyVehicleManagement")}
          </p>
          
          <div className="mt-4">
            <LanguageSelector />
          </div>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
}
