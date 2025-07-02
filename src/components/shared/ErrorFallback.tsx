
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
  title?: string;
  description?: string;
}

export function ErrorFallback({ 
  error, 
  resetError, 
  title,
  description 
}: ErrorFallbackProps) {
  const { tWithFallback } = useTranslation();

  return (
    <div className="flex items-center justify-center min-h-[200px] p-4">
      <Alert variant="destructive" className="max-w-md">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>
          {title || tWithFallback('Something went wrong | เกิดข้อผิดพลาด | Etwas ist schiefgelaufen')}
        </AlertTitle>
        <AlertDescription className="mt-2">
          {description || tWithFallback(
            'An unexpected error occurred. Please try again. | เกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองอีกครั้ง | Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'
          )}
        </AlertDescription>
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-2 p-2 bg-gray-100 rounded text-xs font-mono">
            {error.message}
          </div>
        )}
        <Button 
          variant="outline" 
          size="sm" 
          onClick={resetError}
          className="mt-3"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          {tWithFallback('Try again | ลองอีกครั้ง | Nochmal versuchen')}
        </Button>
      </Alert>
    </div>
  );
}
