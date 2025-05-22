
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@1.0.0";

// CORS headers für Cross-Origin-Anfragen
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Resend API-Client initialisieren
const resendApiKey = Deno.env.get("RESEND_API_KEY");
const resend = resendApiKey ? new Resend(resendApiKey) : null;

interface NotificationRequest {
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

function generateRegistrationEmail(userData: NotificationRequest["userData"]) {
  return {
    to: "truckmatecmms@gmail.com", // Empfänger-E-Mail-Adresse
    subject: "Neue TruckMate CMMS-Kontoregistrierung",
    html: `
      <h2>Neue Kontoregistrierung für TruckMate CMMS</h2>
      <p>Ein neuer Benutzer hat sich für TruckMate CMMS registriert. Hier sind die Details:</p>
      <table border="0" cellpadding="5" style="border-collapse: collapse;">
        <tr>
          <td><strong>Name:</strong></td>
          <td>${userData.name}</td>
        </tr>
        <tr>
          <td><strong>E-Mail:</strong></td>
          <td>${userData.email}</td>
        </tr>
        ${userData.company ? `
        <tr>
          <td><strong>Unternehmen:</strong></td>
          <td>${userData.company}</td>
        </tr>` : ''}
        ${userData.phoneNumber ? `
        <tr>
          <td><strong>Telefon:</strong></td>
          <td>${userData.phoneNumber}</td>
        </tr>` : ''}
        ${userData.jobTitle ? `
        <tr>
          <td><strong>Position:</strong></td>
          <td>${userData.jobTitle}</td>
        </tr>` : ''}
        <tr>
          <td><strong>Registrierungsdatum:</strong></td>
          <td>${new Date(userData.registrationDate).toLocaleString('de-DE')}</td>
        </tr>
      </table>
      <p>Bitte melden Sie sich im Admin-Bereich an, um dieses Konto zu überprüfen und zu genehmigen oder abzulehnen.</p>
    `
  };
}

// Neue Registrierungsbestätigungsemail für den Benutzer
function generateRegistrationConfirmationEmail(userData: NotificationRequest["userData"]) {
  return {
    to: userData.email,
    subject: "Ihre Registrierung bei TruckMate CMMS",
    html: `
      <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://truckmatecmms.com/lovable-uploads/3a761e15-fdda-4b29-85ed-81450a5e2bc3.png" alt="TruckMate Logo" style="width: 150px;">
        </div>
        <h2 style="color: #4CAF50;">Vielen Dank für Ihre Registrierung bei TruckMate CMMS</h2>
        <p>Sehr geehrte/r ${userData.name},</p>
        <p>Wir freuen uns, dass Sie sich bei TruckMate CMMS registriert haben. Wir werden Ihre Anfrage in Kürze bearbeiten und uns zeitnah telefonisch sowie per E-Mail mit Ihnen in Verbindung setzen.</p>
        <p>Falls Sie in der Zwischenzeit Fragen haben, stehen wir Ihnen gern zur Verfügung.</p>
        <p>Vielen Dank für Ihr Vertrauen!</p>
        <p>Mit freundlichen Grüßen,<br>Ihr TruckMate CMMS Team</p>
      </body>
      </html>
    `
  };
}

function generateApprovalEmail(userData: NotificationRequest["userData"]) {
  return {
    to: userData.email,
    subject: "Willkommen bei TruckMate CMMS - Ihr Konto wurde genehmigt",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://truckmatecmms.com/lovable-uploads/3a761e15-fdda-4b29-85ed-81450a5e2bc3.png" alt="TruckMate CMMS Logo" style="max-width: 150px; height: auto;" />
        </div>
        
        <h2 style="color: #1a73e8; margin-bottom: 20px;">Willkommen bei TruckMate CMMS, ${userData.name}!</h2>
        
        <p>Wir freuen uns, Ihnen mitteilen zu können, dass Ihr Konto genehmigt wurde und jetzt aktiv ist.</p>
        
        <p>Mit TruckMate CMMS können Sie:</p>
        <ul style="margin-bottom: 20px;">
          <li>Ihre Flotte effizient verwalten</li>
          <li>Fahrzeugwartung überwachen</li>
          <li>Fahrer und Routen optimieren</li>
          <li>Alle notwendigen Inspektionen dokumentieren</li>
        </ul>
        
        <p>Sie können sich jetzt mit Ihrer E-Mail-Adresse <strong>${userData.email}</strong> und Ihrem Passwort anmelden.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://truckmate-cmms.com/login" style="background-color: #1a73e8; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Jetzt anmelden</a>
        </div>
        
        <p>Falls Sie Fragen haben oder Unterstützung benötigen, können Sie uns jederzeit kontaktieren:</p>
        <p style="margin-bottom: 20px;">E-Mail: <a href="mailto:support@truckmate-cmms.com">support@truckmate-cmms.com</a></p>
        
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
        
        <p style="color: #666; font-size: 14px;">Mit freundlichen Grüßen,<br>Ihr TruckMate CMMS-Team</p>
      </div>
    `
  };
}

function generateRejectionEmail(userData: NotificationRequest["userData"]) {
  return {
    to: userData.email,
    subject: "Information zu Ihrem TruckMate CMMS-Konto",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://truckmatecmms.com/lovable-uploads/3a761e15-fdda-4b29-85ed-81450a5e2bc3.png" alt="TruckMate CMMS Logo" style="max-width: 150px; height: auto;" />
        </div>
        
        <h2 style="color: #555; margin-bottom: 20px;">Vielen Dank für Ihr Interesse an TruckMate CMMS, ${userData.name}</h2>
        
        <p>Wir möchten uns für Ihr Interesse an unserem Flottenmanagementsystem bedanken.</p>
        
        <p>Leider müssen wir Ihnen mitteilen, dass Ihr Kontoantrag zu diesem Zeitpunkt nicht genehmigt werden konnte.</p>
        
        <p>Dies kann verschiedene Gründe haben:</p>
        <ul style="margin-bottom: 20px;">
          <li>Unvollständige Unternehmensinformationen</li>
          <li>Die angegebene Branche passt nicht zu unserem aktuellen Angebot</li>
          <li>Wir benötigen zusätzliche Informationen zu Ihrem Anwendungsfall</li>
        </ul>
        
        <p>Für weitere Informationen oder Fragen kontaktieren Sie uns bitte direkt:</p>
        <p style="margin-bottom: 20px;">E-Mail: <a href="mailto:truckmatecmms@gmail.com">truckmatecmms@gmail.com</a></p>
        
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
        
        <p style="color: #666; font-size: 14px;">Mit freundlichen Grüßen,<br>Ihr TruckMate CMMS-Team</p>
      </div>
    `
  };
}

// E-Mail mit Resend versenden
async function sendEmail(emailData: any) {
  if (!resend) {
    console.log("RESEND_API_KEY nicht konfiguriert. E-Mail würde gesendet werden:", JSON.stringify(emailData, null, 2));
    return { success: true, message: "E-Mail simuliert (kein API-Key)" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "TruckMate CMMS <onboarding@resend.dev>", // Muss mit validierter Domain angepasst werden
      ...emailData
    });
    
    if (error) {
      console.error("Fehler beim Senden der E-Mail:", error);
      return { success: false, message: error.message };
    }
    
    return { success: true, message: "E-Mail erfolgreich gesendet", data };
  } catch (err) {
    console.error("Fehler bei Resend API:", err);
    return { success: false, message: err.message };
  }
}

const handler = async (req: Request): Promise<Response> => {
  // CORS Preflight-Anfragen behandeln
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, userData }: NotificationRequest = await req.json();

    let emailData;
    let confirmationResult = null;

    switch (type) {
      case "registration":
        emailData = generateRegistrationEmail(userData);
        // Zusätzlich eine Bestätigungsmail an den Benutzer senden
        confirmationResult = await sendEmail(generateRegistrationConfirmationEmail(userData));
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

    // E-Mail über Resend senden
    const result = await sendEmail(emailData);
    
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
