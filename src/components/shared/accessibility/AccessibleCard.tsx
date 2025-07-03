import { ReactNode, forwardRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AccessibleCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
  role?: string;
  tabIndex?: number;
}

export const AccessibleCard = forwardRef<HTMLDivElement, AccessibleCardProps>(
  ({ title, children, className, onClick, ariaLabel, role = "article", tabIndex, ...props }, ref) => {
    const isInteractive = !!onClick;
    
    return (
      <Card
        ref={ref}
        className={cn(
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          isInteractive && 'cursor-pointer hover:shadow-md transition-shadow',
          className
        )}
        onClick={onClick}
        role={role}
        aria-label={ariaLabel || title}
        tabIndex={isInteractive ? (tabIndex ?? 0) : tabIndex}
        onKeyDown={(e) => {
          if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick?.();
          }
        }}
        {...props}
      >
        <CardHeader>
          <CardTitle 
            className="text-lg font-semibold"
            id={`card-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
          >
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent
          aria-labelledby={`card-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
        >
          {children}
        </CardContent>
      </Card>
    );
  }
);

AccessibleCard.displayName = 'AccessibleCard';