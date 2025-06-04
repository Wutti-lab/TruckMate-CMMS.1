
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Settings, LogOut } from "lucide-react";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function HeaderProfile() {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600">
        Logged in as: <strong>{profile?.name}</strong> ({profile?.role})
      </span>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            {extractLanguageText("Profile Settings | การตั้งค่าโปรไฟล์", language)}
          </DropdownMenuItem>
          <DropdownMenuItem>
            {extractLanguageText("System Preferences | การตั้งค่าระบบ", language)}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="text-red-600">
            <LogOut className="h-4 w-4 mr-2" />
            {extractLanguageText("Logout | ออกจากระบบ", language)}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
