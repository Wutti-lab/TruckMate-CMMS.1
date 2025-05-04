
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User, UserRole } from '@/lib/types/user-roles';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
  loginActivities: LoginActivity[];
}

// New interface for login activities
export interface LoginActivity {
  id: string;
  userId: string;
  userName: string;
  timestamp: Date;
  userRole: UserRole;
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loginActivities, setLoginActivities] = useState<LoginActivity[]>([]);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedActivities = localStorage.getItem('loginActivities');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (storedActivities) {
      setLoginActivities(JSON.parse(storedActivities));
    }
  }, []);

  // Simulierte Login-Funktion
  const login = async (email: string, password: string): Promise<void> => {
    // Simuliert eine API-Anfrage
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = mockUsers.find(u => u.email === email);
        
        if (foundUser && password === '123456') { // Einfaches Passwort für alle Testbenutzer
          setUser(foundUser);
          localStorage.setItem('user', JSON.stringify(foundUser));
          
          // Add new login activity
          const newActivity: LoginActivity = {
            id: Date.now().toString(),
            userId: foundUser.id,
            userName: foundUser.name,
            timestamp: new Date(),
            userRole: foundUser.role
          };
          
          const updatedActivities = [newActivity, ...loginActivities.slice(0, 9)]; // Keep only last 10
          setLoginActivities(updatedActivities);
          localStorage.setItem('loginActivities', JSON.stringify(updatedActivities));
          
          resolve();
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 500);
    });
  };

  const logout = () => {
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
        loginActivities 
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
