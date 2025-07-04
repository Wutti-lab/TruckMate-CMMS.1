
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface SidebarHeaderProps {
  isExpanded: boolean;
}

export function SidebarHeader({ isExpanded }: SidebarHeaderProps) {
  const { profile } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="p-4 border-b border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 truncate">
        {isExpanded ? 'TruckMate CMMS' : 'TM'}
      </h1>
      {profile && isExpanded && (
        <p className="text-sm text-gray-500 mt-1 truncate">
          {t('loggedInAs')}: {profile.name}
        </p>
      )}
    </div>
  );
}
