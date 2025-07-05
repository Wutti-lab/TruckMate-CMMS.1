
import { User, UserRole } from '@/lib/types/user-roles';

// Interface für Login-Aktivitäten
export interface LoginActivity {
  id: string;
  userId: string;
  userName: string;
  timestamp: Date;
  userRole: UserRole;
}

export interface PendingUser {
  id: string;
  full_name: string;
  email: string;
  phoneNumber?: string;
  role: UserRole;
  password: string;
  paymentStatus: 'paid' | 'unpaid';
  approvalStatus: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  company?: string;
  jobTitle?: string;
}

export interface UserWithPassword extends User {
  password: string;
  phoneNumber?: string;
  googleId?: string;
  activationDate?: string;
  expiryDate?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithPhone: (phoneNumber: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
  loginActivities: LoginActivity[];
  getFilteredLoginActivities: () => LoginActivity[];
  // Account management functions
  mockUsers: User[];
  pendingUsers: PendingUser[];
  createUser: (user: User & { password: string }) => void;
  createPendingUser: (user: PendingUser) => void;
  updateUserList: (user: User & { password?: string }) => void;
  deleteUser: (id: string) => void;
  approvePendingUser: (id: string) => void;
  rejectPendingUser: (id: string) => void;
  getPendingUsersCount: () => number;
}
