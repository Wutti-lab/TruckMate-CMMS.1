
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  BarChart, 
  TrendingUp, 
  Users, 
  DollarSign 
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

export function SaasMetrics() {
  const { t } = useLanguage();

  // Sample data for SaaS metrics visualization
  const mrrData = [
    { month: 'Jan', value: 3200 },
    { month: 'Feb', value: 3400 },
    { month: 'Mar', value: 3600 },
    { month: 'Apr', value: 4200 },
    { month: 'May', value: 4800 },
    { month: 'Jun', value: 5400 },
  ];
  
  const metrics = [
    {
      name: t("mrr"),
      icon: <DollarSign className="h-5 w-5 text-fleet-600" />,
      description: "Monthly Recurring Revenue is the predictable revenue stream from all active subscriptions",
      value: "฿ 5,400",
      trend: "+12%",
      trendUp: true
    },
    {
      name: t("churnRate"),
      icon: <Users className="h-5 w-5 text-fleet-600" />,
      description: "The percentage of customers who cancel their subscription in a given period",
      value: "3.2%",
      trend: "-0.5%",
      trendUp: false
    },
    {
      name: t("cac"),
      icon: <BarChart className="h-5 w-5 text-fleet-600" />,
      description: "The cost to acquire a new customer, including marketing and sales expenses",
      value: "฿ 4,200",
      trend: "-8%",
      trendUp: false
    },
    {
      name: t("ltv"),
      icon: <TrendingUp className="h-5 w-5 text-fleet-600" />,
      description: "The projected revenue a customer will generate over their lifetime",
      value: "฿ 42,000",
      trend: "+15%",
      trendUp: true
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {metric.icon}
                  <h3 className="font-medium">{metric.name}</h3>
                </div>
                <span className={`text-sm px-2 py-0.5 rounded-full ${
                  metric.trendUp 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {metric.trend}
                </span>
              </div>
              <p className="text-2xl font-bold mt-2">{metric.value}</p>
              <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* MRR Growth Chart */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium mb-4">MRR Growth Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mrrData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`฿ ${value}`, 'MRR']} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  name="Monthly Recurring Revenue"
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
