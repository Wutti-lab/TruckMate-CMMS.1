
import React from "react";
import { AlertTriangle, CheckCircle, InfoIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";
import { Notification } from "@/contexts/NotificationContext";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: number) => void;
  onRemove: (id: number) => void;
}

export function NotificationItem({ 
  notification, 
  onMarkAsRead, 
  onRemove 
}: NotificationItemProps) {
  const { language } = useLanguage();

  const notificationIcon = (type: string) => {
    switch(type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'info':
      case 'error':
      default:
        return <InfoIcon className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div 
      className={`px-3 py-2 hover:bg-gray-50 rounded-md relative ${!notification.read ? 'bg-blue-50' : ''}`}
    >
      <div className="flex gap-3">
        <div className="mt-1">{notificationIcon(notification.type)}</div>
        <div className="flex-1">
          <div className="flex justify-between">
            <h4 className="text-sm font-medium">
              {extractLanguageText(notification.title, language)}
            </h4>
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 absolute top-2 right-2 opacity-50 hover:opacity-100"
              onClick={() => onRemove(notification.id)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          <p className="text-xs text-gray-700 mt-1">
            {extractLanguageText(notification.message, language)}
          </p>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-500">{notification.time}</span>
            {!notification.read && (
              <Badge variant="outline" className="h-5 text-xs bg-blue-50 border-blue-200">
                {extractLanguageText("New | ใหม่", language)}
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
          onClick={() => onMarkAsRead(notification.id)}
        >
          {extractLanguageText("Mark as read | ทำเครื่องหมายว่าอ่านแล้ว", language)}
        </Button>
      )}
    </div>
  );
}
