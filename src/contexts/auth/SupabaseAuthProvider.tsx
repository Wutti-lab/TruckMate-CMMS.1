
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { UserRole } from '@/lib/types/user-roles';
import { supabaseAuthActions } from './supabaseAuthActions';
import { supabaseUserActions } from './supabaseUserActions';

interface Profile {
  id: string;
  name: string;
  role: UserRole;
  phone_number?: string;
  company?: string;
  job_title?: string;
  activation_date?: string;
  expiry_date?: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, userData: any) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
  // User management functions
  allProfiles: Profile[];
  pendingUsers: any[];
  updateProfile: (userId: string, updates: any) => Promise<any>;
  createPendingUser: (userData: any) => Promise<any>;
  approvePendingUser: (pendingUserId: string) => Promise<any>;
  rejectPendingUser: (pendingUserId: string) => Promise<any>;
  deleteProfile: (userId: string) => Promise<void>;
  refreshProfiles: () => Promise<void>;
  refreshPendingUsers: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const SupabaseAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allProfiles, setAllProfiles] = useState<Profile[]>([]);
  const [pendingUsers, setPendingUsers] = useState<any[]>([]);

  // Get auth actions
  const auth = supabaseAuthActions(setUser, setSession, setProfile);
  const userManager = supabaseUserActions();

  // Initialize auth state
  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        // Setup auth listener first
        const { data: { subscription } } = auth.setupAuthListener();

        // Get initial session
        const session = await auth.getCurrentSession();
        if (mounted && session) {
          setSession(session);
          setUser(session.user);
        }

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    const cleanup = initAuth();
    
    return () => {
      mounted = false;
      cleanup.then(fn => fn && fn());
    };
  }, []);

  // Load user management data for admins
  useEffect(() => {
    if (profile && (profile.role === UserRole.ADMIN || profile.role === UserRole.DEV_ADMIN)) {
      refreshProfiles();
      refreshPendingUsers();
    }
  }, [profile]);

  // Check if user has specific role
  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!profile) return false;
    
    if (Array.isArray(roles)) {
      return roles.includes(profile.role);
    }
    
    return profile.role === roles;
  };

  // Refresh profiles list
  const refreshProfiles = async () => {
    try {
      const profiles = await userManager.fetchAllProfiles();
      setAllProfiles(profiles);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  // Refresh pending users list
  const refreshPendingUsers = async () => {
    try {
      const pending = await userManager.fetchPendingUsers();
      setPendingUsers(pending);
    } catch (error) {
      console.error('Error fetching pending users:', error);
    }
  };

  // Enhanced user management functions
  const enhancedUpdateProfile = async (userId: string, updates: any) => {
    const result = await userManager.updateProfile(userId, updates);
    await refreshProfiles();
    return result;
  };

  const enhancedApprovePendingUser = async (pendingUserId: string) => {
    const result = await userManager.approvePendingUser(pendingUserId);
    await refreshPendingUsers();
    await refreshProfiles();
    return result;
  };

  const enhancedRejectPendingUser = async (pendingUserId: string) => {
    const result = await userManager.rejectPendingUser(pendingUserId);
    await refreshPendingUsers();
    return result;
  };

  const enhancedDeleteProfile = async (userId: string) => {
    await userManager.deleteProfile(userId);
    await refreshProfiles();
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user,
        session,
        profile,
        isAuthenticated: !!user,
        isLoading,
        login: auth.login,
        register: auth.register,
        loginWithGoogle: auth.loginWithGoogle,
        logout: auth.logout,
        hasRole,
        // User management
        allProfiles,
        pendingUsers,
        updateProfile: enhancedUpdateProfile,
        createPendingUser: userManager.createPendingUser,
        approvePendingUser: enhancedApprovePendingUser,
        rejectPendingUser: enhancedRejectPendingUser,
        deleteProfile: enhancedDeleteProfile,
        refreshProfiles,
        refreshPendingUsers
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
