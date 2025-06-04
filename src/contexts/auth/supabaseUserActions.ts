
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

  // Fetch pending users (admin only)
  const fetchPendingUsers = async () => {
    const { data, error } = await supabase
      .from('pending_users')
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

  // Create pending user registration
  const createPendingUser = async (userData: {
    name: string;
    email: string;
    phone_number?: string;
    company?: string;
    job_title?: string;
    role?: string;
    password_hash: string;
    payment_status?: string;
  }) => {
    const { data, error } = await supabase
      .from('pending_users')
      .insert([userData])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  // Approve pending user
  const approvePendingUser = async (pendingUserId: string) => {
    // Get pending user data
    const { data: pendingUser, error: fetchError } = await supabase
      .from('pending_users')
      .select('*')
      .eq('id', pendingUserId)
      .single();

    if (fetchError || !pendingUser) {
      throw new Error('Pending user not found');
    }

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: pendingUser.email,
      password: pendingUser.password_hash,
      user_metadata: {
        name: pendingUser.name,
        phone_number: pendingUser.phone_number,
        company: pendingUser.company,
        job_title: pendingUser.job_title,
        role: pendingUser.role
      },
      email_confirm: true
    });

    if (authError) {
      throw new Error(authError.message);
    }

    // Update pending user status
    const { error: updateError } = await supabase
      .from('pending_users')
      .update({ approval_status: 'approved' })
      .eq('id', pendingUserId);

    if (updateError) {
      throw new Error(updateError.message);
    }

    return authData;
  };

  // Reject pending user
  const rejectPendingUser = async (pendingUserId: string) => {
    const { data, error } = await supabase
      .from('pending_users')
      .update({ approval_status: 'rejected' })
      .eq('id', pendingUserId)
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
    createPendingUser,
    approvePendingUser,
    rejectPendingUser,
    deleteProfile
  };
};
