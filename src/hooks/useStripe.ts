
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface StripeCheckoutData {
  packageName: string;
  customAmount?: number;
  currency?: string;
}

export const useStripe = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const createCheckoutSession = async (data: StripeCheckoutData) => {
    setIsLoading(true);
    
    try {
      const { data: result, error } = await supabase.functions.invoke('create-stripe-checkout', {
        body: data
      });

      if (error) {
        throw new Error(error.message);
      }

      if (result?.url) {
        // Redirect to Stripe Checkout
        window.location.href = result.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Stripe checkout error:', error);
      toast({
        variant: "destructive",
        title: "Fehler bei der Zahlungsabwicklung",
        description: error instanceof Error ? error.message : "Ein unbekannter Fehler ist aufgetreten",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createCheckoutSession,
    isLoading
  };
};
