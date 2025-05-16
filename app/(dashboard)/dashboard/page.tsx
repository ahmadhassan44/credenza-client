"use client";

import { useEffect, useState } from "react";

import DashboardSidebar from "../sidebar";
import DashboardMain from "./main";
import DashboardSummaryCards from "./DashboardSummaryCards";
import DashboardCharts from "./DashboardCharts";
import DashboardProgressBars from "./DashboardProgressBars";
import { dummyData } from "@/data/dummyData";
import { useAuth } from "@/context/auth.context";
import { fetchAllPlatforms } from "@/services/api/platforms";
import { fetchLatestCreditScore, fetchCreditScoreHistory, fetchYouTubeMetrics } from "@/services/api/metrics";
import { mapFetchedMetricsToDashboard } from "./dashboardUtils";

const sidebarItems = [
  { label: "Profile" },
  { label: "Dashboard", active: true },
  { label: "Income Streams" },
  { label: "Credit Score" },
  { label: "Metrics & Analytics" },
  { label: "Fintech Tools" },
  { label: "Settings" },
  { label: "Logout" },
];

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [active, setActive] = useState("Dashboard");
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [creditScore, setCreditScore] = useState<any>(null);
  const [creditScoreHistory, setCreditScoreHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasPlatforms, setHasPlatforms] = useState<boolean>(false);
  const [platforms, setPlatforms] = useState<any[]>([]);
  const [generatingMetrics, setGeneratingMetrics] = useState(false);

  // Detect guest/test user
  const isGuest = typeof window !== "undefined" && !!localStorage.getItem("guestUser");

  // Get creatorId from user context or localStorage
  const creatorId =
    typeof window !== "undefined"
      ? localStorage.getItem("creatorId") || user?.creatorId || ""
      : "";

  // Fetch connected platforms for real users
  useEffect(() => {
    if (!isAuthenticated || isGuest) {
      setLoading(false);
      setHasPlatforms(false);
      setPlatforms([]);
      return;
    }
    async function fetchPlatforms() {
      setLoading(true);
      try {
        const fetchedPlatforms = await fetchAllPlatforms(creatorId);
        setPlatforms(Array.isArray(fetchedPlatforms) ? fetchedPlatforms : []);
        setHasPlatforms(Array.isArray(fetchedPlatforms) && fetchedPlatforms.length > 0);
      } catch {
        setPlatforms([]);
        setHasPlatforms(false);
      } finally {
        setLoading(false);
      }
    }
    fetchPlatforms();
  }, [isAuthenticated, isGuest, creatorId]);

  // Generate and fetch dashboard metrics for real users with platforms
  useEffect(() => {
    if (!isAuthenticated || isGuest || !hasPlatforms) return;
    const fetched =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("mockMetricsData") || "null")
        : null;
    async function generateAndFetchMetrics() {
      if (!creatorId || !platforms.length) return;
      setGeneratingMetrics(true);
      try {
        // For each platform, fetch metrics (for now, only YOUTUBE is used in dashboard)
        const ytPlatform = platforms.find((p: any) => p.type === "YOUTUBE");
        let metricsData = null;
        if (ytPlatform) {
          const today = new Date();
          const startDate = new Date(today.getFullYear(), today.getMonth() - 6, 1).toISOString();
          const endDate = today.toISOString();
          metricsData = await fetchYouTubeMetrics({
            creatorId,
            platformType: "YOUTUBE",
            startDate,
            endDate,
          });
        }
        if (metricsData) {
          localStorage.setItem("mockMetricsData", JSON.stringify(metricsData));
          setDashboardData(mapFetchedMetricsToDashboard(metricsData));
        }
      } catch {
        setDashboardData(null);
      } finally {
        setGeneratingMetrics(false);
      }
    }
    if (!fetched) {
      generateAndFetchMetrics();
    } else {
      setDashboardData(mapFetchedMetricsToDashboard(fetched));
    }
  }, [isAuthenticated, isGuest, hasPlatforms, creatorId, platforms]);

  // Fetch credit score for real users
  useEffect(() => {
    if (!isAuthenticated || isGuest || !hasPlatforms) return;
    async function fetchCreditScoreData() {
      if (!creatorId) return;
      try {
        const [latest, history] = await Promise.all([
          fetchLatestCreditScore(creatorId),
          fetchCreditScoreHistory(creatorId),
        ]);
        setCreditScore(latest);
        setCreditScoreHistory(history);
        localStorage.setItem("creditScore", JSON.stringify(latest));
        localStorage.setItem("creditScoreHistory", JSON.stringify(history));
      } catch {
        setCreditScore(null);
        setCreditScoreHistory([]);
      }
    }
    fetchCreditScoreData();
  }, [creatorId, isAuthenticated, isGuest, hasPlatforms]);

  // Responsive onboarding UI for new users
  if (loading || isLoading || generatingMetrics) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-black">
        <div className="animate-pulse text-center">
          <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-gray-700" />
          <div className="h-4 w-32 mx-auto rounded bg-gray-700" />
        </div>
      </div>
    );
  }

  // 1. Guest user: show dummyData
  if (isGuest) {
    const ytIncome = dummyData.incomeSources.find((i) => i.platform === "YOUTUBE") || { monthlyIncome: 0 };
    const ytMetrics = dummyData.platformMetrics.find((m) => m.platform === "YOUTUBE") || { views: 0 };
    return (
      <div className="w-full bg-black">
        <DashboardSidebar
          active={active}
          setActive={setActive}
          sidebarItems={sidebarItems}
        />
        <DashboardMain>
          <div className="flex flex-col gap-7 h-full min-h-[calc(100vh-63px-60px)] justify-between">
            <div className="flex flex-col gap-[33px] w-full">
              <p className="text-white text-5xl font-['Space_Grotesk'] font-medium leading-6">
                Dashboard
              </p>
              <p className="text-white text-2xl font-['Space_Grotesk'] font-medium leading-6">
                Overview of your creator metrics and income performance from
                YouTube
              </p>
            </div>
            <DashboardSummaryCards
              creditScore={dummyData.creditScore.overallScore}
              subscribersGained={2400}
              ytIncome={ytIncome.monthlyIncome}
              ytViews={ytMetrics.views}
            />
            <DashboardCharts
              barChartData={dummyData.youtubeMonthlyStats.slice(-6)}
              creditScoreTrend={dummyData.creditScore.trendData}
            />
            <DashboardProgressBars
              consistency={dummyData.creditScore?.scoreFactors?.consistency ?? 0}
              engagement={dummyData.creditScore?.scoreFactors?.engagement ?? 0}
            />
          </div>
        </DashboardMain>
      </div>
    );
  }

  // 2. Logged-in user, no platforms: show CTA to connect platforms
  if (isAuthenticated && !isGuest && !hasPlatforms) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-black">
        <div className="text-center">
          <p className="text-white text-2xl mb-4">Connect a platform to get started!</p>
          <a
            href="/dashboard/income"
            className="inline-block px-6 py-3 bg-[#9E00F9] text-white rounded-lg font-bold hover:bg-[#7a00c2] transition"
          >
            Connect Platform
          </a>
        </div>
      </div>
    );
  }

  // 3. User with platforms but no metrics: show CTA to generate metrics (with sidebar)
  if (isAuthenticated && !isGuest && hasPlatforms && !dashboardData) {
    return (
      <div className="w-full bg-black">
        <DashboardSidebar
          active={active}
          setActive={setActive}
          sidebarItems={sidebarItems}
        />
        <DashboardMain>
          <div className="flex flex-col gap-7 h-full min-h-[calc(100vh-63px-60px)] justify-center items-center">
            <p className="text-white text-2xl mb-4">No metrics found for your account.</p>
            <button
              className="inline-block px-6 py-3 bg-[#9E00F9] text-white rounded-lg font-bold hover:bg-[#7a00c2] transition"
              onClick={async () => {
                // Generate metrics for the user and save to localStorage
                if (!creatorId || !platforms.length) return;
                const ytPlatform = platforms.find((p: any) => p.type === "YOUTUBE");
                if (ytPlatform) {
                  const today = new Date();
                  const startDate = new Date(today.getFullYear(), today.getMonth() - 6, 1).toISOString();
                  const endDate = today.toISOString();
                  try {
                    const metricsData = await fetchYouTubeMetrics({
                      creatorId,
                      platformType: "YOUTUBE",
                      startDate,
                      endDate,
                    });
                    if (metricsData) {
                      localStorage.setItem("mockMetricsData", JSON.stringify(metricsData));
                      setDashboardData(mapFetchedMetricsToDashboard(metricsData));
                    }
                  } catch {
                    // Optionally show error
                  }
                }
              }}
            >
              Generate metrics for user
            </button>
          </div>
        </DashboardMain>
      </div>
    );
  }

  // 4. User with platforms and metrics
  const isFetched = !!dashboardData;
  const creditScoreData =
    creditScore ||
    (isFetched ? dashboardData.creditScore : dummyData.creditScore);

  const creditScoreTrend = creditScoreHistory.length > 0
    ? creditScoreHistory.map((item: any) => ({
        date: item.timestamp
          ? new Date(item.timestamp).toLocaleString("default", {
              month: "short",
              year: "numeric",
            })
          : item.date,
        score: item.overallScore ?? 0,
      }))
    : isFetched
      ? dashboardData.creditScore.trendData
      : dummyData.creditScore.trendData;

  const ytIncome = isFetched
    ? dashboardData.ytIncome
    : dummyData.incomeSources.find((i) => i.platform === "YOUTUBE") || { monthlyIncome: 0 };
  const ytMetrics = isFetched
    ? dashboardData.ytMetrics
    : dummyData.platformMetrics.find((m) => m.platform === "YOUTUBE") || { views: 0 };
  const subscribersGained = isFetched ? dashboardData.subscribersGained : 2400;
  const barChartData = isFetched
    ? dashboardData.barChartData
    : dummyData.youtubeMonthlyStats.slice(-6);

  return (
    <div className="w-full bg-black">
      <DashboardSidebar
        active={active}
        setActive={setActive}
        sidebarItems={sidebarItems}
      />
      <DashboardMain>
        <div className="flex flex-col gap-7 h-full min-h-[calc(100vh-63px-60px)] justify-between">
          <div className="flex flex-col gap-[33px] w-full">
            <p className="text-white text-5xl font-['Space_Grotesk'] font-medium leading-6">
              Dashboard
            </p>
            <p className="text-white text-2xl font-['Space_Grotesk'] font-medium leading-6">
              Overview of your creator metrics and income performance from
              YouTube
            </p>
          </div>
          <DashboardSummaryCards
            creditScore={creditScoreData.overallScore}
            subscribersGained={subscribersGained}
            ytIncome={ytIncome.monthlyIncome}
            ytViews={ytMetrics.views}
          />
          <DashboardCharts
            barChartData={barChartData}
            creditScoreTrend={creditScoreTrend}
          />
          <DashboardProgressBars
            consistency={creditScoreData?.scoreFactors?.consistency ?? 0}
            engagement={creditScoreData?.scoreFactors?.engagement ?? 0}
          />
        </div>
      </DashboardMain>
    </div>
  );
}
