
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

  // Fetch pending users (placeholder - implement with actual pending users table if needed)
  const fetchPendingUsers = async () => {
    // This would be a separate pending_users table in a real implementation
    return [];
  };

  // Create pending user (placeholder)
  const createPendingUser = async (userData: any) => {
    // This would insert into pending_users table in a real implementation
    return userData;
  };

  // Approve pending user (placeholder)
  const approvePendingUser = async (pendingUserId: string) => {
    // This would move user from pending_users to profiles/auth in a real implementation
    return { id: pendingUserId };
  };

  // Reject pending user (placeholder)
  const rejectPendingUser = async (pendingUserId: string) => {
    // This would update pending_users table in a real implementation
    return { id: pendingUserId };
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
    fetchPendingUsers,
    updateProfile,
    deleteProfile,
    createPendingUser,
    approvePendingUser,
    rejectPendingUser
  };
};
