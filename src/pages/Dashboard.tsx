
import React, { useState, useEffect, memo, Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { WelcomeSection } from "@/components/dashboard/WelcomeSection";
import { DashboardKPIs } from "@/components/dashboard/DashboardKPIs";
import { ChartsSection } from "@/components/dashboard/ChartsSection";
import { RecentActivities } from "@/components/dashboard/RecentActivities";
import { MaintenanceAndActions } from "@/components/dashboard/MaintenanceAndActions";
import { UpcomingServices } from "@/components/dashboard/UpcomingServices";
import { RealtimeMetrics } from "@/components/dashboard/RealtimeMetrics";
import { EnhancedRealtimePanel } from "@/components/dashboard/EnhancedRealtimePanel";
import { QuickMapAccess } from "@/components/dashboard/QuickMapAccess";
import { MaintenanceAlertsManager } from "@/components/notifications/MaintenanceAlertsManager";
import { FleetOverviewWidget } from "@/components/dashboard/FleetOverviewWidget";
import { DriverActivityWidget } from "@/components/dashboard/DriverActivityWidget";
import { VehicleStatusWidget } from "@/components/dashboard/VehicleStatusWidget";
import { MaintenanceAlertsWidget } from "@/components/dashboard/MaintenanceAlertsWidget";
import { LastInspectionsWidget } from "@/components/dashboard/LastInspectionsWidget";
import { FuelConsumptionWidget } from "@/components/dashboard/FuelConsumptionWidget";
import { VehicleAvailabilityWidget } from "@/components/dashboard/VehicleAvailabilityWidget";
import { DashboardQuickActions } from "@/components/dashboard/DashboardQuickActions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdBanner } from "@/components/ads/AdBanner";
import { useLanguage } from "@/contexts/LanguageContext";
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
  const { t } = useLanguage();
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
              {/* Enhanced KPIs Section */}
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

              {/* Fleet Overview Section */}
              <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
                <ErrorBoundary>
                  <FleetOverviewWidget
                    totalVehicles={stats.totalVehicles}
                    activeVehicles={stats.activeVehicles}
                    maintenanceVehicles={stats.fleetStatusData.find(d => d.name === 'Maintenance')?.count || 0}
                    inactiveVehicles={stats.fleetStatusData.find(d => d.name === 'Out of Service')?.count || 0}
                  />
                </ErrorBoundary>
                <ErrorBoundary>
                  <DriverActivityWidget />
                </ErrorBoundary>
              </div>

              {/* Vehicle Status Widgets */}
              <ErrorBoundary>
                <VehicleStatusWidget 
                  data={stats.fleetStatusData} 
                  totalVehicles={stats.totalVehicles}
                />
              </ErrorBoundary>

              {/* Maintenance & Inspections Section */}
              <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
                <ErrorBoundary>
                  <MaintenanceAlertsWidget />
                </ErrorBoundary>
                <ErrorBoundary>
                  <LastInspectionsWidget />
                </ErrorBoundary>
              </div>

              {/* Fuel & Availability Section */}
              <ErrorBoundary>
                <FuelConsumptionWidget />
              </ErrorBoundary>

              <ErrorBoundary>
                <VehicleAvailabilityWidget />
              </ErrorBoundary>

              {/* Real-time & Quick Actions */}
              <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
                <ErrorBoundary>
                  <DashboardQuickActions />
                </ErrorBoundary>
                <ErrorBoundary>
                  <QuickMapAccess />
                </ErrorBoundary>
              </div>

              {/* Enhanced Real-time Panel */}
              <ErrorBoundary>
                <EnhancedRealtimePanel />
              </ErrorBoundary>
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
