
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/language/LanguageSelector";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export default function Register() {
  const { t, language } = useLanguage();

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

        <Alert className="bg-blue-50 border-blue-200">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>
            {language === 'de' ? "Wichtiger Hinweis" : 
             language === 'th' ? "ข้อมูลสำคัญ" : 
             "Important Information"}
          </AlertTitle>
          <AlertDescription>
            {language === 'de' 
              ? "Nach der Registrierung wird Ihr Konto manuell überprüft. Sie erhalten eine E-Mail, sobald Ihr Konto freigeschaltet ist." 
              : language === 'th' 
              ? "หลังจากลงทะเบียน บัญชีของคุณจะได้รับการตรวจสอบด้วยตนเอง คุณจะได้รับอีเมลเมื่อบัญชีของคุณได้รับการอนุมัติ" 
              : "After registration, your account will be manually reviewed. You will receive an email once your account is approved."}
          </AlertDescription>
        </Alert>

        <RegisterForm />
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            {language === 'de' ? "Haben Sie bereits ein Konto?" : 
             language === 'th' ? "มีบัญชีอยู่แล้ว?" : 
             "Already have an account?"}
            {" "}
            <Link to="/login" className="font-medium text-fleet-600 hover:text-fleet-500">
              {language === 'de' ? "Anmelden" : 
               language === 'th' ? "เข้าสู่ระบบ" : 
               "Log in"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
