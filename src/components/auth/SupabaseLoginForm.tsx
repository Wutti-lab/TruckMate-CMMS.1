
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface SupabaseLoginFormProps {
  email: string;
  password: string;
  rememberMe: boolean;
  isLoading: boolean;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRememberMeChange: (checked: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function SupabaseLoginForm({
  email,
  password,
  rememberMe,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onRememberMeChange,
  onSubmit
}: SupabaseLoginFormProps) {
  const { t, language } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className="shadow-lg border border-gray-200">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          {t("login")}
        </CardTitle>
        <CardDescription className="text-center">
          {t("enterCredentials")}
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              type="email"
              placeholder={language === 'de' ? "ihre.email@beispiel.de" : 
                         language === 'th' ? "อีเมลของคุณ@ตัวอย่าง.com" : 
                         "your.email@example.com"}
              value={email}
              onChange={onEmailChange}
              required
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">{t("password")}</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={onPasswordChange}
                required
                className="w-full pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={toggleShowPassword}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember-me"
                className="h-4 w-4 rounded border-gray-300 text-fleet-600 focus:ring-fleet-500"
                checked={rememberMe}
                onChange={(e) => onRememberMeChange(e.target.checked)}
              />
              <Label htmlFor="remember-me" className="text-sm text-gray-600">
                {t("rememberMe")}
              </Label>
            </div>
            <a href="#" className="text-sm text-fleet-600 hover:underline">
              {t("forgotPassword")}
            </a>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
            <p className="text-sm text-gray-600 mb-2">{t("noAccount")}</p>
            <Link 
              to="/register" 
              className="text-fleet-600 hover:underline text-sm font-medium"
            >
              {t("register")}
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex-col space-y-3">
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2"
            disabled={isLoading}
          >
            {isLoading ? t("loggingIn") : t("loginButton")}
          </Button>
          
          <div className="text-center pt-2">
            <Link 
              to="/pricing" 
              className="text-fleet-600 hover:underline text-sm font-medium"
            >
              {t("viewPricingPlans")}
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
