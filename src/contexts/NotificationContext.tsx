
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export type NotificationType = 'info' | 'warning' | 'success' | 'error';

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  time: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'time' | 'read'>) => void;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  removeNotification: (id: number) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Example initial notifications for demonstration
const initialNotifications: Notification[] = [
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
  }
];

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const savedNotifications = localStorage.getItem('notifications');
    return savedNotifications ? JSON.parse(savedNotifications) : initialNotifications;
  });
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);
  
  const addNotification = (notification: Omit<Notification, 'id' | 'time' | 'read'>) => {
    const now = new Date();
    const newNotification: Notification = {
      ...notification,
      id: Date.now(),
      time: 'Just now',
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
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
  
  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      removeNotification,
      clearAllNotifications
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
