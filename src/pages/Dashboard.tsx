
import React, { useState, useEffect, memo, Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { WelcomeSection } from "@/components/dashboard/WelcomeSection";
import { DashboardKPIs } from "@/components/dashboard/DashboardKPIs";
import { ChartsSection } from "@/components/dashboard/ChartsSection";
import { RecentActivities } from "@/components/dashboard/RecentActivities";
import { MaintenanceAndActions } from "@/components/dashboard/MaintenanceAndActions";
import { UpcomingServices } from "@/components/dashboard/UpcomingServices";
import { RealtimeMetrics } from "@/components/dashboard/RealtimeMetrics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdBanner } from "@/components/ads/AdBanner";
import { useTranslation } from "@/hooks/useTranslation";
import { useDashboardData } from "@/hooks/useDashboardData";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { MobileOptimized } from "@/components/shared/mobile/MobileOptimized";
import { useIsMobile } from "@/hooks/use-mobile";

// Lazy load heavy components
const LiveActivityFeed = React.lazy(() => 
  import("@/components/dashboard/LiveActivityFeed").then(module => ({ default: module.LiveActivityFeed }))
);
const FleetAnalytics = React.lazy(() => 
  import("@/components/analytics/FleetAnalytics").then(module => ({ default: module.FleetAnalytics }))
);
const AlertsManager = React.lazy(() => 
  import("@/components/notifications/AlertsManager").then(module => ({ default: module.AlertsManager }))
);

// Memoized components for performance
const MemoizedDashboardKPIs = memo(DashboardKPIs);
const MemoizedChartsSection = memo(ChartsSection);
const MemoizedRecentActivities = memo(RecentActivities);

export default function Dashboard() {
  const { t } = useTranslation();
  const { stats, loading } = useDashboardData();
  const [currentTime, setCurrentTime] = useState(new Date());
  const isMobile = useIsMobile();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <ErrorBoundary>
      <MobileOptimized enableSwipe={isMobile}>
        <div className="flex flex-col h-full">
          <Header />
          <AdBanner position="top" />
          
          <main className="flex-1 overflow-auto p-6">
            <WelcomeSection currentTime={currentTime} />
            
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2 gap-2' : 'grid-cols-4'}`}>
                <TabsTrigger value="overview">{t('overview') || 'Overview'}</TabsTrigger>
                <TabsTrigger value="analytics">{t('analytics') || 'Analytics'}</TabsTrigger>
                {!isMobile && <TabsTrigger value="alerts">{t('alerts') || 'Alerts'}</TabsTrigger>}
                {!isMobile && <TabsTrigger value="activity">{t('activity') || 'Activity'}</TabsTrigger>}
              </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <ErrorBoundary>
                <RealtimeMetrics />
              </ErrorBoundary>
              
              <ErrorBoundary>
                <MemoizedDashboardKPIs
                  totalVehicles={stats.totalVehicles}
                  activeVehicles={stats.activeVehicles}
                  driversOnDuty={stats.driversOnDuty}
                  pendingIssues={stats.pendingIssues}
                  upcomingServices={stats.upcomingServices}
                  loading={loading}
                />
              </ErrorBoundary>
              
              <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
                <div className="space-y-6">
                  <ErrorBoundary>
                    <MemoizedChartsSection fleetStatusData={stats.fleetStatusData} />
                  </ErrorBoundary>
                  <ErrorBoundary>
                    <MaintenanceAndActions />
                  </ErrorBoundary>
                </div>
                <div className="space-y-6">
                  <ErrorBoundary>
                    <MemoizedRecentActivities activities={stats.recentActivities} loading={loading} />
                  </ErrorBoundary>
                  <ErrorBoundary>
                    <UpcomingServices />
                  </ErrorBoundary>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics">
              <ErrorBoundary>
                <Suspense fallback={<LoadingSpinner size="lg" className="mx-auto" />}>
                  <FleetAnalytics />
                </Suspense>
              </ErrorBoundary>
            </TabsContent>
            
            <TabsContent value="alerts">
              <ErrorBoundary>
                <Suspense fallback={<LoadingSpinner size="lg" className="mx-auto" />}>
                  <AlertsManager />
                </Suspense>
              </ErrorBoundary>
            </TabsContent>
            
            <TabsContent value="activity">
              <ErrorBoundary>
                <Suspense fallback={<LoadingSpinner size="lg" className="mx-auto" />}>
                  <LiveActivityFeed />
                </Suspense>
              </ErrorBoundary>
            </TabsContent>
            
            {isMobile && (
              <>
                <TabsContent value="alerts">
                  <ErrorBoundary>
                    <Suspense fallback={<LoadingSpinner size="lg" className="mx-auto" />}>
                      <AlertsManager />
                    </Suspense>
                  </ErrorBoundary>
                </TabsContent>
                
                <TabsContent value="activity">
                  <ErrorBoundary>
                    <Suspense fallback={<LoadingSpinner size="lg" className="mx-auto" />}>
                      <LiveActivityFeed />
                    </Suspense>
                  </ErrorBoundary>
                </TabsContent>
              </>
            )}
          </Tabs>
        </main>
        </div>
      </MobileOptimized>
    </ErrorBoundary>
  );
}
