
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
import { useNotifications, NotificationType } from "@/contexts/NotificationContext";

export function NotificationsDropdown() {
  const { language } = useLanguage();
  const { 
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification
  } = useNotifications();
  
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
