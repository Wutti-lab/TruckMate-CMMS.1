
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [language, setLanguage] = useState("en");
  const [rememberMe, setRememberMe] = useState(false);
  
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast({
        title: language === "en" ? "Login successful" : "เข้าสู่ระบบสำเร็จ",
        description: language === "en" ? "Welcome to TruckMate CMMS" : "ยินดีต้อนรับสู่ TruckMate CMMS",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: language === "en" ? "Login failed" : "เข้าสู่ระบบล้มเหลว",
        description: language === "en" 
          ? "Invalid email or password. Please try again." 
          : "อีเมลหรือรหัสผ่านไม่ถูกต้อง โปรดลองอีกครั้ง",
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
  
  const getLoginText = () => {
    return language === "en" ? "Log in" : "เข้าสู่ระบบ";
  };
  
  const getLoadingText = () => {
    return language === "en" ? "Logging in..." : "กำลังเข้าสู่ระบบ...";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-fleet-50 to-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-fleet-900">
            TruckMate CMMS
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            {language === "en" ? "Easy vehicle management system" : "ระบบจัดการยานพาหนะที่ง่ายดาย"}
          </p>
          
          <div className="mt-4 flex justify-center">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <SelectValue placeholder="Select Language" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="th">ไทย (Thai)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{language === "en" ? "Login" : "เข้าสู่ระบบ"}</CardTitle>
            <CardDescription>
              {language === "en" 
                ? "Enter your credentials to access your account" 
                : "ป้อนข้อมูลประจำตัวของคุณเพื่อเข้าถึงบัญชีของคุณ"}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{language === "en" ? "Email" : "อีเมล"}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={language === "en" ? "name@example.com" : "ชื่อ@ตัวอย่าง.com"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{language === "en" ? "Password" : "รหัสผ่าน"}</Label>
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
                    {language === "en" ? "Remember me" : "จดจำฉัน"}
                  </Label>
                </div>
                <a href="#" className="text-sm text-fleet-600 hover:underline">
                  {language === "en" ? "Forgot password?" : "ลืมรหัสผ่าน?"}
                </a>
              </div>

              <div className="p-4 border rounded-md bg-gray-50">
                <p className="text-sm font-medium mb-2">
                  {language === "en" ? "Test Accounts:" : "บัญชีทดสอบ:"}
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
                      {language === "en" ? "Password for all:" : "รหัสผ่านทั้งหมด:"}
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
                {isLoading ? getLoadingText() : getLoginText()}
              </Button>
              
              <div className="text-center w-full">
                <Link 
                  to="/pricing" 
                  className="text-fleet-600 hover:underline text-sm font-medium"
                >
                  {language === "en" ? "View pricing plans" : "ดูแผนราคา"}
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
