'use client';

import React from 'react';

interface TextProps {
  children: React.ReactNode;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  mb?: number;
  className?: string;
}

export function Text({ 
  children, 
  color = 'textPrimary', 
  fontSize = 'md', 
  fontWeight = 'normal',
  mb = 0,
  className = '',
  ...props 
}: TextProps & React.HTMLAttributes<HTMLParagraphElement>) {
  // Map prop values to tailwind classes
  const colorMap: Record<string, string> = {
    textPrimary: 'text-textPrimary',
    textSecondary: 'text-textSecondary',
    'primary.500': 'text-primary',
  };

  const fontSizeMap: Record<string, string> = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl', 
    '5xl': 'text-5xl',
  };

  const fontWeightMap: Record<string, string> = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const marginMap: Record<number, string> = {
    0: 'm-0',
    1: 'mb-1',
    2: 'mb-2',
    3: 'mb-3',
    4: 'mb-4',
    5: 'mb-5',
    6: 'mb-6',
  };

  const colorClass = colorMap[color] || color;
  const fontSizeClass = fontSizeMap[fontSize] || fontSize;
  const fontWeightClass = fontWeightMap[fontWeight] || fontWeight;
  const marginClass = marginMap[mb] || '';

  const classes = `${colorClass} ${fontSizeClass} ${fontWeightClass} ${marginClass} ${className}`;

  return (
    <p className={classes} {...props}>
      {children}
    </p>
  );
}
