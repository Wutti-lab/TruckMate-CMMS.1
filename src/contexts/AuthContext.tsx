
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, UserRole } from '@/lib/types/user-roles';

// Define the Activity type
export interface Activity {
  id: string;
  type: 'login' | 'logout' | 'inspection' | 'maintenance' | 'delivery' | 'other';
  user: {
    id: string;
    name: string;
    role: UserRole;
  };
  timestamp: Date;
  description: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
  activities: Activity[];
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp' | 'user'>) => void;
}

// Beispielbenutzer für Testzwecke
const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@truckmate.com",
    role: UserRole.ADMIN
  },
  {
    id: "2",
    name: "Fleet Manager",
    email: "fleet@truckmate.com",
    role: UserRole.FLEET_MANAGER
  },
  {
    id: "3",
    name: "Driver User",
    email: "driver@truckmate.com",
    role: UserRole.DRIVER
  },
  {
    id: "4",
    name: "Mechanic User",
    email: "mechanic@truckmate.com",
    role: UserRole.MECHANIC
  },
  {
    id: "5",
    name: "Dispatcher User",
    email: "dispatcher@truckmate.com",
    role: UserRole.DISPATCHER
  }
];

// Initialize activities array
const initialActivities: Activity[] = [];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [activities, setActivities] = useState<Activity[]>(initialActivities);

  const addActivity = (activity: Omit<Activity, 'id' | 'timestamp' | 'user'>) => {
    if (!user) return;
    
    const newActivity: Activity = {
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      user: {
        id: user.id,
        name: user.name,
        role: user.role
      },
      timestamp: new Date(),
      ...activity
    };
    
    setActivities(prev => [newActivity, ...prev]);
  };

  // Simulierte Login-Funktion
  const login = async (email: string, password: string): Promise<void> => {
    // Simuliert eine API-Anfrage
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = mockUsers.find(u => u.email === email);
        
        if (foundUser && password === '123456') { // Einfaches Passwort für alle Testbenutzer
          setUser(foundUser);
          
          // Add login activity
          const loginActivity: Activity = {
            id: `login-${Date.now()}`,
            type: 'login',
            user: {
              id: foundUser.id,
              name: foundUser.name,
              role: foundUser.role
            },
            timestamp: new Date(),
            description: `${foundUser.name} logged in`
          };
          
          setActivities(prev => [loginActivity, ...prev]);
          localStorage.setItem('user', JSON.stringify(foundUser));
          resolve();
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 500);
    });
  };

  const logout = () => {
    if (user) {
      // Add logout activity
      const logoutActivity: Activity = {
        id: `logout-${Date.now()}`,
        type: 'logout',
        user: {
          id: user.id,
          name: user.name,
          role: user.role
        },
        timestamp: new Date(),
        description: `${user.name} logged out`
      };
      setActivities(prev => [logoutActivity, ...prev]);
    }
    setUser(null);
    localStorage.removeItem('user');
  };

  // Überprüfen, ob der Benutzer eine bestimmte Rolle hat
  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    
    if (Array.isArray(roles)) {
      return roles.includes(user.role);
    }
    
    return user.role === roles;
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        isAuthenticated: !!user,
        hasRole,
        activities,
        addActivity
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
