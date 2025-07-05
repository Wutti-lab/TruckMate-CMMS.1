
export enum UserRole {
  ADMIN = "admin",
  DEV_ADMIN = "dev_admin",
  FLEET_MANAGER = "fleet_manager", 
  DRIVER = "driver",
  MECHANIC = "mechanic",
  DISPATCHER = "dispatcher"
}

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: string;
  company_id: string | null;
  language: string | null;
  avatar_url: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  activationDate?: string;
  expiryDate?: string;
}
