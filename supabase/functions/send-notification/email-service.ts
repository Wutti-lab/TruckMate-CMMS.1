
// @ts-nocheck
import { EmailData, EmailResult } from "./types.ts";

// CORS headers für Cross-Origin-Anfragen
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// E-Mail mit fetch API senden anstatt mit Resend
export async function sendEmail(emailData: EmailData): Promise<EmailResult> {
  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    
    // Wenn kein API-Schlüssel konfiguriert ist, simulieren wir den E-Mail-Versand
    if (!resendApiKey) {
      console.log("RESEND_API_KEY nicht konfiguriert. E-Mail würde gesendet werden:", JSON.stringify(emailData, null, 2));
      return { success: true, message: "E-Mail simuliert (kein API-Key)" };
    }

    // Resend API direkt über fetch aufrufen
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
      console.error("Fehler beim Senden der E-Mail:", errorData);
      return { success: false, message: `API-Fehler: ${response.status}`, error: errorData };
    }

    const data = await response.json();
    console.log("E-Mail erfolgreich gesendet:", data);
    return { success: true, message: "E-Mail erfolgreich gesendet", data };
    
  } catch (err: any) {
    console.error("Fehler bei Resend API:", err);
    return { success: false, message: err.message };
  }
}
