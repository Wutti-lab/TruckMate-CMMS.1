
export interface NotificationRequest {
  type: "registration" | "approval" | "rejection";
  userData: {
    name: string;
    email: string;
    company?: string;
    phoneNumber?: string;
    jobTitle?: string;
    registrationDate: string;
  };
}

export interface EmailData {
  to: string;
  subject: string;
  html: string;
}

export interface EmailResult {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}
