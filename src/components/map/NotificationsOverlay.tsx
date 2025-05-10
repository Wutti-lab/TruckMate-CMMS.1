
import { Button } from "@/components/ui/button";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";

interface Notification {
  id: number;
  message: string;
  time: string;
  type: string;
}

interface NotificationsOverlayProps {
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
  notifications: Notification[];
}

export function NotificationsOverlay({
  showNotifications,
  setShowNotifications,
  notifications
}: NotificationsOverlayProps) {
  const { language } = useLanguage();

  if (!showNotifications) {
    return null;
  }

  return (
    <div className="absolute right-4 top-16 w-[350px] max-h-[80vh] overflow-y-auto bg-white rounded-lg shadow-lg p-4 z-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          {extractLanguageText("Notifications | การแจ้งเตือน | Benachrichtigungen", language)}
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowNotifications(false)}
        >
          ✕
        </Button>
      </div>
      <div className="space-y-3">
        {notifications.map((item) => (
          <div 
            key={item.id} 
            className={`border-l-2 pl-3 pb-3 ${
              item.type === 'warning' ? 'border-yellow-500' : 
              item.type === 'danger' ? 'border-red-500' : 
              'border-blue-500'
            }`}
          >
            <p className="font-semibold text-sm">{item.message}</p>
            <p className="text-xs text-gray-500">{item.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
