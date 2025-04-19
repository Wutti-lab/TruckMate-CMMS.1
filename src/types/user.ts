
export type UserRole = 'driver' | 'manager' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}
