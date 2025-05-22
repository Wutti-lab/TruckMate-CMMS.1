
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { User } from '@/lib/types/user-roles';
import { AuthContextType, LoginActivity, PendingUser, UserWithPassword } from './types';
import { initialMockUsers, initialPendingUsers } from './mockData';
import { authActions } from './authActions';
import { userActions } from './userActions';

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

  // Get auth and user management functions
  const auth = authActions(mockUsers, pendingUsers, loginActivities, setUser, setMockUsers, setPendingUsers, setLoginActivities);
  const userManager = userActions(mockUsers, pendingUsers, setMockUsers, setPendingUsers, setUser);

  // Create the hasRole function bound to the current user
  const hasRole = (roles: Parameters<typeof auth.hasRole>[1]) => auth.hasRole(user, roles);
  
  // Create getFilteredLoginActivities function bound to the current user
  const getFilteredLoginActivities = () => auth.getFilteredLoginActivities(user);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login: auth.login,
        loginWithPhone: auth.loginWithPhone,
        loginWithGoogle: auth.loginWithGoogle,
        logout: auth.logout, 
        isAuthenticated: !!user,
        hasRole,
        loginActivities,
        getFilteredLoginActivities,
        mockUsers,
        pendingUsers,
        ...userManager
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
