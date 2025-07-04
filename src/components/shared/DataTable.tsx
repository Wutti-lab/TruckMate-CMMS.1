import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LoadingSpinner } from './LoadingSpinner';
import { SkeletonTable } from './SkeletonTable';
import { ErrorBoundary } from './ErrorBoundary';

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T, index: number) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  error?: Error | null;
  emptyMessage?: string;
  onRefresh?: () => void;
  loadingRows?: number;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  isLoading = false,
  error = null,
  emptyMessage = 'No data available',
  onRefresh,
  loadingRows = 5,
  className = ''
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className={className}>
        <SkeletonTable 
          rows={loadingRows} 
          columns={columns.length} 
          showHeader={true} 
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="text-center space-y-2">
          <p className="text-destructive font-medium">Error loading data</p>
          <p className="text-sm text-muted-foreground">{error.message}</p>
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="text-center space-y-2">
          <p className="text-muted-foreground">{emptyMessage}</p>
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Refresh
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className={className}>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={index} className={column.className}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex} className={column.className}>
                    {column.render
                      ? column.render(item, rowIndex)
                      : String(item[column.key] || '')
                    }
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ErrorBoundary>
  );
}