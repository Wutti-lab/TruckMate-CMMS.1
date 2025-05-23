
// @ts-nocheck
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { corsHeaders, sendEmail } from "../send-notification/email-service.ts";

// Hilfsfunktion zum Extrahieren der Dateien aus FormData
async function getFilesFromFormData(formData: FormData) {
  const files = [];
  
  // Extrahieren aller Dateien aus dem FormData
  for (const [key, value] of formData.entries()) {
    if (key.startsWith('file') && value instanceof File) {
      // Konvertiere File zu Base64 für den E-Mail-Anhang
      const arrayBuffer = await value.arrayBuffer();
      const base64 = btoa(
        new Uint8Array(arrayBuffer)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      
      files.push({
        name: value.name,
        type: value.type,
        size: value.size,
        content: base64
      });
    }
  }
  
  return files;
}

const handler = async (req: Request): Promise<Response> => {
  // CORS Preflight-Anfragen behandeln
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // FormData aus der Anfrage extrahieren
    const formData = await req.formData();
    
    // Daten aus dem FormData abrufen
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const company = formData.get("company") as string;
    const address = formData.get("address") as string;
    const planName = formData.get("planName") as string;
    const to = formData.get("to") as string || "truckmatecmms@gmail.com";
    
    // Dateien aus FormData extrahieren
    const files = await getFilesFromFormData(formData);
    
    console.log(`Verarbeite Zahlungsnachweis von ${name}, ${email} für Plan: ${planName}`);
    console.log(`Anzahl der Dateien: ${files.length}`);
    
    // E-Mail vorbereiten
    const emailData = {
      to: to,
      subject: `Zahlungsnachweis von ${name} für ${planName} Plan`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #1a73e8; margin-bottom: 20px;">Neuer Zahlungsnachweis</h2>
          
          <p>Ein Kunde hat einen Zahlungsnachweis für TruckMate CMMS gesendet.</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; margin: 15px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>E-Mail:</strong> ${email}</p>
            <p><strong>Telefon:</strong> ${phone}</p>
            <p><strong>Firma:</strong> ${company}</p>
            <p><strong>Adresse:</strong> ${address}</p>
            <p><strong>Ausgewählter Plan:</strong> ${planName}</p>
            <p><strong>Anzahl der Anhänge:</strong> ${files.length}</p>
          </div>
          
          <p style="color: #666; font-size: 14px;">Diese Benachrichtigung wurde automatisch vom TruckMate CMMS-System generiert.</p>
        </div>
      `
    };
    
    // Wenn wir Dateien haben, fügen wir diese als Anhänge hinzu
    if (files.length > 0) {
      emailData.attachments = files.map(file => ({
        filename: file.name,
        content: file.content,
        encoding: 'base64',
        type: file.type
      }));
    }
    
    // E-Mail über die sendEmail Funktion senden
    const result = await sendEmail(emailData);
    console.log("Ergebnis des E-Mail-Versands:", result);
    
    if (!result.success) {
      throw new Error(result.message || "E-Mail konnte nicht gesendet werden");
    }
    
    return new Response(JSON.stringify({
      success: true,
      message: "Zahlungsnachweis erfolgreich gesendet"
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
    
  } catch (error: any) {
    console.error("Fehler beim Verarbeiten des Zahlungsnachweises:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
