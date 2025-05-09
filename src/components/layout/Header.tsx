
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Bell, 
  Settings, 
  LogOut, 
  AlertTriangle, 
  CheckCircle, 
  InfoIcon,
  X
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Example notifications for demonstration
const exampleNotifications = [
  { 
    id: 1, 
    title: "Maintenance Alert | การแจ้งเตือนการบำรุงรักษา", 
    message: "Vehicle B-FR-123 requires immediate maintenance | ยานพาหนะ B-FR-123 ต้องการการบำรุงรักษาทันที", 
    time: "10 minutes ago", 
    type: "warning",
    read: false 
  },
  { 
    id: 2, 
    title: "Inspection Complete | การตรวจสอบเสร็จสิ้น", 
    message: "Monthly inspection for vehicle B-FR-234 completed | การตรวจสอบประจำเดือนสำหรับยานพาหนะ B-FR-234 เสร็จสิ้นแล้ว", 
    time: "2 hours ago", 
    type: "success",
    read: true 
  },
  { 
    id: 3, 
    title: "Driver Alert | การแจ้งเตือนคนขับ", 
    message: "Driver Jan Weber has exceeded driving hours | คนขับ Jan Weber ขับขี่เกินเวลาที่กำหนด", 
    time: "Yesterday", 
    type: "warning",
    read: false 
  },
  { 
    id: 4, 
    title: "New Vehicle Added | เพิ่มยานพาหนะใหม่", 
    message: "Vehicle B-FR-789 has been added to the fleet | ยานพาหนะ B-FR-789 ได้รับการเพิ่มเข้าสู่กองยานพาหนะแล้ว", 
    time: "2 days ago", 
    type: "info",
    read: true 
  },
  { 
    id: 5, 
    title: "System Update | การอัปเดตระบบ", 
    message: "TruckMate CMMS will be updated tonight at 02:00 | TruckMate CMMS จะได้รับการอัปเดตคืนนี้เวลา 02:00 น.", 
    time: "2 days ago", 
    type: "info",
    read: true 
  },
];

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(exampleNotifications);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const pageTitle = {
    "/dashboard": "Dashboard | แดชบอร์ด",
    "/vehicles": "Vehicles | ยานพาหนะ",
    "/map": "Map | แผนที่",
    "/inspections": "Inspections | การตรวจสอบ",
    "/drivers": "Drivers | คนขับ",
    "/qr-scanner": "QR Scanner | เครื่องสแกน QR",
    "/accounts": "Account Management | การจัดการบัญชี",
    "/pricing": "Pricing | ราคา"
  };
  
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  
  const removeNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const notificationIcon = (type: string) => {
    switch(type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'info':
      default:
        return <InfoIcon className="h-4 w-4 text-blue-500" />;
    }
  };
  
  return (
    <header className="border-b bg-white p-4">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">
          {pageTitle[window.location.pathname as keyof typeof pageTitle] || "TruckMate CMMS"}
        </h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-white p-2">
                <div className="flex items-center justify-between py-2 px-3">
                  <h3 className="font-medium">Notifications | การแจ้งเตือน</h3>
                  {unreadCount > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={markAllAsRead}
                      className="text-xs h-7 px-2"
                    >
                      Mark all as read | ทำเครื่องหมายทั้งหมดว่าอ่านแล้ว
                    </Button>
                  )}
                </div>
                
                <DropdownMenuSeparator />
                
                {notifications.length === 0 ? (
                  <div className="py-4 text-center text-gray-500">
                    No notifications | ไม่มีการแจ้งเตือน
                  </div>
                ) : (
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`px-3 py-2 hover:bg-gray-50 rounded-md relative ${!notification.read ? 'bg-blue-50' : ''}`}
                      >
                        <div className="flex gap-3">
                          <div className="mt-1">{notificationIcon(notification.type)}</div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h4 className="text-sm font-medium">{notification.title}</h4>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 absolute top-2 right-2 opacity-50 hover:opacity-100"
                                onClick={() => removeNotification(notification.id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                            <p className="text-xs text-gray-700 mt-1">{notification.message}</p>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-xs text-gray-500">{notification.time}</span>
                              {!notification.read && (
                                <Badge variant="outline" className="h-5 text-xs bg-blue-50 border-blue-200">
                                  New | ใหม่
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-1 h-6 text-xs p-0 underline text-blue-500 hover:text-blue-700"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as read | ทำเครื่องหมายว่าอ่านแล้ว
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                <DropdownMenuSeparator />
                
                <div className="px-3 py-2">
                  <Button variant="outline" size="sm" className="w-full">
                    View all notifications | ดูการแจ้งเตือนทั้งหมด
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              Logged in as: <strong>{user?.name}</strong> ({user?.role})
            </span>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  Profile Settings | การตั้งค่าโปรไฟล์
                </DropdownMenuItem>
                <DropdownMenuItem>
                  System Preferences | การตั้งค่าระบบ
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout | ออกจากระบบ
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
