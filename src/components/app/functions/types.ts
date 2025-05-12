
import { UserRole } from "@/lib/types/user-roles";
import { LucideIcon } from "lucide-react";

/**
 * Represents an application function with multilingual support
 */
export type AppFunction = {
  /**
   * Localized function titles
   */
  title: {
    en: string;
    de: string;
    th: string;
  };
  /**
   * Detailed localized descriptions of the function
   */
  description: {
    en: string;
    de: string;
    th: string;
  };
  /**
   * Icon representing the function
   */
  icon: LucideIcon;
  /**
   * URL path to the function
   */
  path: string;
  /**
   * User roles that can access this function
   */
  roles: UserRole[];
};

/**
 * Supported language codes
 */
export type Language = 'en' | 'de' | 'th';
