import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, Activity, MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";

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

interface ActivityFormData {
  driverId: string;
  activityType: string;
  description: string;
  date: Date;
}

export function DriverSchedule() {
  const [date, setDate] = useState<Date>(new Date());
  const form = useForm<ActivityFormData>();

  const shiftsForSelectedDate = currentShifts.filter(
    shift => shift.date.toDateString() === date.toDateString()
  );

  const handleSubmit = (data: ActivityFormData) => {
    console.log("New activity:", data);
    // Here you would typically save the activity to your backend
  };

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Schedule & Activities | ตารางกะและกิจกรรม</CardTitle>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Activity | เพิ่มกิจกรรม
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add New Activity | เพิ่มกิจกรรมใหม่</SheetTitle>
            </SheetHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="driverId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Driver | พนักงานขับรถ</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select driver" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {currentShifts.map((shift) => (
                            <SelectItem key={shift.driverId} value={shift.driverId}>
                              {shift.driverName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="activityType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Activity Type | ประเภทกิจกรรม</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="training">Training | การฝึกอบรม</SelectItem>
                          <SelectItem value="inspection">Vehicle Inspection | ตรวจสอบยานพาหนะ</SelectItem>
                          <SelectItem value="meeting">Meeting | การประชุม</SelectItem>
                          <SelectItem value="break">Break | พัก</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description | รายละเอียด</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Add Activity | เพิ่มกิจกรรม
                </Button>
              </form>
            </Form>
          </SheetContent>
        </Sheet>
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
              Shifts for | กะสำหรับ {date.toLocaleDateString()}
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Morning Shift (AM) | กะเช้า
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
                  Afternoon Shift (PM) | กะบ่าย
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
