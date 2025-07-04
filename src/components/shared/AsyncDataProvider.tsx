import React, { createContext, useContext } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { LoadingSpinner } from './LoadingSpinner';
import { useAsyncData } from '@/hooks/useAsyncData';

interface AsyncDataProviderProps<T> {
  children: React.ReactNode;
  fetchData: () => Promise<T>;
  dependencies?: any[];
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  onError?: (error: Error) => void;
}

interface AsyncDataContextValue<T> {
  data: T | undefined;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

const AsyncDataContext = createContext<AsyncDataContextValue<any> | null>(null);

export function AsyncDataProvider<T>({
  children,
  fetchData,
  dependencies = [],
  loadingComponent,
  errorComponent,
  onError
}: AsyncDataProviderProps<T>) {
  const { data, loading, error, refetch } = useAsyncData(fetchData, {
    dependencies,
    onError
  });

  const contextValue = {
    data,
    loading,
    error,
    refetch
  };

  if (loading) {
    return (
      loadingComponent || (
        <div className="flex items-center justify-center p-8">
          <LoadingSpinner size="lg" />
        </div>
      )
    );
  }

  if (error) {
    return (
      errorComponent || (
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-destructive">
              Something went wrong
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              {error.message}
            </p>
            <button
              onClick={refetch}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )
    );
  }

  return (
    <ErrorBoundary>
      <AsyncDataContext.Provider value={contextValue}>
        {children}
      </AsyncDataContext.Provider>
    </ErrorBoundary>
  );
}

export function useAsyncDataContext<T>(): AsyncDataContextValue<T> {
  const context = useContext(AsyncDataContext);
  if (!context) {
    throw new Error('useAsyncDataContext must be used within AsyncDataProvider');
  }
  return context;
}