"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "../sidebar";
import { sidebarItems } from "../income/sidebarItems";
import SkeletonLoader from "../skeleton-loader";
import { usePlatform } from "@/context/platform.context";
import PlatformSelector from "./platform_selector.component";

// Placeholder component for metrics content
const MetricsContent = () => {
  const { selectedPlatform } = usePlatform();

  if (!selectedPlatform) {
    return (
      <div className="text-center p-8 text-gray-400">
        <p>Please connect and select a platform to view metrics</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">
          {selectedPlatform.type} Analytics
        </h2>
        <p className="text-gray-300">Handle: {selectedPlatform.handle}</p>

        {/* Placeholder for actual metrics data */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-gray-700 p-4 rounded-md">
            <h3 className="text-lg font-medium">Followers</h3>
            <div className="text-2xl font-bold mt-2">12,458</div>
            <div className="text-green-400 text-sm mt-1">+2.4% this week</div>
          </div>
          <div className="bg-gray-700 p-4 rounded-md">
            <h3 className="text-lg font-medium">Engagement Rate</h3>
            <div className="text-2xl font-bold mt-2">3.8%</div>
            <div className="text-red-400 text-sm mt-1">-0.5% this week</div>
          </div>
          <div className="bg-gray-700 p-4 rounded-md">
            <h3 className="text-lg font-medium">Total Revenue</h3>
            <div className="text-2xl font-bold mt-2">$1,247.35</div>
            <div className="text-green-400 text-sm mt-1">+12.3% this month</div>
          </div>
          <div className="bg-gray-700 p-4 rounded-md">
            <h3 className="text-lg font-medium">Posts</h3>
            <div className="text-2xl font-bold mt-2">87</div>
            <div className="text-gray-400 text-sm mt-1">
              Last post: 2 days ago
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Growth Trend</h2>
        <div className="h-64 bg-gray-700 rounded-md flex items-center justify-center">
          <p className="text-gray-400">Chart visualization would go here</p>
        </div>
      </div>
    </div>
  );
};

export default function MetricsPage() {
  const [active, setActive] = useState("Metrics & Analytics");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { refreshPlatforms } = usePlatform();

  // Get creator ID from localStorage
  const creatorId =
    typeof window !== "undefined" ? localStorage.getItem("userId") || "" : "";

  useEffect(() => {
    // Refresh platforms when the metrics page loads
    if (creatorId) {
      refreshPlatforms(creatorId);
    }
  }, []);

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
      <DashboardSidebar
        active={active}
        setActive={handleSetActive}
        sidebarItems={sidebarItems}
      />
      <div className="flex-1">
        {loading ? (
          <SkeletonLoader />
        ) : (
          <div className="p-8 text-white">
            <div className="flex flex-col space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Metrics & Analytics</h1>
                <PlatformSelector className="w-64" />
              </div>

              <MetricsContent />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
