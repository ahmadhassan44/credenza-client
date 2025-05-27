"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/auth.context";
import { CircularProgress } from "@heroui/react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/home", // Landing page
  "/about",
  "/contact",
  // Add any other public routes here
];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip this check on public routes
    if (publicRoutes.includes(pathname)) {
      return;
    }

    // Check if user is authenticated
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    // If no tokens or user is not authenticated, redirect to login
    if (!isLoading && (!accessToken || !refreshToken || !user)) {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
    }
  }, [user, isLoading, router, pathname]);

  // Only render children when authenticated or on public routes
  if (publicRoutes.includes(pathname) || (user && !isLoading)) {
    return <>{children}</>;
  }

  // Loading state or redirecting
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div style={{ width: 80, height: 80 }}>
        <CircularProgressbar
          value={75}
          strokeWidth={12}
          styles={buildStyles({
            textSize: "22px",
            textColor: "white",
            pathColor: "#9E00F9", // Purple color matching your brand
            trailColor: "#27272A",
            strokeLinecap: "round",
          })}
        />
      </div>
    </div>
  );
}
