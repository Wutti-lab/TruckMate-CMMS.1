
import { Header } from "@/components/layout/Header";
import { WelcomeSection } from "@/components/dashboard/WelcomeSection";
import { DashboardKPIs } from "@/components/dashboard/DashboardKPIs";
import { ChartsSection } from "@/components/dashboard/ChartsSection";
import { RecentActivities } from "@/components/dashboard/RecentActivities";
import { MaintenanceAndActions } from "@/components/dashboard/MaintenanceAndActions";
import { UpcomingServices } from "@/components/dashboard/UpcomingServices";
import { RealtimeMetrics } from "@/components/dashboard/RealtimeMetrics";
import { LiveActivityFeed } from "@/components/dashboard/LiveActivityFeed";
import { FleetAnalytics } from "@/components/analytics/FleetAnalytics";
import { AlertsManager } from "@/components/notifications/AlertsManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdBanner } from "@/components/ads/AdBanner";
import { useTranslation } from "@/hooks/useTranslation";

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-full">
      <Header />
      <AdBanner position="top" />
      
      <main className="flex-1 overflow-auto p-6">
        <WelcomeSection />
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <RealtimeMetrics />
            <DashboardKPIs />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <ChartsSection />
                <MaintenanceAndActions />
              </div>
              <div className="space-y-6">
                <RecentActivities />
                <UpcomingServices />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics">
            <FleetAnalytics />
          </TabsContent>
          
          <TabsContent value="alerts">
            <AlertsManager />
          </TabsContent>
          
          <TabsContent value="activity">
            <LiveActivityFeed />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
