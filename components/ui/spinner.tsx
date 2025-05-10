'use client';

import React from 'react';
import { cn } from '@/utils/classnames';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
}

export function Spinner({ 
  size = 'md', 
  color = 'primary', 
  className 
}: SpinnerProps) {
  const sizeClass = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-10 w-10',
  }[size];

  const colorClass = {
    primary: 'text-primary',
    white: 'text-white',
    grey: 'text-textSecondary',
  }[color] || 'text-primary';

  return (
    <div className={cn('animate-spin', sizeClass, colorClass, className)} role="status">
      <svg
        className="h-full w-full"
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          fill="currentColor"
        />
      </svg>
      <span className="sr-only">Loading</span>
    </div>
  );
}
