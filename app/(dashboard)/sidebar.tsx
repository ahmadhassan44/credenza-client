"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

interface SidebarProps {
  active: string;
  setActive: (label: string) => void;
  sidebarItems: { label: string; active?: boolean }[];
  sidebarWidth?: string;
}

export default function DashboardSidebar({
  active,
  setActive,
  sidebarItems,
  sidebarWidth = "15vw",
}: SidebarProps) {
  const router = useRouter();

  // Map tab labels to icon filenames in /public
  const iconMap: Record<string, string> = {
    Profile: "/profileTab.svg",
    Dashboard: "/dashboardTab.svg",
    "Income Streams": "/incomeTab.svg",
    "Credit Score": "/creditScoreTab.svg",
    "Metrics & Analytics": "/metricsTab.svg",
    "Fintech Tools": "/fintechTab.svg",
    Settings: "/settingsTab.svg",
    Logout: "/logoutTab.svg",
  };

  return (
    <aside
      className="fixed top-0 left-0 h-screen bg-[#080808] p-8 flex flex-col justify-between z-30"
      style={{
        width: sidebarWidth,
        minWidth: sidebarWidth,
        maxWidth: sidebarWidth,
      }}
    >
      <div>
        <p className="text-white text-[28px] font-['Space_Grotesk'] font-medium tracking-tighter text-center mb-12">
          Credenza
        </p>
        <div className="flex flex-col gap-2">
          {sidebarItems.slice(0, 6).map((item) => (
            <Button
              key={item.label}
              aria-pressed={active === item.label}
              className={`flex items-center gap-3 px-6 rounded-xl h-12 font-['Space_Grotesk'] text-base ${active === item.label ? "bg-gradient-to-b from-[#9E00F9] to-[#9E00F9] text-white" : "text-white/80 bg-transparent hover:bg-transparent"}`}
              style={{ height: 48 }}
              tabIndex={0}
              variant="flat"
              onClick={() => {
                setActive(item.label);
                if (item.label === "Income Streams") {
                  router.push("/income");
                } else if (item.label === "Profile") {
                  router.push("/profile");
                } else if (item.label === "Dashboard") {
                  router.push("/dashboard");
                } else if (item.label === "Credit Score") {
                  router.push("/credit-score");
                } else if (item.label === "Metrics & Analytics") {
                  router.push("/metrics");
                } else if (item.label === "Fintech Tools") {
                  router.push("/fintech-tools");
                }
              }}
            >
              <img
                alt={`${item.label} icon`}
                className="w-5 h-5"
                src={iconMap[item.label]}
                style={{
                  filter:
                    active === item.label
                      ? "none"
                      : "grayscale(1) opacity(0.7)",
                }}
              />
              <span>{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-8">
        {sidebarItems.slice(6).map((item) => (
          <Button
            key={item.label}
            aria-pressed={active === item.label}
            className="flex items-center gap-3 px-6 rounded-xl h-12 font-['Space_Grotesk'] text-white/80 hover:bg-[#18181b] text-base"
            style={{ height: 48 }}
            tabIndex={0}
            variant="flat"
            onClick={() => setActive(item.label)}
            {...(item.label === "Logout" ? { color: "danger" } : {})}
          >
            <img
              alt={`${item.label} icon`}
              className="w-5 h-5"
              src={iconMap[item.label]}
              style={{
                filter:
                  item.label === "Logout"
                    ? "none"
                    : active === item.label
                      ? "none"
                      : "grayscale(1) opacity(0.7)",
              }}
            />
            <span>{item.label}</span>
          </Button>
        ))}
      </div>
    </aside>
  );
}
