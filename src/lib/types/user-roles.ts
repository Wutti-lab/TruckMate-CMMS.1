
export enum UserRole {
  ADMIN = "admin",
  DEV_ADMIN = "dev_admin",
  FLEET_MANAGER = "fleet_manager", 
  DRIVER = "driver",
  MECHANIC = "mechanic",
  DISPATCHER = "dispatcher"
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
