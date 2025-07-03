import { useState, useCallback } from 'react';

export function useErrorBoundary() {
  const [error, setError] = useState<Error | null>(null);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  const captureError = useCallback((error: Error) => {
    console.error('Error caught by boundary:', error);
    setError(error);
  }, []);

  return { error, resetError, captureError };
}