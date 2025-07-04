import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TouchOptimizedProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function TouchOptimized({ 
  children, 
  className,
  size = 'md'
}: TouchOptimizedProps) {
  const sizeClasses = {
    sm: 'min-h-[40px] min-w-[40px]',
    md: 'min-h-[44px] min-w-[44px]', 
    lg: 'min-h-[48px] min-w-[48px]'
  };

  return (
    <div 
      className={cn(
        'touch-manipulation',
        sizeClasses[size],
        // Better tap targets
        'relative',
        // Improved feedback
        'transition-transform duration-150 active:scale-95',
        // Remove tap highlight
        'tap-highlight-transparent',
        className
      )}
      style={{
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      {children}
    </div>
  );
}