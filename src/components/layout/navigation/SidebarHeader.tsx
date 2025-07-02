
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/hooks/useTranslation';

interface SidebarHeaderProps {
  isExpanded: boolean;
}

export function SidebarHeader({ isExpanded }: SidebarHeaderProps) {
  const { profile } = useAuth();
  const { tWithFallback } = useTranslation();

  return (
    <div className="p-4 border-b border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 truncate">
        {isExpanded ? 'TruckMate CMMS' : 'TM'}
      </h1>
      {profile && isExpanded && (
        <p className="text-sm text-gray-500 mt-1 truncate">
          {tWithFallback('Logged in as | ลงชื่อเข้าใช้ในชื่อ | Angemeldet als')}: {profile.name}
        </p>
      )}
    </div>
  );
}
