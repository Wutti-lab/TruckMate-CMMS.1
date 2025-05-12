
import { UserRole } from "@/lib/types/user-roles";
import { AppFunction } from "./types";

export function getLocalizedTitle(func: AppFunction, language: string) {
  switch(language) {
    case 'de': return func.title.de;
    case 'th': return func.title.th;
    default: return func.title.en;
  }
}

export function getLocalizedDescription(func: AppFunction, language: string) {
  switch(language) {
    case 'de': return func.description.de;
    case 'th': return func.description.th;
    default: return func.description.en;
  }
}

export function getRoleLabel(role: UserRole, language: string) {
  switch(language) {
    case 'de':
      switch(role) {
        case UserRole.ADMIN: return 'Administrator';
        case UserRole.DEV_ADMIN: return 'Entwickler-Administrator';
        case UserRole.FLEET_MANAGER: return 'Flottenmanager';
        case UserRole.DRIVER: return 'Fahrer';
        case UserRole.MECHANIC: return 'Mechaniker';
        case UserRole.DISPATCHER: return 'Disponent';
      }
      break;
    case 'th':
      switch(role) {
        case UserRole.ADMIN: return 'ผู้ดูแลระบบ';
        case UserRole.DEV_ADMIN: return 'ผู้ดูแลระบบนักพัฒนา';
        case UserRole.FLEET_MANAGER: return 'ผู้จัดการกองยานพาหนะ';
        case UserRole.DRIVER: return 'คนขับ';
        case UserRole.MECHANIC: return 'ช่างกล';
        case UserRole.DISPATCHER: return 'ผู้จัดส่ง';
      }
      break;
    default:
      switch(role) {
        case UserRole.ADMIN: return 'Administrator';
        case UserRole.DEV_ADMIN: return 'Developer Administrator';
        case UserRole.FLEET_MANAGER: return 'Fleet Manager';
        case UserRole.DRIVER: return 'Driver';
        case UserRole.MECHANIC: return 'Mechanic';
        case UserRole.DISPATCHER: return 'Dispatcher';
      }
  }
}

export function getViewTitle(language: string) {
  switch(language) {
    case 'de': return 'Funktionen anzeigen nach';
    case 'th': return 'ดูฟังก์ชันตาม';
    default: return 'View functions by';
  }
}

export function getUserFunctions(functions: AppFunction[], hasRole: (roles: UserRole[]) => boolean) {
  return functions.filter(func => hasRole(func.roles));
}

export function getFunctionsByRole(functions: AppFunction[], role: UserRole) {
  return functions.filter(func => func.roles.includes(role));
}

export function getTabLabel(viewMode: string, language: string) {
  if (viewMode === 'user') {
    return language === 'de' ? 'Meine Funktionen' : 
           language === 'th' ? 'ฟังก์ชันของฉัน' : 
           'My Functions';
  } else {
    return language === 'de' ? 'Alle Rollen & Funktionen' : 
           language === 'th' ? 'บทบาทและฟังก์ชันทั้งหมด' : 
           'All Roles & Functions';
  }
}
