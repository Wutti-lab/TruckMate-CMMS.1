
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Battery,
  Calendar,
  Car,
  Fuel,
  MapPin,
  MoreHorizontal,
  Thermometer,
  Navigation,
  AlertTriangle,
  CheckCircle2,
  History
} from "lucide-react";
import { VehicleQRModal } from "./VehicleQRModal";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "@/contexts/LocationContext";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface Vehicle {
  id: string;
  driver: string;
  model: string;
  location: string;
  status: string;
  fuelLevel: number;
  batteryLevel: number;
  lastService: string;
  nextService: string;
  engineTemp: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
  lastUpdated?: string;
}

interface VehicleTableRowProps {
  vehicle: Vehicle;
}

export function VehicleTableRow({ vehicle }: VehicleTableRowProps) {
  const [showLocation, setShowLocation] = useState(false);
  const [showHealthDialog, setShowHealthDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const { toast } = useToast();
  const { startTrackingVehicle, trackedVehicles } = useLocation();
  
  const isTracked = trackedVehicles.includes(vehicle.id);
  const needsMaintenance = vehicle.engineTemp > 90 || 
    (vehicle.batteryLevel && vehicle.batteryLevel < 20) ||
    (vehicle.fuelLevel && vehicle.fuelLevel < 15);

  const handleTrack = () => {
    if (!vehicle.coordinates) {
      // Add simulated coordinates for demo purposes
      vehicle.coordinates = {
        lat: 13.736717 + (Math.random() * 0.1 - 0.05),
        lng: 100.523186 + (Math.random() * 0.1 - 0.05)
      };
      vehicle.lastUpdated = new Date().toLocaleTimeString();
    }
    
    // Show coordinates directly in the row
    setShowLocation(!showLocation);
    
    // Begin tracking this vehicle
    startTrackingVehicle(vehicle.id);
    
    // Save the ID for map view
    localStorage.setItem('trackVehicleId', vehicle.id);
    
    toast({
      title: "GPS Tracking enabled | เปิดใช้งาน GPS tracking",
      description: "Location data is now being recorded | ข้อมูลตำแหน่งกำลังถูกบันทึก",
      variant: "default"
    });
  };

  // Mock maintenance history
  const maintenanceHistory = [
    { date: "15.03.2023", type: "Regular Service", cost: "12,500 ฿", notes: "Oil change, filter replacement" },
    { date: "22.09.2022", type: "Tire Replacement", cost: "24,800 ฿", notes: "Replaced all tires" },
    { date: "05.06.2022", type: "Battery Service", cost: "3,200 ฿", notes: "Battery check and cleaning" },
    { date: "12.03.2022", type: "Full Inspection", cost: "8,500 ฿", notes: "Annual inspection passed" },
    { date: "25.11.2021", type: "Brake Repair", cost: "15,300 ฿", notes: "Front brake pads replaced" },
  ];

  // Mock health metrics
  const healthMetrics = {
    batteryVoltage: "12.6V",
    oilLevel: "Optimal",
    oilPressure: "45 PSI",
    coolantLevel: "85%",
    airFilter: "Good",
    brakeFluid: "70%",
    tireWear: {
      frontLeft: "80%",
      frontRight: "82%",
      rearLeft: "75%",
      rearRight: "78%"
    }
  };

  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          <Car size={16} className="text-fleet-500" />
          {vehicle.id}
          
          {needsMaintenance && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertTriangle size={16} className="text-amber-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Maintenance needed | จำเป็นต้องบำรุงรักษา</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </TableCell>
      <TableCell>{vehicle.driver}</TableCell>
      <TableCell>{vehicle.model}</TableCell>
      <TableCell>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <MapPin size={14} className="text-muted-foreground" />
            {vehicle.location}
          </div>
          
          {showLocation && vehicle.coordinates && (
            <div className="text-xs font-mono mt-1 text-muted-foreground">
              GPS: {vehicle.coordinates.lat.toFixed(6)}°, {vehicle.coordinates.lng.toFixed(6)}°
              {vehicle.lastUpdated && <div>Updated: {vehicle.lastUpdated}</div>}
            </div>
          )}
        </div>
      </TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={
            vehicle.status === "Active"
              ? "border-green-200 bg-green-50 text-green-600"
              : vehicle.status === "Inactive"
              ? "border-gray-200 bg-gray-50 text-gray-600"
              : "border-orange-200 bg-orange-50 text-orange-600"
          }
        >
          {vehicle.status}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-3 w-32">
          {vehicle.fuelLevel > 0 ? (
            <div className="flex items-center gap-1">
              <Fuel size={14} className="text-muted-foreground" />
              <span>{vehicle.fuelLevel}%</span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <Battery size={14} className="text-muted-foreground" />
              <span>{vehicle.batteryLevel}%</span>
            </div>
          )}
          <div className="w-full bg-gray-200 h-1.5 rounded-full">
            <div
              className={`h-1.5 rounded-full ${
                (vehicle.fuelLevel || vehicle.batteryLevel) > 50
                  ? "bg-green-500"
                  : (vehicle.fuelLevel || vehicle.batteryLevel) > 25
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{
                width: `${vehicle.fuelLevel || vehicle.batteryLevel}%`,
              }}
            ></div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <Thermometer
            size={16}
            className={
              vehicle.engineTemp > 90
                ? "text-red-500"
                : vehicle.engineTemp > 85
                ? "text-yellow-500"
                : "text-blue-500"
            }
          />
          <span>{vehicle.engineTemp}°C</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <Calendar size={14} className="text-muted-foreground" />
          {vehicle.nextService}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <VehicleQRModal vehicle={vehicle} />
          
          <Button 
            variant="outline" 
            size="sm" 
            className={`flex items-center gap-1 ${isTracked ? "border-green-500" : ""}`}
            onClick={handleTrack}
          >
            <Navigation size={14} className={vehicle.coordinates ? (isTracked ? "text-green-500" : "text-fleet-500") : "text-gray-400"} />
            <span className="hidden sm:inline">GPS</span>
          </Button>
          
          <Link to={`/map?vehicle=${vehicle.id}`}>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <MapPin size={14} className="text-fleet-500" />
              <span className="hidden sm:inline">Track</span>
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => setShowHealthDialog(true)}
          >
            <CheckCircle2 size={14} className="text-fleet-500" />
            <span className="hidden sm:inline">Health</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => setShowHistoryDialog(true)}
          >
            <History size={14} className="text-fleet-500" />
            <span className="hidden sm:inline">History</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuItem>View Details | ดูรายละเอียด</DropdownMenuItem>
              <DropdownMenuItem>Show on Map | แสดงบนแผนที่</DropdownMenuItem>
              <DropdownMenuItem>Schedule Service | กำหนดการซ่อมบำรุง</DropdownMenuItem>
              <DropdownMenuItem>Reports | รายงาน</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                Remove | ลบ
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>

      {/* Vehicle Health Dialog */}
      <Dialog open={showHealthDialog} onOpenChange={setShowHealthDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-fleet-500" />
              Vehicle Health | สุขภาพยานพาหนะ 
              <Badge className="ml-2">{vehicle.id}</Badge>
            </DialogTitle>
            <DialogDescription>
              Current health metrics and diagnostics | ตัวชี้วัดและการวินิจฉัยสุขภาพปัจจุบัน
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Battery Voltage | แรงดันแบตเตอรี่</p>
                <p className="font-medium">{healthMetrics.batteryVoltage}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Oil Pressure | แรงดันน้ำมัน</p>
                <p className="font-medium">{healthMetrics.oilPressure}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Oil Level | ระดับน้ำมัน</p>
                <p className="font-medium">{healthMetrics.oilLevel}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Coolant Level | ระดับน้ำหล่อเย็น</p>
                <p className="font-medium">{healthMetrics.coolantLevel}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Air Filter | กรองอากาศ</p>
                <p className="font-medium">{healthMetrics.airFilter}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Brake Fluid | น้ำมันเบรก</p>
                <p className="font-medium">{healthMetrics.brakeFluid}</p>
              </div>
            </div>

            <div className="rounded-md bg-gray-50 p-3">
              <h4 className="font-medium mb-2">Tire Wear | การสึกหรอของยาง</h4>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="inline-block w-12 h-12 rounded-full border-4 border-fleet-500 text-fleet-700 flex items-center justify-center font-bold">
                    {healthMetrics.tireWear.frontLeft}
                  </div>
                  <p className="text-xs mt-1">Front Left | ซ้ายหน้า</p>
                </div>
                <div className="text-center">
                  <div className="inline-block w-12 h-12 rounded-full border-4 border-fleet-500 text-fleet-700 flex items-center justify-center font-bold">
                    {healthMetrics.tireWear.frontRight}
                  </div>
                  <p className="text-xs mt-1">Front Right | ขวาหน้า</p>
                </div>
                <div className="text-center">
                  <div className="inline-block w-12 h-12 rounded-full border-4 border-fleet-500 text-fleet-700 flex items-center justify-center font-bold">
                    {healthMetrics.tireWear.rearLeft}
                  </div>
                  <p className="text-xs mt-1">Rear Left | ซ้ายหลัง</p>
                </div>
                <div className="text-center">
                  <div className="inline-block w-12 h-12 rounded-full border-4 border-fleet-500 text-fleet-700 flex items-center justify-center font-bold">
                    {healthMetrics.tireWear.rearRight}
                  </div>
                  <p className="text-xs mt-1">Rear Right | ขวาหลัง</p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowHealthDialog(false)}>Close | ปิด</Button>
            <Button>Schedule Service | กำหนดการซ่อมบำรุง</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Maintenance History Dialog */}
      <Dialog open={showHistoryDialog} onOpenChange={setShowHistoryDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <History size={18} className="text-fleet-500" />
              Maintenance History | ประวัติการบำรุงรักษา
              <Badge className="ml-2">{vehicle.id}</Badge>
            </DialogTitle>
            <DialogDescription>
              Complete service and maintenance records | บันทึกการให้บริการและการบำรุงรักษาทั้งหมด
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-left text-sm text-muted-foreground">
                  <th className="px-4 py-2">Date | วันที่</th>
                  <th className="px-4 py-2">Service Type | ประเภทงานบริการ</th>
                  <th className="px-4 py-2">Cost | ค่าใช้จ่าย</th>
                  <th className="px-4 py-2">Notes | บันทึก</th>
                </tr>
              </thead>
              <tbody>
                {maintenanceHistory.map((record, i) => (
                  <tr key={i} className="border-b">
                    <td className="px-4 py-3 font-medium">{record.date}</td>
                    <td className="px-4 py-3">{record.type}</td>
                    <td className="px-4 py-3">{record.cost}</td>
                    <td className="px-4 py-3 text-sm">{record.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4">
            <div>
              <p className="text-sm font-medium">Total maintenance costs | ค่าบำรุงรักษาทั้งหมด</p>
              <p className="text-lg font-bold">64,300 ฿</p>
            </div>
            <div>
              <p className="text-sm font-medium">Average monthly cost | ค่าใช้จ่ายเฉลี่ยต่อเดือน</p>
              <p className="text-lg font-bold">3,573 ฿</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowHistoryDialog(false)}>Close | ปิด</Button>
            <Button>Export Report | ส่งออกรายงาน</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TableRow>
  );
}
