import { useState, useCallback } from 'react';

interface OptimisticState<T> {
  data: T;
  isOptimistic: boolean;
  error: Error | null;
}

interface UseOptimisticOptions<T> {
  onError?: (error: Error, rollbackData: T) => void;
}

export function useOptimistic<T>(
  initialData: T,
  options: UseOptimisticOptions<T> = {}
) {
  const [state, setState] = useState<OptimisticState<T>>({
    data: initialData,
    isOptimistic: false,
    error: null
  });

  const updateOptimistic = useCallback(
    (optimisticData: T, asyncOperation: () => Promise<T>) => {
      const originalData = state.data;
      
      // Apply optimistic update immediately
      setState({
        data: optimisticData,
        isOptimistic: true,
        error: null
      });

      // Execute async operation
      asyncOperation()
        .then((finalData) => {
          setState({
            data: finalData,
            isOptimistic: false,
            error: null
          });
        })
        .catch((error) => {
          // Rollback on error
          setState({
            data: originalData,
            isOptimistic: false,
            error
          });
          
          if (options.onError) {
            options.onError(error, originalData);
          }
        });
    },
    [state.data, options]
  );

  const setValue = useCallback((newData: T) => {
    setState({
      data: newData,
      isOptimistic: false,
      error: null
    });
  }, []);

  return {
    ...state,
    updateOptimistic,
    setValue
  };
}