"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ToastContextType {
  showToast: (
    message: string,
    type: "success" | "error" | "warning" | "info",
  ) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
}

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (
    message: string,
    type: "success" | "error" | "warning" | "info",
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = { id, message, type };

    setToasts((prevToasts) => [...prevToasts, newToast]);

    // Auto remove toast after 3 seconds
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="toast-container fixed bottom-0 right-0 p-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`rounded-md p-4 shadow-md transition-all ${
              toast.type === "success"
                ? "bg-green-600"
                : toast.type === "error"
                  ? "bg-red-600"
                  : toast.type === "warning"
                    ? "bg-yellow-600"
                    : "bg-blue-600"
            } text-white`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};
