
// This file now exports from the new Supabase Auth system
export { SupabaseAuthProvider as AuthProvider } from './auth/SupabaseAuthProvider';
export { useSupabaseAuth as useAuth } from './auth/supabaseHooks';

// Legacy exports for compatibility
export type { LoginActivity, PendingUser } from './auth/types';
