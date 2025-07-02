
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface SkeletonCardProps {
  showHeader?: boolean;
  lines?: number;
  className?: string;
}

export function SkeletonCard({ 
  showHeader = true, 
  lines = 3, 
  className = '' 
}: SkeletonCardProps) {
  return (
    <Card className={className}>
      {showHeader && (
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
      )}
      <CardContent className="space-y-3">
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton 
            key={index} 
            className={`h-4 ${
              index === lines - 1 ? 'w-2/3' : 'w-full'
            }`} 
          />
        ))}
      </CardContent>
    </Card>
  );
}
