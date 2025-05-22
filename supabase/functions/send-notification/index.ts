
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// CORS headers für Cross-Origin-Anfragen
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

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

function generateApprovalEmail(userData: NotificationRequest["userData"]) {
  return {
    to: userData.email,
    subject: "Ihr TruckMate CMMS-Konto wurde genehmigt",
    html: `
      <h2>Willkommen bei TruckMate CMMS, ${userData.name}!</h2>
      <p>Wir freuen uns, Ihnen mitteilen zu können, dass Ihr Konto genehmigt wurde und jetzt aktiv ist.</p>
      <p>Sie können sich jetzt mit Ihrer E-Mail-Adresse und Ihrem Passwort anmelden und alle Funktionen von TruckMate CMMS nutzen.</p>
      <p>Bei Fragen stehen wir Ihnen gerne zur Verfügung.</p>
      <p>Mit freundlichen Grüßen,<br>Das TruckMate CMMS-Team</p>
    `
  };
}

function generateRejectionEmail(userData: NotificationRequest["userData"]) {
  return {
    to: userData.email,
    subject: "Information zu Ihrem TruckMate CMMS-Konto",
    html: `
      <h2>Vielen Dank für Ihr Interesse an TruckMate CMMS, ${userData.name}</h2>
      <p>Leider müssen wir Ihnen mitteilen, dass Ihr Kontoantrag nicht genehmigt werden konnte.</p>
      <p>Für weitere Informationen oder Fragen kontaktieren Sie uns bitte unter truckmatecmms@gmail.com.</p>
      <p>Mit freundlichen Grüßen,<br>Das TruckMate CMMS-Team</p>
    `
  };
}

// Simulierte E-Mail-Sendung (für Testzwecke)
async function simulateSendEmail(emailData: any) {
  console.log("E-Mail würde gesendet werden:", JSON.stringify(emailData, null, 2));
  // Hier würde in der Produktion die tatsächliche E-Mail-Versendung stattfinden
  // mit einem Dienst wie SendGrid, AWS SES oder einem SMTP-Server
  return { success: true, message: "E-Mail simuliert gesendet" };
}

const handler = async (req: Request): Promise<Response> => {
  // CORS Preflight-Anfragen behandeln
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, userData }: NotificationRequest = await req.json();

    let emailData;
    switch (type) {
      case "registration":
        emailData = generateRegistrationEmail(userData);
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

    // E-Mail senden (hier simuliert)
    const result = await simulateSendEmail(emailData);
    
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
