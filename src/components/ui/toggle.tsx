'use client';

import { cn } from '@/lib/utils';

interface ToggleProps {
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
}

export function Toggle({ pressed, onPressedChange, disabled, className, size = 'default' }: ToggleProps) {
  const sizes = {
    sm: 'w-8 h-4',
    default: 'w-12 h-6',
    lg: 'w-16 h-8',
  };

  const knobSizes = {
    sm: 'w-3 h-3',
    default: 'w-5 h-5',
    lg: 'w-7 h-7',
  };

  const translateX = {
    sm: pressed ? 'translate-x-4' : 'translate-x-0.5',
    default: pressed ? 'translate-x-6' : 'translate-x-0.5',
    lg: pressed ? 'translate-x-8' : 'translate-x-0.5',
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={pressed}
      disabled={disabled}
      onClick={() => onPressedChange(!pressed)}
      className={cn(
        'relative inline-flex items-center rounded-full transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900',
        pressed ? 'bg-blue-600' : 'bg-gray-700',
        disabled && 'opacity-50 cursor-not-allowed',
        sizes[size],
        className
      )}
    >
      <span
        className={cn(
          'rounded-full bg-white shadow-sm transition-transform',
          knobSizes[size],
          translateX[size]
        )}
      />
    </button>
  );
}