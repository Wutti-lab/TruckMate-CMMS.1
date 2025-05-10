
import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";
import { NotificationItem } from "./NotificationItem";

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

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState(exampleNotifications);
  const { language } = useLanguage();
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
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

  return (
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
            <h3 className="font-medium">{extractLanguageText("Notifications | การแจ้งเตือน", language)}</h3>
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={markAllAsRead}
                className="text-xs h-7 px-2"
              >
                {extractLanguageText("Mark all as read | ทำเครื่องหมายทั้งหมดว่าอ่านแล้ว", language)}
              </Button>
            )}
          </div>
          
          <DropdownMenuSeparator />
          
          {notifications.length === 0 ? (
            <div className="py-4 text-center text-gray-500">
              {extractLanguageText("No notifications | ไม่มีการแจ้งเตือน", language)}
            </div>
          ) : (
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                  onRemove={removeNotification}
                />
              ))}
            </div>
          )}
          
          <DropdownMenuSeparator />
          
          <div className="px-3 py-2">
            <Button variant="outline" size="sm" className="w-full">
              {extractLanguageText("View all notifications | ดูการแจ้งเตือนทั้งหมด", language)}
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
