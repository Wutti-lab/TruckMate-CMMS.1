
import { UserRole } from "@/lib/types/user-roles";
import { LucideIcon } from "lucide-react";

export type AppFunction = {
  title: {
    en: string;
    de: string;
    th: string;
  };
  description: {
    en: string;
    de: string;
    th: string;
  };
  icon: LucideIcon;
  path: string;
  roles: UserRole[];
};

export type Language = 'en' | 'de' | 'th';
