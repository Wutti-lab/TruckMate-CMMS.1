
import { useState } from 'react';
import { Bell, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNotifications } from '@/contexts/NotificationContext';
import { useLanguage, extractLanguageText } from '@/contexts/LanguageContext';

export function NotificationCenter() {
  const { notifications, unreadCount, markAsRead, removeNotification, clearAllNotifications } = useNotifications();
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getPriorityColor = (type: string) => {
    switch (type) {
      case 'error':
        return 'border-l-red-500 bg-red-50';
      case 'warning':
        return 'border-l-amber-500 bg-amber-50';
      case 'success':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-blue-500 bg-blue-50';
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="relative rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow"
          size="icon"
        >
          <Bell className="h-6 w-6" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 px-2 py-1 text-xs bg-red-500 text-white rounded-full min-w-[1.5rem] h-6 flex items-center justify-center">
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-h-[80vh] flex flex-col">
      <Card className="shadow-2xl border-0">
        <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <h3 className="font-semibold">
              {extractLanguageText("Benachrichtigungen | Notifications", language)}
            </h3>
            {unreadCount > 0 && (
              <Badge className="bg-red-500 text-white px-2 py-1 text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-blue-600 p-1 h-auto"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-0 max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <Bell className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>{extractLanguageText("Keine Benachrichtigungen | No notifications", language)}</p>
            </div>
          ) : (
            <div className="space-y-0">
              {notifications.slice(0, 10).map((notification) => (
                <div
                  key={notification.id}
                  className={`border-l-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${getPriorityColor(notification.type)} ${!notification.read ? 'bg-opacity-70' : 'bg-opacity-30'}`}
                >
                  <div className="flex items-start gap-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {extractLanguageText(notification.title, language)}
                        </h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeNotification(notification.id)}
                          className="p-1 h-auto text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">
                        {extractLanguageText(notification.message, language)}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">{notification.time}</span>
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs px-2 py-1 h-auto text-blue-600 hover:text-blue-800"
                          >
                            {extractLanguageText("Als gelesen markieren | Mark as read", language)}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        
        {notifications.length > 0 && (
          <div className="p-3 border-t bg-gray-50 rounded-b-lg">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllNotifications}
                className="flex-1 text-xs"
              >
                {extractLanguageText("Alle löschen | Clear all", language)}
              </Button>
              {unreadCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => notifications.forEach(n => !n.read && markAsRead(n.id))}
                  className="flex-1 text-xs"
                >
                  {extractLanguageText("Alle als gelesen | Mark all read", language)}
                </Button>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
