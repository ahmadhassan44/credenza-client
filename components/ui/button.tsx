import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, className = "", ...props }) => (
  <button
    className={`px-4 py-2 rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    {...props}
  >
    {children}
  </button>
);
