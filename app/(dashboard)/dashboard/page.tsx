"use client";

import { useEffect, useState } from "react";

import { dummyData } from "@/data/dummyData";
import DashboardSidebar from "@/app/(dashboard)/sidebar";
import DashboardMain from "@/app/(dashboard)/dashboard/main";
import {
  fetchLatestCreditScore,
  fetchCreditScoreHistory,
} from "@/services/api/metrics";
import { useAuth } from "@/context/auth.context";
import { fetchAllPlatforms } from "@/services/api/platforms";

import DashboardSummaryCards from "./DashboardSummaryCards";
import DashboardCharts from "./DashboardCharts";
import DashboardProgressBars from "./DashboardProgressBars";
import OnboardingSection from "./OnboardingSection";
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
  const [showOnboarding, setShowOnboarding] = useState(false);

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
      return;
    }
    async function fetchPlatforms() {
      setLoading(true);
      try {
        const platforms = await fetchAllPlatforms(creatorId);

        setShowOnboarding(!Array.isArray(platforms) || platforms.length === 0);
      } catch {
        setShowOnboarding(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPlatforms();
  }, [isAuthenticated, isGuest, creatorId]);

  // Fetch dashboard metrics for real users with platforms
  useEffect(() => {
    if (!isAuthenticated || isGuest || showOnboarding) return;
    const fetched =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("mockMetricsData") || "null")
        : null;

    if (fetched) {
      setDashboardData(mapFetchedMetricsToDashboard(fetched));
    } else {
      setDashboardData(null);
    }
  }, [isAuthenticated, isGuest, showOnboarding]);

  // Fetch credit score for real users
  useEffect(() => {
    if (!isAuthenticated || isGuest || showOnboarding) return;
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
  }, [creatorId, isAuthenticated, isGuest, showOnboarding]);

  // Responsive onboarding UI for new users
  if (loading || isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-black">
        <div className="animate-pulse text-center">
          <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-gray-700" />
          <div className="h-4 w-32 mx-auto rounded bg-gray-700" />
        </div>
      </div>
    );
  }

  if (showOnboarding) {
    // Onboarding for new users with no platforms
    return <OnboardingSection active={active} setActive={setActive} />;
  }

  // Real user with data
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
    : dummyData.incomeSources.find((i) => i.platform === "YOUTUBE");
  const ytMetrics = isFetched
    ? dashboardData.ytMetrics
    : dummyData.platformMetrics.find((m) => m.platform === "YOUTUBE");
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
