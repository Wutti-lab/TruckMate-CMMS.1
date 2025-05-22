
import { PendingUser } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export async function sendNotification(user: PendingUser, type: 'approval' | 'rejection') {
  try {
    const { data, error } = await supabase.functions.invoke('send-notification', {
      body: {
        type: type,
        userData: {
          name: user.name,
          email: user.email,
          company: user.company,
          phoneNumber: user.phoneNumber,
          jobTitle: user.jobTitle,
          registrationDate: user.createdAt
        }
      }
    });

    if (error) {
      console.error(`Fehler beim Senden der ${type}-Benachrichtigung:`, error);
      return false;
    } else {
      console.log(`${type}-Benachrichtigung erfolgreich gesendet:`, data);
      return true;
    }
  } catch (err) {
    console.error("Fehler beim Aufrufen der Edge Function:", err);
    return false;
  }
}
