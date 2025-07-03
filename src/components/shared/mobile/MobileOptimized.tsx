import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MobileOptimizedProps {
  children: ReactNode;
  className?: string;
  enableSwipe?: boolean;
}

export function MobileOptimized({ 
  children, 
  className,
  enableSwipe = false 
}: MobileOptimizedProps) {
  const baseClasses = cn(
    // Mobile-first responsive design
    'w-full',
    // Touch-friendly spacing
    'touch-manipulation',
    // Improved scrolling on mobile
    'overflow-x-hidden overflow-y-auto',
    // Better tap targets
    '[&_button]:min-h-[44px] [&_a]:min-h-[44px]',
    // Improved text readability
    '[&_p]:leading-relaxed [&_span]:leading-relaxed',
    // Better form inputs on mobile
    '[&_input]:text-[16px] [&_select]:text-[16px] [&_textarea]:text-[16px]',
    className
  );

  const swipeClasses = enableSwipe ? cn(
    'touch-pan-x',
    // Add swipe gesture support
    '[&>*]:transition-transform [&>*]:duration-300'
  ) : '';

  return (
    <div 
      className={cn(baseClasses, swipeClasses)}
      // Optimize for mobile performance
      style={{
        WebkitOverflowScrolling: 'touch',
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      {children}
    </div>
  );
}