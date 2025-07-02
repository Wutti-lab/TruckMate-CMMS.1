
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface SidebarHeaderProps {
  isExpanded: boolean;
}

export function SidebarHeader({ isExpanded }: SidebarHeaderProps) {
  const { profile } = useAuth();
  const { language } = useLanguage();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800">
        {isExpanded ? 'TruckMate CMMS' : 'TM'}
      </h1>
      {profile && isExpanded && (
        <p className="text-sm text-gray-500 mt-1">
          {language === 'de' ? 'Angemeldet als' : language === 'th' ? 'ลงชื่อเข้าใช้ในชื่อ' : 'Logged in as'}: {profile.name}
        </p>
      )}
    </div>
  );
}
