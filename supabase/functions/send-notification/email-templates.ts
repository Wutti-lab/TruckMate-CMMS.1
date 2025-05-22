
import { NotificationRequest, EmailData } from "./types.ts";

// Template for admin notification about new registrations
export function generateRegistrationEmail(userData: NotificationRequest["userData"]) {
  return {
    to: "truckmatecmms@gmail.com", 
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

// Registration confirmation email template for the user
export function generateRegistrationConfirmationEmail(userData: NotificationRequest["userData"]) {
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

// Account approval email template (sent to admin for forwarding)
export function generateApprovalEmail(userData: NotificationRequest["userData"]) {
  return {
    to: "truckmatecmms@gmail.com",
    subject: `KONTO AKTIVIERT: ${userData.name} - TruckMate CMMS`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://truckmatecmms.com/lovable-uploads/3a761e15-fdda-4b29-85ed-81450a5e2bc3.png" alt="TruckMate CMMS Logo" style="max-width: 150px; height: auto;" />
        </div>
        
        <h2 style="color: #1a73e8; margin-bottom: 20px;">Konto für ${userData.name} wurde aktiviert!</h2>
        
        <p><strong>Diese E-Mail wurde an die Admin-Adresse gesendet.</strong></p>
        <p>Das folgende Konto wurde gerade aktiviert:</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; margin: 15px 0;">
          <p><strong>Name:</strong> ${userData.name}</p>
          <p><strong>E-Mail:</strong> ${userData.email}</p>
          ${userData.company ? `<p><strong>Unternehmen:</strong> ${userData.company}</p>` : ''}
          ${userData.phoneNumber ? `<p><strong>Telefon:</strong> ${userData.phoneNumber}</p>` : ''}
          ${userData.jobTitle ? `<p><strong>Position:</strong> ${userData.jobTitle}</p>` : ''}
        </div>
        
        <p>Bitte leiten Sie die Bestätigung an den Kunden weiter oder benutzen Sie die folgende E-Mail-Vorlage:</p>
        
        <div style="background-color: #f0f7ff; padding: 15px; border-radius: 4px; margin: 15px 0; border-left: 4px solid #1a73e8;">
          <p><strong>Betreff:</strong> Willkommen bei TruckMate CMMS - Ihr Konto wurde aktiviert</p>
          <p><strong>An:</strong> ${userData.email}</p>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 15px 0;" />
          
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
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
            
            <p style="margin: 30px 0; text-align: center;">
              <a href="https://truckmate-cmms.com/login" style="background-color: #1a73e8; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Jetzt anmelden</a>
            </p>
            
            <p>Falls Sie Fragen haben oder Unterstützung benötigen, können Sie uns jederzeit kontaktieren:</p>
            <p style="margin-bottom: 20px;">E-Mail: <a href="mailto:truckmatecmms@gmail.com">truckmatecmms@gmail.com</a></p>
            
            <p style="color: #666; font-size: 14px;">Mit freundlichen Grüßen,<br>Ihr TruckMate CMMS-Team</p>
          </div>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
        
        <p style="color: #666; font-size: 14px;">Diese Benachrichtigung wurde automatisch vom TruckMate CMMS-System generiert.</p>
      </div>
    `
  };
}

// Account rejection email template (sent to admin for forwarding)
export function generateRejectionEmail(userData: NotificationRequest["userData"]) {
  return {
    to: "truckmatecmms@gmail.com", 
    subject: `KONTO ABGELEHNT: ${userData.name} - TruckMate CMMS`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://truckmatecmms.com/lovable-uploads/3a761e15-fdda-4b29-85ed-81450a5e2bc3.png" alt="TruckMate CMMS Logo" style="max-width: 150px; height: auto;" />
        </div>
        
        <h2 style="color: #555; margin-bottom: 20px;">Konto für ${userData.name} wurde abgelehnt</h2>
        
        <p><strong>Diese E-Mail wurde an die Admin-Adresse gesendet.</strong></p>
        <p>Das folgende Konto wurde gerade abgelehnt:</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; margin: 15px 0;">
          <p><strong>Name:</strong> ${userData.name}</p>
          <p><strong>E-Mail:</strong> ${userData.email}</p>
          ${userData.company ? `<p><strong>Unternehmen:</strong> ${userData.company}</p>` : ''}
          ${userData.phoneNumber ? `<p><strong>Telefon:</strong> ${userData.phoneNumber}</p>` : ''}
          ${userData.jobTitle ? `<p><strong>Position:</strong> ${userData.jobTitle}</p>` : ''}
        </div>
        
        <p>Bitte leiten Sie die Ablehnungsnachricht an den Bewerber weiter oder benutzen Sie die folgende E-Mail-Vorlage:</p>
        
        <div style="background-color: #fff0f0; padding: 15px; border-radius: 4px; margin: 15px 0; border-left: 4px solid #d32f2f;">
          <p><strong>Betreff:</strong> Information zu Ihrem TruckMate CMMS-Konto</p>
          <p><strong>An:</strong> ${userData.email}</p>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 15px 0;" />
          
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
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
            
            <p style="color: #666; font-size: 14px;">Mit freundlichen Grüßen,<br>Ihr TruckMate CMMS-Team</p>
          </div>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
        
        <p style="color: #666; font-size: 14px;">Diese Benachrichtigung wurde automatisch vom TruckMate CMMS-System generiert.</p>
      </div>
    `
  };
}

// Direct customer email template - can be used to send directly to customers when domain is verified
export function generateDirectCustomerApprovalEmail(userData: NotificationRequest["userData"]): EmailData {
  return {
    to: userData.email,
    subject: "Willkommen bei TruckMate CMMS - Ihr Konto wurde aktiviert",
    html: `
      <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
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
        
        <p style="margin: 30px 0; text-align: center;">
          <a href="https://truckmate-cmms.com/login" style="background-color: #1a73e8; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Jetzt anmelden</a>
        </p>
        
        <p>Falls Sie Fragen haben oder Unterstützung benötigen, können Sie uns jederzeit kontaktieren:</p>
        <p style="margin-bottom: 20px;">E-Mail: <a href="mailto:truckmatecmms@gmail.com">truckmatecmms@gmail.com</a></p>
        
        <p style="color: #666; font-size: 14px;">Mit freundlichen Grüßen,<br>Ihr TruckMate CMMS-Team</p>
      </body>
      </html>
    `
  };
}
