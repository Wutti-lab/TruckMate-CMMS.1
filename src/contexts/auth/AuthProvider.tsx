
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { User, UserRole } from '@/lib/types/user-roles';
import { 
  AuthContextType, 
  LoginActivity, 
  PendingUser, 
  UserWithPassword 
} from './types';
import { initialMockUsers, initialPendingUsers } from './mockData';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loginActivities, setLoginActivities] = useState<LoginActivity[]>([]);
  const [mockUsers, setMockUsers] = useState<UserWithPassword[]>([]);
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);

  // Load user and data from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedActivities = localStorage.getItem('loginActivities');
    const storedMockUsers = localStorage.getItem('mockUsers');
    const storedPendingUsers = localStorage.getItem('pendingUsers');
    
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
    
    if (storedPendingUsers) {
      setPendingUsers(JSON.parse(storedPendingUsers));
    } else {
      setPendingUsers(initialPendingUsers);
      localStorage.setItem('pendingUsers', JSON.stringify(initialPendingUsers));
    }
  }, []);

  // Calculate expiry date (1 year from activation)
  const calculateExpiryDate = (activationDate: string): string => {
    const date = new Date(activationDate);
    date.setFullYear(date.getFullYear() + 1);
    return date.toISOString().split('T')[0];
  };

  // Simulated login function
  const login = async (email: string, password: string): Promise<void> => {
    // Simulates an API request
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = mockUsers.find(u => u.email === email && u.password === password);
        
        if (foundUser) {
          // Set activation date if not already set
          if (!foundUser.activationDate) {
            const today = new Date().toISOString().split('T')[0];
            foundUser.activationDate = today;
            foundUser.expiryDate = calculateExpiryDate(today);
            
            // Update the user in the mockUsers array
            const updatedUsers = mockUsers.map(u => 
              u.id === foundUser.id ? foundUser : u
            );
            setMockUsers(updatedUsers);
            localStorage.setItem('mockUsers', JSON.stringify(updatedUsers));
          }
          
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
    if (user.role === UserRole.ADMIN || user.role === UserRole.DEV_ADMIN || user.role === UserRole.FLEET_MANAGER) {
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
    // Set activation date and expiry date for new users
    const today = new Date().toISOString().split('T')[0];
    const userWithDates = {
      ...newUser,
      activationDate: today,
      expiryDate: calculateExpiryDate(today)
    };
    
    const updatedUsers = [...mockUsers, userWithDates];
    setMockUsers(updatedUsers);
    localStorage.setItem('mockUsers', JSON.stringify(updatedUsers));
  };
  
  const createPendingUser = (newPendingUser: PendingUser) => {
    const updatedPendingUsers = [...pendingUsers, newPendingUser];
    setPendingUsers(updatedPendingUsers);
    localStorage.setItem('pendingUsers', JSON.stringify(updatedPendingUsers));
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
  
  const approvePendingUser = (id: string) => {
    const pendingUser = pendingUsers.find(pu => pu.id === id);
    
    if (pendingUser) {
      const today = new Date().toISOString().split('T')[0];
      
      // Add to regular users with activation date and expiry date
      const newUser: UserWithPassword = {
        id: pendingUser.id,
        name: pendingUser.name,
        email: pendingUser.email,
        role: pendingUser.role,
        password: pendingUser.password,
        activationDate: today,
        expiryDate: calculateExpiryDate(today)
      };
      
      const updatedUsers = [...mockUsers, newUser];
      setMockUsers(updatedUsers);
      localStorage.setItem('mockUsers', JSON.stringify(updatedUsers));
      
      // Remove from pending users
      const updatedPendingUsers = pendingUsers.filter(pu => pu.id !== id);
      setPendingUsers(updatedPendingUsers);
      localStorage.setItem('pendingUsers', JSON.stringify(updatedPendingUsers));
    }
  };
  
  const rejectPendingUser = (id: string) => {
    const updatedPendingUsers = pendingUsers.map(pu => 
      pu.id === id ? { ...pu, approvalStatus: 'rejected' as const } : pu
    );
    setPendingUsers(updatedPendingUsers);
    localStorage.setItem('pendingUsers', JSON.stringify(updatedPendingUsers));
  };
  
  const getPendingUsersCount = () => {
    return pendingUsers.filter(pu => pu.approvalStatus === 'pending').length;
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
        pendingUsers,
        createUser,
        createPendingUser,
        updateUserList,
        deleteUser,
        approvePendingUser,
        rejectPendingUser,
        getPendingUsersCount
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
