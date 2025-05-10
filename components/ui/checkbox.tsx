"use client";

import React from "react";

import { cn } from "@/utils/classnames";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactNode;
  error?: boolean;
  helperText?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, helperText, ...props }, ref) => {
    return (
      <div className="flex items-start space-x-2">
        <input
          ref={ref}
          className={cn(
            "h-4 w-4 rounded border-textSecondary/50 text-primary focus:ring-primary bg-surface",
            error && "border-error focus:ring-error",
            className,
          )}
          type="checkbox"
          {...props}
        />
        <div className="space-y-1">
          {label && (
            <label
              className={cn(
                "text-sm font-medium leading-none text-textPrimary peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                error && "text-error",
              )}
              htmlFor={props.id}
            >
              {label}
            </label>
          )}
          {helperText && (
            <p
              className={`text-sm ${error ? "text-error" : "text-textSecondary"}`}
            >
              {helperText}
            </p>
          )}
        </div>
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
