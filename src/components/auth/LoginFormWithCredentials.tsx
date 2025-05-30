
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface LoginFormProps {
  email: string;
  password: string;
  rememberMe: boolean;
  isLoading: boolean;
  phoneNumber: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRememberMeChange: (checked: boolean) => void;
  onSubmit: (e: React.FormEvent, method: string) => void;
  onGoogleLogin: () => void;
}

export function LoginFormWithCredentials({
  email,
  password,
  rememberMe,
  isLoading,
  phoneNumber,
  onEmailChange,
  onPasswordChange,
  onPhoneNumberChange,
  onRememberMeChange,
  onSubmit,
  onGoogleLogin
}: LoginFormProps) {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e, "email");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("login")}</CardTitle>
        <CardDescription>
          {t("enterCredentials")}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={onEmailChange}
              required
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
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
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
                className="h-4 w-4 rounded border-gray-300"
                checked={rememberMe}
                onChange={(e) => onRememberMeChange(e.target.checked)}
              />
              <Label htmlFor="remember-me" className="text-sm">
                {t("rememberMe")}
              </Label>
            </div>
            <a href="#" className="text-sm text-fleet-600 hover:underline">
              {t("forgotPassword")}
            </a>
          </div>

          <div className="bg-gray-50 p-3 rounded-md border border-gray-200 text-center">
            <p className="text-sm">{t("noAccount")}</p>
            <Link 
              to="/register" 
              className="text-fleet-600 hover:underline text-sm font-medium block mt-1"
            >
              {t("register")}
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex-col space-y-4">
          <Button
            type="submit"
            className="w-full bg-fleet-600 hover:bg-fleet-700"
            disabled={isLoading}
          >
            {isLoading ? t("loggingIn") : t("loginButton")}
          </Button>
          
          <div className="text-center w-full">
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
