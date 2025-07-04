import { useLocation, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Home } from 'lucide-react';

export function AppBreadcrumb() {
  const location = useLocation();
  const { t } = useLanguage();
  
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // Don't show breadcrumb on auth pages
  if (['/login', '/register', '/reset-password', '/set-new-password', '/admin-setup'].includes(location.pathname)) {
    return null;
  }
  
  // Route mapping for breadcrumb labels
  const routeMap: Record<string, string> = {
    'dashboard': 'breadcrumb.dashboard',
    'vehicles': 'breadcrumb.vehicles',
    'drivers': 'breadcrumb.drivers',
    'map': 'breadcrumb.map',
    'inspections': 'breadcrumb.inspections',
    'reports': 'breadcrumb.reports',
    'qr-scanner': 'breadcrumb.qrScanner',
    'accounts': 'breadcrumb.accounts',
    'customers': 'breadcrumb.customers',
    'pricing': 'breadcrumb.pricing',
    'advertisements': 'breadcrumb.advertisements',
    'functions': 'breadcrumb.functions'
  };

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        {/* Home/Dashboard link */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link 
              to="/dashboard" 
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home className="h-4 w-4" />
              {t('breadcrumb.home')}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {/* Current page segments */}
        {pathSegments.length > 0 && location.pathname !== '/dashboard' && (
          <>
            <BreadcrumbSeparator />
            {pathSegments.map((segment, index) => {
              const path = '/' + pathSegments.slice(0, index + 1).join('/');
              const isLast = index === pathSegments.length - 1;
              const labelKey = routeMap[segment] || segment;
              
              return (
                <BreadcrumbItem key={path}>
                  {isLast ? (
                    <BreadcrumbPage className="font-medium text-foreground">
                      {t(labelKey)}
                    </BreadcrumbPage>
                  ) : (
                    <>
                      <BreadcrumbLink asChild>
                        <Link 
                          to={path}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {t(labelKey)}
                        </Link>
                      </BreadcrumbLink>
                      <BreadcrumbSeparator />
                    </>
                  )}
                </BreadcrumbItem>
              );
            })}
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}