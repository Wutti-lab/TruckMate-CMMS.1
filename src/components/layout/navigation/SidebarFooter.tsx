
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface SidebarFooterProps {
  isExpanded: boolean;
}

export function SidebarFooter({ isExpanded }: SidebarFooterProps) {
  const { logout } = useAuth();
  const { language } = useLanguage();

  return (
    <div className="p-4">
      {isExpanded && (
        <button
          onClick={logout}
          className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
        >
          {language === 'de' ? 'Abmelden' : language === 'th' ? 'ออกจากระบบ' : 'Logout'}
        </button>
      )}
    </div>
  );
}
