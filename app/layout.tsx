import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { AuthProvider } from "@/context/auth.context";
import { ToastProvider } from "@/components/ui/toast";
import { fontSans, fontSpaceGrotesk } from "@/config/fonts";
import AuthGuard from "@/guards/auth.guard";

export const metadata: Metadata = {
  title: "Credenza | Credit Scoring for Digital Creators",
  description:
    "Evaluate creditworthiness for digital creators by analyzing platform metrics, income stability, and growth patterns",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontSpaceGrotesk.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <AuthProvider>
            <AuthGuard>
              <ToastProvider>{children}</ToastProvider>
            </AuthGuard>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
