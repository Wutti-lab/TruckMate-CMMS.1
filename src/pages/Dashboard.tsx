
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { useDashboardData } from "@/hooks/useDashboardData";
import { DashboardKPIs } from "@/components/dashboard/DashboardKPIs";
import { RecentActivities } from "@/components/dashboard/RecentActivities";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import { CriticalAlertDialog } from "@/components/notifications/CriticalAlertDialog";
import { useRealtimeNotifications } from "@/hooks/useRealtimeNotifications";
import { useNotifications } from "@/contexts/NotificationContext";
import { WelcomeSection } from "@/components/dashboard/WelcomeSection";
import { ChartsSection } from "@/components/dashboard/ChartsSection";
import { MaintenanceAndActions } from "@/components/dashboard/MaintenanceAndActions";
import { UpcomingServices } from "@/components/dashboard/UpcomingServices";

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { stats, loading, refetch } = useDashboardData();
  const { criticalAlerts, dismissCriticalAlert, dismissAllCriticalAlerts } = useNotifications();

  // Initialize real-time notifications
  useRealtimeNotifications();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 p-6 overflow-auto bg-gray-50">
        {/* Welcome Section */}
        <WelcomeSection currentTime={currentTime} />

        {/* Key Metrics Cards */}
        <DashboardKPIs
          totalVehicles={stats.totalVehicles}
          activeVehicles={stats.activeVehicles}
          driversOnDuty={stats.driversOnDuty}
          pendingIssues={stats.pendingIssues}
          upcomingServices={stats.upcomingServices}
          loading={loading}
        />

        {/* Charts and Overview */}
        <ChartsSection fleetStatusData={stats.fleetStatusData} />

        {/* Maintenance Costs and Quick Actions */}
        <MaintenanceAndActions />

        {/* Recent Activity and Upcoming Services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivities 
            activities={stats.recentActivities}
            loading={loading}
          />
          <UpcomingServices />
        </div>
      </main>

      {/* Notification Components */}
      <NotificationCenter />
      <CriticalAlertDialog
        alerts={criticalAlerts}
        onDismiss={dismissCriticalAlert}
        onDismissAll={dismissAllCriticalAlerts}
      />
    </div>
  );
}
