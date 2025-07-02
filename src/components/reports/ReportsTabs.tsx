
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Fuel, Users, DollarSign, Wrench } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ReportsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function ReportsTabs({ activeTab, onTabChange }: ReportsTabsProps) {
  const { language } = useLanguage();

  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="fuel" className="flex items-center gap-2">
          <Fuel className="h-4 w-4" />
          {language === 'de' ? 'Kraftstoff' : language === 'th' ? 'เชื้อเพลิง' : 'Fuel'}
        </TabsTrigger>
        <TabsTrigger value="driver" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          {language === 'de' ? 'Fahrer' : language === 'th' ? 'คนขับ' : 'Drivers'}
        </TabsTrigger>
        <TabsTrigger value="cost" className="flex items-center gap-2">
          <DollarSign className="h-4 w-4" />
          {language === 'de' ? 'Kosten' : language === 'th' ? 'ต้นทุน' : 'Costs'}
        </TabsTrigger>
        <TabsTrigger value="maintenance" className="flex items-center gap-2">
          <Wrench className="h-4 w-4" />
          {language === 'de' ? 'Wartung' : language === 'th' ? 'การบำรุงรักษา' : 'Maintenance'}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
