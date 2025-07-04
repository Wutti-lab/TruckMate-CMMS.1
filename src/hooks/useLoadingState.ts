import { useState, useCallback } from 'react';

interface UseLoadingStateOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useLoadingState(options: UseLoadingStateOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const executeAsync = useCallback(
    async <T>(asyncOperation: () => Promise<T>): Promise<T | undefined> => {
      try {
        setIsLoading(true);
        setError(null);
        
        const result = await asyncOperation();
        
        if (options.onSuccess) {
          options.onSuccess();
        }
        
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        
        if (options.onError) {
          options.onError(error);
        }
        
        return undefined;
      } finally {
        setIsLoading(false);
      }
    },
    [options]
  );

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    executeAsync,
    reset
  };
}