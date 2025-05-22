
// @ts-nocheck
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { NotificationRequest } from "./types.ts";
import { corsHeaders, sendEmail } from "./email-service.ts";
import { 
  generateRegistrationEmail, 
  generateRegistrationConfirmationEmail,
  generateApprovalEmail,
  generateRejectionEmail
} from "./email-templates.ts";

const handler = async (req: Request): Promise<Response> => {
  // CORS Preflight-Anfragen behandeln
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Edge-Funktion aufgerufen:", req.method);
    
    const { type, userData }: NotificationRequest = await req.json();
    console.log(`Verarbeite ${type}-Benachrichtigung für:`, userData.email);

    let emailData;
    let confirmationResult = null;

    switch (type) {
      case "registration":
        emailData = generateRegistrationEmail(userData);
        // Zusätzlich eine Bestätigungsmail an den Benutzer senden
        confirmationResult = await sendEmail(generateRegistrationConfirmationEmail(userData));
        console.log("Bestätigungs-E-Mail an Benutzer gesendet:", confirmationResult);
        break;
      case "approval":
        emailData = generateApprovalEmail(userData);
        break;
      case "rejection":
        emailData = generateRejectionEmail(userData);
        break;
      default:
        throw new Error("Unbekannter Benachrichtigungstyp");
    }

    // E-Mail über die sendEmail Funktion senden
    const result = await sendEmail(emailData);
    console.log(`${type}-Benachrichtigungs-E-Mail-Ergebnis:`, result);
    
    // Wenn es eine Registrierung ist, geben wir auch das Ergebnis der Bestätigungs-E-Mail zurück
    if (type === "registration" && confirmationResult) {
      return new Response(JSON.stringify({
        mainEmail: result,
        confirmationEmail: confirmationResult
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }
    
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Fehler in der send-notification-Funktion:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
