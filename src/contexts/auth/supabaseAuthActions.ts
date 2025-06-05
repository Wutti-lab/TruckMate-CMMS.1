
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { UserRole } from '@/lib/types/user-roles';

// Supabase Authentication Actions
export const supabaseAuthActions = (
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  setSession: React.Dispatch<React.SetStateAction<Session | null>>,
  setProfile: React.Dispatch<React.SetStateAction<any>>
) => {
  // Login with email and password
  const login = async (email: string, password: string): Promise<void> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (data.user && data.session) {
      setUser(data.user);
      setSession(data.session);
      
      // Fetch user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
      
      if (profile) {
        setProfile(profile);
      }
    }
  };

  // Register new user
  const register = async (email: string, password: string, userData: {
    name: string;
    phone_number?: string;
    company?: string;
    job_title?: string;
    role?: string;
  }): Promise<any> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: userData
      }
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  // Logout
  const logout = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
    
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  // Get current session
  const getCurrentSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  };

  // Setup auth state listener
  const setupAuthListener = () => {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Fetch user profile when user logs in
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (profile) {
          setProfile(profile);
        }
      } else {
        setProfile(null);
      }
    });
  };

  return {
    login,
    register,
    logout,
    getCurrentSession,
    setupAuthListener
  };
};
