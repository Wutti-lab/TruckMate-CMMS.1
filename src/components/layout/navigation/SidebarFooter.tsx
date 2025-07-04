
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

interface SidebarFooterProps {
  isExpanded: boolean;
}

export function SidebarFooter({ isExpanded }: SidebarFooterProps) {
  const { logout } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="p-4 border-t border-gray-200">
      {isExpanded ? (
        <Button
          onClick={logout}
          variant="destructive"
          className="w-full"
          size="sm"
        >
          <LogOut className="h-4 w-4 mr-2" />
          {t('logout')}
        </Button>
      ) : (
        <Button
          onClick={logout}
          variant="destructive"
          size="icon"
          className="w-full"
          title={t('logout')}
        >
          <LogOut className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
