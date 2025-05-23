
// Types for email notifications

export interface EmailAttachment {
  filename: string;
  content: string;
  encoding: string;
  type: string;
}

export interface EmailData {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: EmailAttachment[];
}

export interface EmailResult {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}
