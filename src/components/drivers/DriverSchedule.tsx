
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, Activity, MapPin } from "lucide-react";

interface DriverShift {
  driverId: string;
  driverName: string;
  shift: "AM" | "PM";
  date: Date;
  status: string;
  location: string;
  vehicle: string;
}

const currentShifts: DriverShift[] = [
  {
    driverId: "D-001",
    driverName: "Somchai Jaidee",
    shift: "AM",
    date: new Date(2025, 3, 20),
    status: "Active",
    location: "Bangkok",
    vehicle: "B-FR-123"
  },
  {
    driverId: "D-002",
    driverName: "Max Schmidt",
    shift: "PM",
    date: new Date(2025, 3, 20),
    status: "Off-duty",
    location: "Pattaya",
    vehicle: "B-FR-456"
  },
  {
    driverId: "D-003",
    driverName: "Pranee Suksawat",
    shift: "AM",
    date: new Date(2025, 3, 21),
    status: "Active",
    location: "Chiang Mai",
    vehicle: "B-FR-789"
  }
];

export function DriverSchedule() {
  const [date, setDate] = useState<Date>(new Date());

  const shiftsForSelectedDate = currentShifts.filter(
    shift => shift.date.toDateString() === date.toDateString()
  );

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Schichtplan & Aktivitäten | ตารางกะและกิจกรรม</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              className="rounded-md border"
            />
          </div>
          <div>
            <h3 className="font-semibold mb-4">
              Schichten für {date.toLocaleDateString()} | กะสำหรับ {date.toLocaleDateString('th-TH')}
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Frühschicht (AM) | กะเช้า
                </h4>
                <div className="space-y-2">
                  {shiftsForSelectedDate
                    .filter(shift => shift.shift === "AM")
                    .map(shift => (
                      <div key={shift.driverId} className="flex flex-col gap-2 p-2 border rounded-md">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="bg-green-50">
                            {shift.driverName}
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className={
                              shift.status === "Active"
                                ? "border-green-200 bg-green-50 text-green-600"
                                : "border-orange-200 bg-orange-50 text-orange-600"
                            }
                          >
                            {shift.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {shift.location} - {shift.vehicle}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Spätschicht (PM) | กะบ่าย
                </h4>
                <div className="space-y-2">
                  {shiftsForSelectedDate
                    .filter(shift => shift.shift === "PM")
                    .map(shift => (
                      <div key={shift.driverId} className="flex flex-col gap-2 p-2 border rounded-md">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="bg-blue-50">
                            {shift.driverName}
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className={
                              shift.status === "Active"
                                ? "border-green-200 bg-green-50 text-green-600"
                                : "border-orange-200 bg-orange-50 text-orange-600"
                            }
                          >
                            {shift.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {shift.location} - {shift.vehicle}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
