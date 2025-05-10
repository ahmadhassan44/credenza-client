"use client";

import { ReactNode } from "react";
import "@/styles/auth.css"; // Use the global auth CSS

export default function LoginLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen w-full auth-page-container">{children}</div>;
}
