
import { PaymentFormData } from "../form/PaymentFormSchema";
import { supabase } from "@/integrations/supabase/client";

interface EmailWithAttachmentProps {
  formData: PaymentFormData;
  files: File[];
  planName: string;
}

/**
 * Send email with payment proof attachment to truckmatecmms@gmail.com
 */
export async function sendEmailWithAttachment({
  formData,
  files,
  planName
}: EmailWithAttachmentProps): Promise<boolean> {
  try {
    // Create FormData for the API call
    const apiFormData = new FormData();
    
    // Add customer information
    apiFormData.append("name", formData.name);
    apiFormData.append("email", formData.email);
    apiFormData.append("phone", formData.phone);
    apiFormData.append("company", formData.company);
    apiFormData.append("address", formData.address);
    apiFormData.append("planName", planName);
    
    // Add files
    files.forEach((file, index) => {
      apiFormData.append(`file${index}`, file);
    });
    
    // Add target email address
    apiFormData.append("to", "truckmatecmms@gmail.com");
    
    // Use the correct URL for the Edge Function
    const response = await fetch("https://mnigsoflxmqoitfwwkrt.supabase.co/functions/v1/send-payment-proof", {
      method: "POST",
      headers: {
        // Add the Authorization header with the anon key
        "Authorization": `Bearer ${supabase.supabaseKey}`
      },
      body: apiFormData,
    });
    
    if (!response.ok) {
      console.error("Email sending failed:", await response.text());
      return false;
    }
    
    const result = await response.json();
    console.log("Email sending result:", result);
    
    return true;
  } catch (error) {
    console.error("Error in sendEmailWithAttachment:", error);
    return false;
  }
}
