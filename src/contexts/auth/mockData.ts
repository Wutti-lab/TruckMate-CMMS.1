
import { UserRole } from '@/lib/types/user-roles';
import { UserWithPassword, PendingUser } from './types';

// Example users for testing purposes
export const initialMockUsers: UserWithPassword[] = [
  {
    id: "1",
    full_name: "Admin User",
    email: "admin@truckmate.com",
    role: UserRole.ADMIN,
    password: "123456"
  },
  {
    id: "2",
    full_name: "Fleet Manager",
    email: "fleet@truckmate.com",
    role: UserRole.FLEET_MANAGER,
    password: "123456"
  },
  {
    id: "3",
    full_name: "Driver User",
    email: "driver@truckmate.com",
    role: UserRole.DRIVER,
    password: "123456"
  },
  {
    id: "4",
    full_name: "Mechanic User",
    email: "mechanic@truckmate.com",
    role: UserRole.MECHANIC,
    password: "123456"
  },
  {
    id: "5",
    full_name: "Dispatcher User",
    email: "dispatcher@truckmate.com",
    role: UserRole.DISPATCHER,
    password: "123456"
  },
  {
    id: "6",
    full_name: "Dev Admin User",
    email: "dev@truckmate.com",
    role: UserRole.DEV_ADMIN,
    password: "123456"
  },
  // Phone number users
  {
    id: "7",
    full_name: "Phone User",
    email: "phone@truckmate.com",
    phoneNumber: "+49123456789",
    role: UserRole.DRIVER,
    password: "123456"
  },
  // Google users
  {
    id: "8",
    full_name: "Google User",
    email: "google@gmail.com",
    googleId: "google-user-123",
    role: UserRole.FLEET_MANAGER,
    password: ""  // No password needed for Google authentication
  }
];

export const initialPendingUsers: PendingUser[] = [
  {
    id: "101",
    full_name: "Pending User",
    email: "pending@truckmate.com",
    role: UserRole.DRIVER,
    password: "123456",
    paymentStatus: "paid",
    approvalStatus: "pending",
    createdAt: "2025-05-09T10:00:00.000Z"
  }
];
