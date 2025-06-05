
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Settings, LogOut, User } from "lucide-react";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ProfileSettingsModal } from "./ProfileSettingsModal";

export function HeaderProfile() {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleProfileSettings = () => {
    setShowProfileSettings(true);
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">
          {language === 'de' ? 'Angemeldet als:' : 
           language === 'th' ? 'เข้าสู่ระบบในฐานะ:' : 
           'Logged in as:'} <strong>{profile?.name}</strong> ({profile?.role})
        </span>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleProfileSettings}>
              <User className="h-4 w-4 mr-2" />
              {language === 'de' ? 'Profil Einstellungen' : 
               language === 'th' ? 'การตั้งค่าโปรไฟล์' : 
               'Profile Settings'}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-4 w-4 mr-2" />
              {language === 'de' ? 'System Einstellungen' : 
               language === 'th' ? 'การตั้งค่าระบบ' : 
               'System Preferences'}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              <LogOut className="h-4 w-4 mr-2" />
              {language === 'de' ? 'Abmelden' : 
               language === 'th' ? 'ออกจากระบบ' : 
               'Logout'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ProfileSettingsModal 
        open={showProfileSettings}
        onOpenChange={setShowProfileSettings}
      />
    </>
  );
}
