
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";

export function DriverSchedule() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { language } = useLanguage();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{extractLanguageText("Schedule & Activities | ตารางกะและกิจกรรม", language)}</CardTitle>
        <Button size="sm" variant="outline" className="gap-1">
          <Plus size={14} />
          <span>{extractLanguageText("Add Activity | เพิ่มกิจกรรม", language)}</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>
          <div>
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">
                {extractLanguageText("Shifts for | กะสำหรับ", language)} {date?.toLocaleDateString()}
              </h4>
              <div className="space-y-2">
                <div className="p-3 border rounded-md bg-blue-50">
                  <Badge className="bg-blue-500 mb-1">{extractLanguageText("Morning Shift (AM) | กะเช้า", language)}</Badge>
                  <div className="text-sm space-y-1">
                    <p>Somchai Jaidee</p>
                    <p>Pranee Suksawat</p>
                    <p>Apinya Thongchai</p>
                  </div>
                </div>
                <div className="p-3 border rounded-md bg-purple-50">
                  <Badge className="bg-purple-500 mb-1">{extractLanguageText("Afternoon Shift (PM) | กะบ่าย", language)}</Badge>
                  <div className="text-sm space-y-1">
                    <p>Max Schmidt</p>
                    <p>Thomas Weber</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
