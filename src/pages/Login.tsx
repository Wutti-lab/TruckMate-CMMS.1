
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Globe, Languages } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const userCredentials = [
  { role: 'Admin', email: 'admin@truckmate.com', password: '123456' },
  { role: 'Fleet Manager', email: 'fleet@truckmate.com', password: '123456' },
  { role: 'Driver', email: 'driver@truckmate.com', password: '123456' },
  { role: 'Mechanic', email: 'mechanic@truckmate.com', password: '123456' },
  { role: 'Dispatcher', email: 'dispatcher@truckmate.com', password: '123456' },
];

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast({
        title: t("loginSuccessful"),
        description: t("welcomeTo"),
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("loginFailed"),
        description: t("invalidCredentials"),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const fillCredentials = (role: string) => {
    const user = userCredentials.find(user => user.role === role);
    if (user) {
      setEmail(user.email);
      setPassword(user.password);
    }
  };
  
  const handleLanguageChange = (value: string) => {
    setLanguage(value as Language);
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
          
          <div className="mt-4 flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-[180px] justify-between">
                  <div className="flex items-center gap-2">
                    <Languages className="h-4 w-4" />
                    {language === 'en' ? 'English' : language === 'th' ? 'ไทย' : 'Deutsch'}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('th')}>
                  ไทย (Thai)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('de')}>
                  Deutsch (German)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

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
                  onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
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
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <Label htmlFor="remember-me" className="text-sm">
                    {t("rememberMe")}
                  </Label>
                </div>
                <a href="#" className="text-sm text-fleet-600 hover:underline">
                  {t("forgotPassword")}
                </a>
              </div>

              <div className="p-4 border rounded-md bg-gray-50">
                <p className="text-sm font-medium mb-2">
                  {t("testAccounts")}
                </p>
                <div className="space-y-1 text-xs">
                  {userCredentials.map((cred, i) => (
                    <div 
                      key={i} 
                      className="flex justify-between hover:bg-gray-100 p-1 rounded cursor-pointer"
                      onClick={() => fillCredentials(cred.role)}
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
      </div>
    </div>
  );
}
