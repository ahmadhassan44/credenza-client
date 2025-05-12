"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

import { connectPlatform } from "@/services/api/platforms";
import { fetchYouTubeMetrics } from "@/services/api/metrics";
import DashboardSidebar from "../dashboard/sidebar";

// Get the user's id from localStorage user object (set after login/signup)
const getCreatorId = () => localStorage.getItem("creatorId") || "";

export const sidebarItems = [
  { label: "Profile" },
  { label: "Dashboard" },
  { label: "Income Streams", active: true },
  { label: "Credit Score" },
  { label: "Metrics & Analytics" },
  { label: "Fintech Tools" },
  { label: "Settings" },
  { label: "Logout" },
];

export default function IncomeStreamsPage() {
  const [handle, setHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [active, setActive] = useState("Income Streams");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    const creatorId = getCreatorId();
    try {
      await connectPlatform({
        creatorId,
        type: "YOUTUBE",
        handle,
      });
      setSuccess("YouTube channel linked successfully!");
      setHandle("");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Add a function to fetch and log metrics
  const handleFetchMetrics = async () => {
    const creatorId = getCreatorId();
    if (!creatorId) {
      console.error("No creatorId found in localStorage");
      return;
    }
    try {
      const metrics = await fetchYouTubeMetrics({
        creatorId,
        platformType: "YOUTUBE",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
      });
      console.log("Fetched metrics:", metrics);
    } catch (err) {
      console.error("Error fetching metrics:", err);
    }
  };

  // Handle sidebar navigation
  const handleSetActive = (label: string) => {
    setActive(label);
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
        // Implement logout logic if needed
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex w-full bg-black min-h-screen">
      <DashboardSidebar active={active} setActive={handleSetActive} sidebarItems={sidebarItems} />
      <div className="flex-1">
        <div className="max-w-md mx-auto mt-16 p-8 bg-[#18181b] rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-white">
            Link Your YouTube Channel
          </h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="text-white/80 font-medium">
              YouTube Channel Name
              <input
                className="mt-2 p-2 rounded bg-[#232326] text-white w-full"
                onChange={(e) => setHandle(e.target.value)}
                placeholder="Enter your channel name"
                required
                type="text"
                value={handle}
              />
            </label>
            <Button className="mt-4" disabled={loading || !handle} type="submit">
              {loading ? "Linking..." : "Link YouTube"}
            </Button>
            {success && <div className="text-green-500 mt-2">{success}</div>}
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </form>
          <Button className="mt-4" onClick={handleFetchMetrics} type="button">
            Log Metrics to Console
          </Button>
        </div>
      </div>
    </div>
  );
}
