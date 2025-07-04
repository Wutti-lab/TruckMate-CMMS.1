
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, User, MapPin, Phone, Car, Clock } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EditDriverForm } from "./EditDriverForm";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";

interface Driver {
  id: string;
  name: string;
  licenseType: string;
  phone: string;
  status: string;
  location: string;
  vehicle: string;
  lastTrip: string;
  hoursThisWeek: number;
  shift?: "AM" | "PM";
}

interface DriverTableProps {
  drivers: Driver[];
}

export function DriverTable({ drivers: initialDrivers }: DriverTableProps) {
  const { toast } = useToast();
  const { language } = useLanguage();
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [editDriverOpen, setEditDriverOpen] = useState(false);
  const [messageDriverOpen, setMessageDriverOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  const handleViewDetails = (driver: Driver) => {
    setSelectedDriver(driver);
    setViewDetailsOpen(true);
  };

  const handleEditDriver = (driver: Driver) => {
    setSelectedDriver(driver);
    setEditDriverOpen(true);
  };

  const handleMessageDriver = (driver: Driver) => {
    setSelectedDriver(driver);
    setMessageDriverOpen(true);
  };

  const handleScheduleDriver = (driver: Driver) => {
    setSelectedDriver(driver);
    setScheduleOpen(true);
  };

  const handleDeactivateDriver = (driver: Driver) => {
    // Create a new array with the updated driver status
    const updatedDrivers = drivers.map(d => 
      d.id === driver.id ? { ...d, status: "Deactivated" } : d
    );
    
    // Update the state with the new array
    setDrivers(updatedDrivers);
    
    toast({
      title: "Driver deactivated",
      description: `${driver.name} has been deactivated.`,
    });
  };

  const handleUpdateDriver = (updatedDriver: Partial<Driver>) => {
    if (!selectedDriver) return;
    
    // Create a new array with the updated driver
    const updatedDrivers = drivers.map(d => 
      d.id === selectedDriver.id ? { ...d, ...updatedDriver } : d
    );
    
    // Update the state with the new array
    setDrivers(updatedDrivers);
    
    // Close the edit form
    setEditDriverOpen(false);
    
    // Show success toast
    toast({
      title: "Driver updated",
      description: `${selectedDriver.name} has been updated successfully.`
    });
  };

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{extractLanguageText("Driver ID | รหัสคนขับ", language)}</TableHead>
              <TableHead>{extractLanguageText("Name | ชื่อ", language)}</TableHead>
              <TableHead>{extractLanguageText("Status | สถานะ", language)}</TableHead>
              <TableHead>{extractLanguageText("Shift | กะ", language)}</TableHead>
              <TableHead>{extractLanguageText("License | ใบอนุญาต", language)}</TableHead>
              <TableHead>{extractLanguageText("Location | ตำแหน่ง", language)}</TableHead>
              <TableHead>{extractLanguageText("Vehicle | ยานพาหนะ", language)}</TableHead>
              <TableHead>{extractLanguageText("Hours | ชั่วโมง", language)}</TableHead>
              <TableHead className="text-right">{extractLanguageText("Actions | การดำเนินการ", language)}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {drivers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  {extractLanguageText("No drivers found | ไม่พบพนักงานขับรถ", language)}
                </TableCell>
              </TableRow>
            ) : (
              drivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell className="font-medium">{driver.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-fleet-500" />
                      {driver.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        driver.status === "Active"
                          ? "border-green-200 bg-green-50 text-green-600"
                          : driver.status === "Off-duty"
                          ? "border-orange-200 bg-orange-50 text-orange-600"
                          : "border-red-200 bg-red-50 text-red-600"
                      }
                    >
                      {driver.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-muted-foreground" />
                      {driver.shift || "-"}
                    </div>
                  </TableCell>
                  <TableCell>{driver.licenseType}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-muted-foreground" />
                      {driver.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Car size={14} className="text-muted-foreground" />
                      {driver.vehicle}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-muted-foreground" />
                      {driver.hoursThisWeek}h
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-popover">
                        <DropdownMenuItem onClick={() => handleViewDetails(driver)}>
                          {extractLanguageText("View Details | ดูรายละเอียด", language)}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditDriver(driver)}>
                          {extractLanguageText("Edit | แก้ไข", language)}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleMessageDriver(driver)}>
                          {extractLanguageText("Message | ข้อความ", language)}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleScheduleDriver(driver)}>
                          {extractLanguageText("Schedule | ตารางเวลา", language)}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600" 
                          onClick={() => handleDeactivateDriver(driver)}
                        >
                          {extractLanguageText("Deactivate | ปิดการใช้งาน", language)}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* View Details Dialog */}
      <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{extractLanguageText("Driver Details | รายละเอียดพนักงานขับรถ", language)}</DialogTitle>
          </DialogHeader>
          {selectedDriver && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">{extractLanguageText("Personal Information | ข้อมูลส่วนตัว", language)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-muted-foreground">{extractLanguageText("Name | ชื่อ:", language)}</dt>
                        <dd className="text-sm">{selectedDriver.name}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-muted-foreground">{extractLanguageText("ID | รหัส:", language)}</dt>
                        <dd className="text-sm">{selectedDriver.id}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-muted-foreground">{extractLanguageText("Phone | โทรศัพท์:", language)}</dt>
                        <dd className="text-sm">{selectedDriver.phone}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-muted-foreground">{extractLanguageText("License | ใบอนุญาต:", language)}</dt>
                        <dd className="text-sm">{selectedDriver.licenseType}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">{extractLanguageText("Work Information | ข้อมูลการทำงาน", language)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-muted-foreground">{extractLanguageText("Status | สถานะ:", language)}</dt>
                        <dd className="text-sm">{selectedDriver.status}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-muted-foreground">{extractLanguageText("Shift | กะ:", language)}</dt>
                        <dd className="text-sm">{selectedDriver.shift || "-"}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-muted-foreground">{extractLanguageText("Location | ตำแหน่ง:", language)}</dt>
                        <dd className="text-sm">{selectedDriver.location}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-muted-foreground">{extractLanguageText("Vehicle | ยานพาหนะ:", language)}</dt>
                        <dd className="text-sm">{selectedDriver.vehicle}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-muted-foreground">{extractLanguageText("Hours | ชั่วโมง:", language)}</dt>
                        <dd className="text-sm">{selectedDriver.hoursThisWeek}h</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-muted-foreground">{extractLanguageText("Last Trip | การเดินทางล่าสุด:", language)}</dt>
                        <dd className="text-sm">{selectedDriver.lastTrip}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setViewDetailsOpen(false)}>
                  {extractLanguageText("Close | ปิด", language)}
                </Button>
                <Button onClick={() => {
                  setViewDetailsOpen(false);
                  handleEditDriver(selectedDriver);
                }}>
                  {extractLanguageText("Edit Driver | แก้ไขคนขับ", language)}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Driver Dialog */}
      <Dialog open={editDriverOpen} onOpenChange={setEditDriverOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{extractLanguageText("Edit Driver | แก้ไขพนักงานขับรถ", language)}</DialogTitle>
          </DialogHeader>
          {selectedDriver && (
            <EditDriverForm 
              driver={selectedDriver}
              onSuccess={() => {
                // Get the updated form values and update the driver data
                handleUpdateDriver({
                  name: selectedDriver.name,
                  phone: selectedDriver.phone,
                  licenseType: [
                    ...(selectedDriver.licenseType.includes("3") ? ["3"] : []),
                    ...(selectedDriver.licenseType.includes("4") ? ["4"] : [])
                  ].join(", ")
                });
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Message Driver Sheet */}
      <Sheet open={messageDriverOpen} onOpenChange={setMessageDriverOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Message {selectedDriver?.name}</SheetTitle>
          </SheetHeader>
          <div className="py-6">
            <p className="text-center">Messaging feature will be implemented soon.</p>
          </div>
        </SheetContent>
      </Sheet>

      {/* Schedule Driver Sheet */}
      <Sheet open={scheduleOpen} onOpenChange={setScheduleOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Schedule for {selectedDriver?.name}</SheetTitle>
          </SheetHeader>
          <div className="py-6">
            <p className="text-center">Scheduling feature will be implemented soon.</p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
