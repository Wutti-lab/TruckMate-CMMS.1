
import { UserRole } from '@/lib/types/user-roles';
import { UserWithPassword, PendingUser } from './types';

// Example users for testing purposes
export const initialMockUsers: UserWithPassword[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@truckmate.com",
    role: UserRole.ADMIN,
    password: "123456"
  },
  {
    id: "2",
    name: "Fleet Manager",
    email: "fleet@truckmate.com",
    role: UserRole.FLEET_MANAGER,
    password: "123456"
  },
  {
    id: "3",
    name: "Driver User",
    email: "driver@truckmate.com",
    role: UserRole.DRIVER,
    password: "123456"
  },
  {
    id: "4",
    name: "Mechanic User",
    email: "mechanic@truckmate.com",
    role: UserRole.MECHANIC,
    password: "123456"
  },
  {
    id: "5",
    name: "Dispatcher User",
    email: "dispatcher@truckmate.com",
    role: UserRole.DISPATCHER,
    password: "123456"
  },
  {
    id: "6",
    name: "Dev Admin User",
    email: "dev@truckmate.com",
    role: UserRole.DEV_ADMIN,
    password: "123456"
  }
];

export const initialPendingUsers: PendingUser[] = [
  {
    id: "101",
    name: "Pending User",
    email: "pending@truckmate.com",
    role: UserRole.DRIVER,
    password: "123456",
    paymentStatus: "paid",
    approvalStatus: "pending",
    createdAt: "2025-05-09T10:00:00.000Z"
  }
];
