"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "../sidebar";
import { sidebarItems } from "../income/sidebarItems";
import SkeletonLoader from "../skeleton-loader";
import { usePlatform } from "@/context/platform.context";
import PlatformSelector from "./platform_selector.component";
import { getCreatorId } from "../income/income-streams";
import { PlatformMetric } from "@/services/api/metrics";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num.toString();
  }
};

const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const calculatePercentChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 p-3 border border-gray-700 rounded shadow-lg">
        <p className="font-medium text-gray-300">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: ${entry.value.toFixed(2)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const MetricsContent = () => {
  const { selectedPlatform } = usePlatform();
  const [metrics, setMetrics] = useState<PlatformMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!selectedPlatform) return;

      try {
        setLoading(true);
        // const data = await fetchPlatformMetrics(selectedPlatform.id);
        const data = [
          {
            id: "9664c723-7e03-49a9-a6b4-fca14cb4b3d5",
            creatorId: "d8998530-17e9-48c5-907e-0174ae99a5ca",
            date: "2025-01-17T07:00:08.839Z",
            views: 4097,
            audienceSize: 6864,
            postCount: 6,
            avgViewDurationSec: 584,
            engagementRatePct: 3.7,
            estimatedRevenueUsd: 18.54,
            adRevenueUsd: 14.832,
            otherRevenueUsd: 3.708,
            platformId: "99fd2841-f758-4fd2-8f06-cc52d73eba64",
            createdAt: "2025-05-17T07:00:08.851Z",
            updatedAt: "2025-05-17T07:00:08.851Z",
          },
          {
            id: "20be4853-7fdd-40b9-832d-35eecfc59dcb",
            creatorId: "d8998530-17e9-48c5-907e-0174ae99a5ca",
            date: "2025-02-17T07:00:08.839Z",
            views: 3477,
            audienceSize: 5616,
            postCount: 7,
            avgViewDurationSec: 606,
            engagementRatePct: 4.6,
            estimatedRevenueUsd: 15.71,
            adRevenueUsd: 12.568,
            otherRevenueUsd: 3.142,
            platformId: "99fd2841-f758-4fd2-8f06-cc52d73eba64",
            createdAt: "2025-05-17T07:00:08.863Z",
            updatedAt: "2025-05-17T07:00:08.863Z",
          },
          {
            id: "411c04be-518f-48ce-b88b-b61cf1bc261c",
            creatorId: "d8998530-17e9-48c5-907e-0174ae99a5ca",
            date: "2025-03-17T07:00:08.839Z",
            views: 3450,
            audienceSize: 5928,
            postCount: 6,
            avgViewDurationSec: 570,
            engagementRatePct: 3.7,
            estimatedRevenueUsd: 12.98,
            adRevenueUsd: 10.384,
            otherRevenueUsd: 2.596,
            platformId: "99fd2841-f758-4fd2-8f06-cc52d73eba64",
            createdAt: "2025-05-17T07:00:08.873Z",
            updatedAt: "2025-05-17T07:00:08.873Z",
          },
          {
            id: "28543d47-a9ff-40e4-8f49-263fc210b0cb",
            creatorId: "d8998530-17e9-48c5-907e-0174ae99a5ca",
            date: "2025-04-17T07:00:08.839Z",
            views: 3560,
            audienceSize: 6240,
            postCount: 6,
            avgViewDurationSec: 559,
            engagementRatePct: 3.2,
            estimatedRevenueUsd: 14.37,
            adRevenueUsd: 11.496,
            otherRevenueUsd: 2.874,
            platformId: "99fd2841-f758-4fd2-8f06-cc52d73eba64",
            createdAt: "2025-05-17T07:00:08.881Z",
            updatedAt: "2025-05-17T07:00:08.881Z",
          },
          {
            id: "059471db-95ed-4e57-8771-6221ff487ae4",
            creatorId: "d8998530-17e9-48c5-907e-0174ae99a5ca",
            date: "2025-05-17T07:00:08.839Z",
            views: 3876,
            audienceSize: 5928,
            postCount: 7,
            avgViewDurationSec: 640,
            engagementRatePct: 3.7,
            estimatedRevenueUsd: 16.35,
            adRevenueUsd: 13.08,
            otherRevenueUsd: 3.27,
            platformId: "99fd2841-f758-4fd2-8f06-cc52d73eba64",
            createdAt: "2025-05-17T07:00:08.887Z",
            updatedAt: "2025-05-17T07:00:08.887Z",
          },
        ];
        const sortedData = [...data].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        setMetrics(sortedData);
        setError(null);
      } catch (err) {
        console.error("Error fetching metrics:", err);
        setError("Failed to load metrics data");
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [selectedPlatform]);

  if (!selectedPlatform) {
    return (
      <div className="text-center p-8 text-gray-400">
        <p>Please connect and select a platform to view metrics</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="h-7 bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="h-5 bg-gray-700 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-700 p-4 rounded-md">
                <div className="h-5 bg-gray-600 rounded w-1/2 mb-2"></div>
                <div className="h-7 bg-gray-600 rounded w-1/3 mt-2 mb-2"></div>
                <div className="h-4 bg-gray-600 rounded w-2/5 mt-1"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="h-7 bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-700 rounded-md"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-400">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  if (metrics.length === 0) {
    return (
      <div className="text-center p-8 text-gray-400">
        <p>No metrics data available for this platform yet</p>
      </div>
    );
  }

  const currentMetrics = metrics[metrics.length - 1];
  const previousMetrics =
    metrics.length > 1 ? metrics[metrics.length - 2] : null;

  const viewsChange = previousMetrics
    ? calculatePercentChange(currentMetrics.views, previousMetrics.views)
    : 0;
  const audienceChange = previousMetrics
    ? calculatePercentChange(
        currentMetrics.audienceSize,
        previousMetrics.audienceSize
      )
    : 0;
  const engagementChange = previousMetrics
    ? calculatePercentChange(
        currentMetrics.engagementRatePct,
        previousMetrics.engagementRatePct
      )
    : 0;
  const revenueChange = previousMetrics
    ? calculatePercentChange(
        currentMetrics.estimatedRevenueUsd,
        previousMetrics.estimatedRevenueUsd
      )
    : 0;

  const chartData = metrics.map((metric) => {
    const date = new Date(metric.date);
    return {
      date: `${date.getMonth() + 1}/${date.getFullYear().toString().substr(-2)}`,
      revenue: metric.estimatedRevenueUsd,
      adRevenue: metric.adRevenueUsd,
      otherRevenue: metric.otherRevenueUsd,
      views: metric.views,
      audience: metric.audienceSize,
      engagement: metric.engagementRatePct,
    };
  });

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">
          {selectedPlatform.type} Analytics
        </h2>
        <p className="text-gray-300">Handle: {selectedPlatform.handle}</p>
        <p className="text-gray-400 text-sm mt-1">
          Data last updated:{" "}
          {new Date(currentMetrics.updatedAt).toLocaleDateString()}
        </p>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-gray-700 p-4 rounded-md">
            <h3 className="text-lg font-medium">Audience</h3>
            <div className="text-2xl font-bold mt-2">
              {formatNumber(currentMetrics.audienceSize)}
            </div>
            <div
              className={`text-sm mt-1 ${audienceChange >= 0 ? "text-green-400" : "text-red-400"}`}
            >
              {audienceChange >= 0 ? "+" : ""}
              {audienceChange.toFixed(1)}% this month
            </div>
          </div>
          <div className="bg-gray-700 p-4 rounded-md">
            <h3 className="text-lg font-medium">Engagement Rate</h3>
            <div className="text-2xl font-bold mt-2">
              {currentMetrics.engagementRatePct.toFixed(1)}%
            </div>
            <div
              className={`text-sm mt-1 ${engagementChange >= 0 ? "text-green-400" : "text-red-400"}`}
            >
              {engagementChange >= 0 ? "+" : ""}
              {engagementChange.toFixed(1)}% this month
            </div>
          </div>
          <div className="bg-gray-700 p-4 rounded-md">
            <h3 className="text-lg font-medium">Revenue</h3>
            <div className="text-2xl font-bold mt-2">
              ${currentMetrics.estimatedRevenueUsd.toFixed(2)}
            </div>
            <div
              className={`text-sm mt-1 ${revenueChange >= 0 ? "text-green-400" : "text-red-400"}`}
            >
              {revenueChange >= 0 ? "+" : ""}
              {revenueChange.toFixed(1)}% this month
            </div>
          </div>
          <div className="bg-gray-700 p-4 rounded-md">
            <h3 className="text-lg font-medium">Views</h3>
            <div className="text-2xl font-bold mt-2">
              {formatNumber(currentMetrics.views)}
            </div>
            <div
              className={`text-sm mt-1 ${viewsChange >= 0 ? "text-green-400" : "text-red-400"}`}
            >
              {viewsChange >= 0 ? "+" : ""}
              {viewsChange.toFixed(1)}% this month
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Revenue Trend</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(75, 85, 99, 0.2)"
              />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                name="Total Revenue"
                stroke="#9E00F9"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="adRevenue"
                name="Ad Revenue"
                stroke="#3B82F6"
                strokeWidth={1.5}
              />
              <Line
                type="monotone"
                dataKey="otherRevenue"
                name="Other Revenue"
                stroke="#10B981"
                strokeWidth={1.5}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Content Performance</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Posts this month:</span>
              <span className="font-bold">{currentMetrics.postCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Avg. view duration:</span>
              <span className="font-bold">
                {formatDuration(currentMetrics.avgViewDurationSec)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Views per post:</span>
              <span className="font-bold">
                {formatNumber(
                  currentMetrics.views / (currentMetrics.postCount || 1)
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Revenue Breakdown</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Ad Revenue:</span>
              <span className="font-bold">
                ${currentMetrics.adRevenueUsd.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Other Revenue:</span>
              <span className="font-bold">
                ${currentMetrics.otherRevenueUsd.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-gray-700 pt-2 mt-2">
              <span className="text-gray-300">Total Revenue:</span>
              <span className="font-bold text-lg">
                ${currentMetrics.estimatedRevenueUsd.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Audience & Engagement</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(75, 85, 99, 0.2)"
              />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis yAxisId="left" stroke="#9CA3AF" />
              <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="audience"
                name="Audience Size"
                stroke="#F59E0B"
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="engagement"
                name="Engagement %"
                stroke="#EC4899"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
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

  useEffect(() => {
    const creatorId = getCreatorId();
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
      default:
        break;
    }
    setTimeout(() => setLoading(false), 600);
  };

  return (
    <div className="flex w-full bg-black min-h-screen font-['Space_Grotesk']">
      <DashboardSidebar
        active={active}
        setActive={handleSetActive}
        sidebarItems={sidebarItems}
        sidebarWidth="15vw"
      />
      <div className="flex-1 ml-[15vw]">
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
