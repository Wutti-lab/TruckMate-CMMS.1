
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

// User Management Actions for Supabase
export const supabaseUserActions = () => {
  // Fetch all profiles (admin only)
  const fetchAllProfiles = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data || [];
  };

  // Update user profile
  const updateProfile = async (userId: string, updates: any) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  // Delete profile (admin only)
  const deleteProfile = async (userId: string) => {
    // Delete auth user (this will cascade to profile due to foreign key)
    const { error } = await supabase.auth.admin.deleteUser(userId);

    if (error) {
      throw new Error(error.message);
    }
  };

  return {
    fetchAllProfiles,
    updateProfile,
    deleteProfile
  };
};
