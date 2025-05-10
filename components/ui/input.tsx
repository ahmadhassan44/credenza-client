"use client";

import React from "react";

import { cn } from "@/utils/classnames";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, helperText, type, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <input
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-md border border-textSecondary/30 bg-surface px-3 py-2 text-sm text-textPrimary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-textSecondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-error focus-visible:ring-error",
            className,
          )}
          type={type}
          {...props}
        />
        {helperText && (
          <p
            className={`text-sm ${error ? "text-error" : "text-textSecondary"}`}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
