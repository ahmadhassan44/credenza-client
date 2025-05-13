"use client";

import { ReactNode } from "react";

import { CustomNavbar } from "@/components/ui/customNavbar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex flex-col h-screen w-screen">
      <main className="flex-grow w-full">{children}</main>
      <footer className="w-full flex items-center justify-center py-3">
        <span className="text-default-600">
          © 2025 Credenza. All rights reserved.
        </span>
      </footer>
    </div>
  );
}
