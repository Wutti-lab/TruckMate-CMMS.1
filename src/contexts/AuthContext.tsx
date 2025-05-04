import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User, UserRole } from '@/lib/types/user-roles';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
  loginActivities: LoginActivity[];
  getFilteredLoginActivities: () => LoginActivity[];
  // Account management functions
  mockUsers: User[];
  createUser: (user: User & { password: string }) => void;
  updateUserList: (user: User & { password?: string }) => void;
  deleteUser: (id: string) => void;
}

// Interface for login activities
export interface LoginActivity {
  id: string;
  userId: string;
  userName: string;
  timestamp: Date;
  userRole: UserRole;
}

interface UserWithPassword extends User {
  password: string;
}

// Example users for testing purposes
const initialMockUsers: UserWithPassword[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@truckmate.com",
    role: UserRole.ADMIN,
    password: "123456"
  },
  {
    id: "2",
    name: "Fleet Manager",
    email: "fleet@truckmate.com",
    role: UserRole.FLEET_MANAGER,
    password: "123456"
  },
  {
    id: "3",
    name: "Driver User",
    email: "driver@truckmate.com",
    role: UserRole.DRIVER,
    password: "123456"
  },
  {
    id: "4",
    name: "Mechanic User",
    email: "mechanic@truckmate.com",
    role: UserRole.MECHANIC,
    password: "123456"
  },
  {
    id: "5",
    name: "Dispatcher User",
    email: "dispatcher@truckmate.com",
    role: UserRole.DISPATCHER,
    password: "123456"
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loginActivities, setLoginActivities] = useState<LoginActivity[]>([]);
  const [mockUsers, setMockUsers] = useState<UserWithPassword[]>([]);

  // Load user and data from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedActivities = localStorage.getItem('loginActivities');
    const storedMockUsers = localStorage.getItem('mockUsers');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (storedActivities) {
      setLoginActivities(JSON.parse(storedActivities));
    }

    if (storedMockUsers) {
      setMockUsers(JSON.parse(storedMockUsers));
    } else {
      setMockUsers(initialMockUsers);
      localStorage.setItem('mockUsers', JSON.stringify(initialMockUsers));
    }
  }, []);

  // Simulated login function
  const login = async (email: string, password: string): Promise<void> => {
    // Simulates an API request
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = mockUsers.find(u => u.email === email && u.password === password);
        
        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          
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

  // Check if user has a specific role
  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    
    if (Array.isArray(roles)) {
      return roles.includes(user.role);
    }
    
    return user.role === roles;
  };

  // Get filtered login activities based on user role
  const getFilteredLoginActivities = (): LoginActivity[] => {
    if (!user) return [];

    // Admin and Fleet Manager can see all login activities
    if (user.role === UserRole.ADMIN || user.role === UserRole.FLEET_MANAGER) {
      return loginActivities;
    }
    
    // Drivers can only see their own logins and other drivers' logins
    if (user.role === UserRole.DRIVER) {
      return loginActivities.filter(activity => 
        activity.userId === user.id || activity.userRole === UserRole.DRIVER
      );
    }
    
    // Mechanics can only see their own logins and other mechanics' logins
    if (user.role === UserRole.MECHANIC) {
      return loginActivities.filter(activity => 
        activity.userId === user.id || activity.userRole === UserRole.MECHANIC
      );
    }
    
    // Default: only see own logins
    return loginActivities.filter(activity => activity.userId === user.id);
  };

  // Account management functions
  const createUser = (newUser: UserWithPassword) => {
    const updatedUsers = [...mockUsers, newUser];
    setMockUsers(updatedUsers);
    localStorage.setItem('mockUsers', JSON.stringify(updatedUsers));
  };

  const updateUserList = (updatedUser: User & { password?: string }) => {
    const updatedUsers = mockUsers.map(user => {
      if (user.id === updatedUser.id) {
        // If a new password is provided, update it, otherwise keep the existing one
        if (updatedUser.password && updatedUser.password.trim() !== "") {
          return {
            ...user,
            ...updatedUser,
            password: updatedUser.password
          };
        } else {
          // Keep existing password if none provided
          return {
            ...user,
            ...updatedUser
          };
        }
      }
      return user;
    });
    
    setMockUsers(updatedUsers);
    localStorage.setItem('mockUsers', JSON.stringify(updatedUsers));
    
    // If the updated user is the currently logged in user, update the session too
    if (user && user.id === updatedUser.id) {
      const { password, ...userWithoutPassword } = updatedUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    }
  };

  const deleteUser = (id: string) => {
    const updatedUsers = mockUsers.filter(user => user.id !== id);
    setMockUsers(updatedUsers);
    localStorage.setItem('mockUsers', JSON.stringify(updatedUsers));
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        isAuthenticated: !!user,
        hasRole,
        loginActivities,
        getFilteredLoginActivities,
        mockUsers,
        createUser,
        updateUserList,
        deleteUser
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
