
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export type NotificationType = 'info' | 'warning' | 'success' | 'error';

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  time: string;
  read: boolean;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  vehicleId?: string;
  driverId?: string;
  category?: 'vehicle' | 'maintenance' | 'driver' | 'inspection' | 'system';
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  criticalAlerts: any[];
  addNotification: (notification: Omit<Notification, 'id' | 'time' | 'read'>) => void;
  addCriticalAlert: (alert: any) => void;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  removeNotification: (id: number) => void;
  clearAllNotifications: () => void;
  dismissCriticalAlert: (alertId: string) => void;
  dismissAllCriticalAlerts: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Enhanced initial notifications with more variety
const initialNotifications: Notification[] = [
  { 
    id: 1, 
    title: "Wartungsalarm | Maintenance Alert", 
    message: "Fahrzeug B-FR-123 benötigt sofortige Wartung | Vehicle B-FR-123 requires immediate maintenance", 
    time: "vor 10 Minuten", 
    type: "warning",
    read: false,
    priority: 'high',
    vehicleId: 'B-FR-123',
    category: 'maintenance'
  },
  { 
    id: 2, 
    title: "Inspektion abgeschlossen | Inspection Complete", 
    message: "Monatliche Inspektion für Fahrzeug B-FR-234 erfolgreich abgeschlossen | Monthly inspection for vehicle B-FR-234 completed successfully", 
    time: "vor 2 Stunden", 
    type: "success",
    read: true,
    priority: 'medium',
    vehicleId: 'B-FR-234',
    category: 'inspection'
  },
  { 
    id: 3, 
    title: "Fahrer-Warnung | Driver Alert", 
    message: "Fahrer Jan Weber hat die Fahrzeiten überschritten | Driver Jan Weber has exceeded driving hours", 
    time: "Gestern", 
    type: "warning",
    read: false,
    priority: 'high',
    driverId: 'jan-weber',
    category: 'driver'
  },
  { 
    id: 4, 
    title: "Neues Fahrzeug hinzugefügt | New Vehicle Added", 
    message: "Fahrzeug B-FR-789 wurde zur Flotte hinzugefügt | Vehicle B-FR-789 has been added to the fleet", 
    time: "vor 2 Tagen", 
    type: "info",
    read: true,
    priority: 'low',
    vehicleId: 'B-FR-789',
    category: 'vehicle'
  },
  {
    id: 5,
    title: "Kritische Motortemperatur | Critical Engine Temperature",
    message: "Fahrzeug B-FR-456: 94°C - Sofortige Maßnahmen erforderlich | Vehicle B-FR-456: 94°C - Immediate action required",
    time: "vor 5 Minuten",
    type: "error",
    read: false,
    priority: 'critical',
    vehicleId: 'B-FR-456',
    category: 'vehicle'
  }
];

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const savedNotifications = localStorage.getItem('cmms_notifications');
    return savedNotifications ? JSON.parse(savedNotifications) : initialNotifications;
  });
  
  const [criticalAlerts, setCriticalAlerts] = useState<any[]>([]);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cmms_notifications', JSON.stringify(notifications));
  }, [notifications]);
  
  const addNotification = (notification: Omit<Notification, 'id' | 'time' | 'read'>) => {
    const now = new Date();
    const newNotification: Notification = {
      ...notification,
      id: Date.now() + Math.random(),
      time: 'Gerade jetzt',
      read: false,
      priority: notification.priority || 'medium'
    };
    
    setNotifications(prev => [newNotification, ...prev.slice(0, 49)]); // Keep only latest 50
    
    // Create critical alert for high priority errors
    if (notification.type === 'error' && (notification.priority === 'critical' || notification.priority === 'high')) {
      addCriticalAlert({
        id: `critical-${Date.now()}`,
        title: notification.title,
        message: notification.message,
        severity: notification.priority === 'critical' ? 'critical' : 'high',
        timestamp: now,
        vehicleId: notification.vehicleId
      });
    }
  };
  
  const addCriticalAlert = (alert: any) => {
    setCriticalAlerts(prev => [...prev, alert]);
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
  
  const clearAllNotifications = () => {
    setNotifications([]);
  };
  
  const dismissCriticalAlert = (alertId: string) => {
    setCriticalAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };
  
  const dismissAllCriticalAlerts = () => {
    setCriticalAlerts([]);
  };
  
  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      criticalAlerts,
      addNotification,
      addCriticalAlert,
      markAsRead,
      markAllAsRead,
      removeNotification,
      clearAllNotifications,
      dismissCriticalAlert,
      dismissAllCriticalAlerts
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
