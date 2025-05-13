"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "../sidebar";
import { sidebarItems } from "../income/income-streams";
import SkeletonLoader from "../skeleton-loader";

export default function SettingsPage() {
  const [active, setActive] = useState("Settings");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSetActive = (label: string) => {
    setActive(label);
    setLoading(true);
    switch (label) {
      case "Profile":
        router.push("/profile");
        break;
      case "Dashboard":
        router.push("/dashboard");
        break;
      case "Income Streams":
        router.push("/income");
        break;
      case "Credit Score":
        router.push("/credit-score");
        break;
      case "Metrics & Analytics":
        router.push("/metrics");
        break;
      case "Fintech Tools":
        router.push("/fintech-tools");
        break;
      case "Settings":
        router.push("/settings");
        break;
      case "Logout":
        break;
      default:
        break;
    }
    setTimeout(() => setLoading(false), 600);
  };

  return (
    <div className="flex w-full bg-black min-h-screen">
      <DashboardSidebar active={active} setActive={handleSetActive} sidebarItems={sidebarItems} />
      <div className="flex-1">
        {loading ? <SkeletonLoader /> : <div className="p-8 text-white">Settings Page (dummy content)</div>}
      </div>
    </div>
  );
}
