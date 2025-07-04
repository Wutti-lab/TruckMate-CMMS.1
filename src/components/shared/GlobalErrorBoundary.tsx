import React from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface GlobalErrorBoundaryProps {
  children: React.ReactNode;
}

export function GlobalErrorBoundary({ children }: GlobalErrorBoundaryProps) {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    // Log error to console for development
    console.error('Global Error Boundary:', error, errorInfo);
    
    // Show toast notification
    toast({
      title: t('errorOccurred') || 'An error occurred',
      description: error.message,
      variant: 'destructive',
    });

    // In production, send to error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to error reporting service
      // errorReportingService.captureException(error, { extra: errorInfo });
    }
  };

  const errorFallback = (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4 p-8">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-foreground">
          {t('somethingWentWrong') || 'Something went wrong'}
        </h1>
        <p className="text-muted-foreground max-w-md">
          {t('applicationError') || 'The application encountered an unexpected error. Please refresh the page or try again later.'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          {t('refreshPage') || 'Refresh Page'}
        </button>
      </div>
    </div>
  );

  return (
    <ErrorBoundary
      fallback={errorFallback}
      onError={handleError}
    >
      {children}
    </ErrorBoundary>
  );
}