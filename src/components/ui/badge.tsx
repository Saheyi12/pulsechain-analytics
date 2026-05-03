import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'purple';
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants: Record<string, string> = {
      default: 'bg-gray-700 text-gray-300',
      primary: 'bg-blue-600/20 text-blue-400',
      success: 'bg-green-600/20 text-green-400',
      danger: 'bg-red-600/20 text-red-400',
      warning: 'bg-yellow-600/20 text-yellow-400',
      purple: 'bg-purple-600/20 text-purple-400',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
          variants[variant] || variants.default,
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';
export { Badge };