
// @ts-nocheck
import { EmailData, EmailResult } from "./types.ts";

// CORS headers for cross-origin requests
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Send email with fetch API instead of with Resend
export async function sendEmail(emailData: EmailData): Promise<EmailResult> {
  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    
    // If no API key is configured, we simulate sending the email
    if (!resendApiKey) {
      console.log("RESEND_API_KEY not configured. Email would be sent:", JSON.stringify(emailData, null, 2));
      return { success: true, message: "Email simulated (no API key)" };
    }

    // Call Resend API directly via fetch
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        from: "TruckMate CMMS <onboarding@resend.dev>",
        ...emailData
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Error sending email:", errorData);
      return { success: false, message: `API error: ${response.status}`, error: errorData };
    }

    const data = await response.json();
    console.log("Email sent successfully:", data);
    return { success: true, message: "Email sent successfully", data };
    
  } catch (err: any) {
    console.error("Error with Resend API:", err);
    return { success: false, message: err.message };
  }
}
