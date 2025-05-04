import { ActivityList } from "@/components/dashboard/ActivityList";

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <ActivityList />
        {/* Other dashboard components */}
      </div>
    </div>
  );
}
