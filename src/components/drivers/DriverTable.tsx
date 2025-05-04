
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

export function DriverTable({ drivers }: DriverTableProps) {
  const { toast } = useToast();
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
    toast({
      title: "Driver deactivated",
      description: `${driver.name} has been deactivated.`,
    });
  };

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Driver ID | รหัสคนขับ</TableHead>
              <TableHead>Name | ชื่อ</TableHead>
              <TableHead>Status | สถานะ</TableHead>
              <TableHead>Shift | กะ</TableHead>
              <TableHead>License | ใบอนุญาต</TableHead>
              <TableHead>Location | ตำแหน่ง</TableHead>
              <TableHead>Vehicle | ยานพาหนะ</TableHead>
              <TableHead>Hours | ชั่วโมง</TableHead>
              <TableHead className="text-right">Actions | การดำเนินการ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {drivers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  No drivers found | ไม่พบพนักงานขับรถ
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
                      <DropdownMenuContent align="end" className="bg-white">
                        <DropdownMenuItem onClick={() => handleViewDetails(driver)}>
                          View Details | ดูรายละเอียด
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditDriver(driver)}>
                          Edit | แก้ไข
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleMessageDriver(driver)}>
                          Message | ข้อความ
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleScheduleDriver(driver)}>
                          Schedule | ตารางเวลา
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600" 
                          onClick={() => handleDeactivateDriver(driver)}
                        >
                          Deactivate | ปิดการใช้งาน
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
            <DialogTitle>Driver Details | รายละเอียดพนักงานขับรถ</DialogTitle>
          </DialogHeader>
          {selectedDriver && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Personal Information | ข้อมูลส่วนตัว</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-muted-foreground">Name | ชื่อ:</dt>
                        <dd className="text-sm">{selectedDriver.name}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-muted-foreground">ID | รหัส:</dt>
                        <dd className="text-sm">{selectedDriver.id}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-muted-foreground">Phone | โทรศัพท์:</dt>
                        <dd className="text-sm">{selectedDriver.phone}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-muted-foreground">License | ใบอนุญาต:</dt>
                        <dd className="text-sm">{selectedDriver.licenseType}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Work Information | ข้อมูลการทำงาน</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-muted-foreground">Status | สถานะ:</dt>
                        <dd className="text-sm">{selectedDriver.status}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-muted-foreground">Shift | กะ:</dt>
                        <dd className="text-sm">{selectedDriver.shift || "-"}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-muted-foreground">Location | ตำแหน่ง:</dt>
                        <dd className="text-sm">{selectedDriver.location}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-muted-foreground">Vehicle | ยานพาหนะ:</dt>
                        <dd className="text-sm">{selectedDriver.vehicle}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-muted-foreground">Hours | ชั่วโมง:</dt>
                        <dd className="text-sm">{selectedDriver.hoursThisWeek}h</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-muted-foreground">Last Trip | การเดินทางล่าสุด:</dt>
                        <dd className="text-sm">{selectedDriver.lastTrip}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setViewDetailsOpen(false)}>
                  Close | ปิด
                </Button>
                <Button onClick={() => {
                  setViewDetailsOpen(false);
                  handleEditDriver(selectedDriver);
                }}>
                  Edit Driver | แก้ไขคนขับ
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
            <DialogTitle>Edit Driver | แก้ไขพนักงานขับรถ</DialogTitle>
          </DialogHeader>
          {selectedDriver && (
            <EditDriverForm 
              driver={selectedDriver}
              onSuccess={() => {
                setEditDriverOpen(false);
                toast({
                  title: "Driver updated",
                  description: `${selectedDriver.name} has been updated successfully.`
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
