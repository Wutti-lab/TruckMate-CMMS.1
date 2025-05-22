
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/language/LanguageSelector";
import { LoginFormWithCredentials } from "@/components/auth/LoginFormWithCredentials";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const { login, loginWithPhone, loginWithGoogle } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent, method: string) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (method === "email") {
        await login(email, password);
      } else if (method === "phone") {
        await loginWithPhone(phoneNumber, password);
      }
      
      toast({
        title: t("loginSuccessful"),
        description: t("welcomeTo"),
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("loginFailed"),
        description: method === "email" ? t("invalidCredentials") : t("invalidPhoneCredentials"),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
      toast({
        title: t("loginSuccessful"),
        description: t("welcomeTo"),
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("loginFailed"),
        description: t("googleLoginFailed"),
      });
    } finally {
      setIsLoading(false);
    }
  };

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

        <LoginFormWithCredentials
          email={email}
          password={password}
          phoneNumber={phoneNumber}
          rememberMe={rememberMe}
          isLoading={isLoading}
          onEmailChange={(e) => setEmail(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onPhoneNumberChange={(e) => setPhoneNumber(e.target.value)}
          onRememberMeChange={setRememberMe}
          onSubmit={handleSubmit}
          onGoogleLogin={handleGoogleLogin}
        />
      </div>
    </div>
  );
}
