"use client";

import { useEffect, useState } from "react";

import { Card } from "@heroui/react";

import CreditScoreLineChart from "./creditScoreLineChart";
import YouTubeBarChart from "./youtubeBarChart";
import ScoreProgress from "./ScoreProgress";

import { dummyData } from "@/data/dummyData";
import DashboardSidebar from "@/app/(dashboard)/sidebar";
import DashboardMain from "@/app/(dashboard)/dashboard/main";
import {
  fetchLatestCreditScore,
  fetchCreditScoreHistory,
} from "@/services/api/metrics";

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

type Metric = {
  date: string;
  views?: number;
  audienceSize?: number;
  postCount?: number;
  estimatedRevenueUsd?: number;
  cpm?: number;
};

const getFetchedMetrics = (): Metric[] | null => {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("mockMetricsData");
  if (!data) return null;

  try {
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) return parsed;
    if (parsed.metrics && Array.isArray(parsed.metrics)) return parsed.metrics;
    return [parsed];
  } catch {
    return null;
  }
};

function mapFetchedMetricsToDashboard(metricsArr: Metric[]): any {
  if (!Array.isArray(metricsArr) || metricsArr.length === 0) return null;
  const sorted = [...metricsArr].sort((a, b) => {
    const da = new Date(a.date).getTime();
    const db = new Date(b.date).getTime();
    return da - db;
  });

  // Calculate monthly view deltas
  const monthlyViewDeltas = sorted.map((m, i, arr) => {
    if (i === 0) return m.views || 0;
    return (m.views || 0) - (arr[i - 1].views || 0);
  });

  // Bar chart data: use monthly deltas
  const barChartData = sorted.map((m, i) => {
    let cpm = 0;
    const viewsDelta = monthlyViewDeltas[i];
    if (m.estimatedRevenueUsd && viewsDelta > 0) {
      cpm = m.estimatedRevenueUsd / (viewsDelta / 1000);
    }
    // Use full month and year for clarity and uniqueness
    const dateObj = new Date(m.date);
    const monthLabel = dateObj.toLocaleString("default", { month: "short" }) +
      " " + dateObj.getFullYear();
    return {
      month: monthLabel,
      views: viewsDelta,
      cpm: cpm || 0,
    };
  });

  // Total YouTube views (sum of monthly deltas)
  const totalViews = monthlyViewDeltas.reduce((sum, v) => sum + v, 0);

  // Subscribers gained: difference between first and last audienceSize
  const subscribersGained =
    (sorted[sorted.length - 1].audienceSize || 0) -
    (sorted[0].audienceSize || 0);

  const creditScore = {
    overallScore: 80,
    scoreFactors: {
      consistency: 75,
      engagement: 70,
    },
    trendData: sorted.map((m) => ({
      date: new Date(m.date).toLocaleString("default", { month: "short" }),
      score: 70 + Math.round((m.views || 0) / 1000),
    })),
  };
  const latest = sorted[sorted.length - 1];
  const ytIncome = {
    monthlyIncome: latest.estimatedRevenueUsd || 0,
  };
  const ytMetrics = {
    views: totalViews,
    audienceSize: latest.audienceSize || 0,
    postCount: latest.postCount || 0,
  };
  const topVideo = null;
  return {
    creditScore,
    ytIncome,
    ytMetrics,
    subscribersGained,
    barChartData,
    topVideo,
    totalViews,
  };
}

export default function DashboardPage() {
  const [active, setActive] = useState("Dashboard");
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [creditScore, setCreditScore] = useState<any>(null);
  const [creditScoreHistory, setCreditScoreHistory] = useState<any[]>([]);

  // Replace with actual creatorId from auth/user context if available
  const creatorId =
    typeof window !== "undefined"
      ? localStorage.getItem("creatorId") ||
        "e0583f69-0220-4ccd-8cac-154b1f4b0b85"
      : "";

  useEffect(() => {
    async function fetchCreditScoreData() {
      if (!creatorId) return;
      try {
        const [latest, history] = await Promise.all([
          fetchLatestCreditScore(creatorId),
          fetchCreditScoreHistory(creatorId),
        ]);
        setCreditScore(latest);
        setCreditScoreHistory(history);
        // Store in localStorage for persistence (optional)
        localStorage.setItem("creditScore", JSON.stringify(latest));
        localStorage.setItem("creditScoreHistory", JSON.stringify(history));
      } catch (err) {
        // fallback to dummyData if needed
        setCreditScore(dummyData.creditScore);
        setCreditScoreHistory(dummyData.creditScore.trendData);
      }
    }
    fetchCreditScoreData();
  }, [creatorId]);

  useEffect(() => {
    const updateData = () => {
      const fetched = getFetchedMetrics();
      if (fetched) {
        setDashboardData(mapFetchedMetricsToDashboard(fetched));
      } else {
        setDashboardData(null);
      }
    };
    updateData();
    window.addEventListener("storage", updateData);
    return () => window.removeEventListener("storage", updateData);
  }, []);

  useEffect(() => {
    const fetched = getFetchedMetrics();
    if (fetched) {
      setDashboardData(mapFetchedMetricsToDashboard(fetched));
    } else {
      setDashboardData(null);
    }
  }, []);

  const isFetched = !!dashboardData;
  // Use fetched credit score and history if available
  const creditScoreData =
    creditScore ||
    (isFetched ? dashboardData.creditScore : dummyData.creditScore);

  // Map creditScoreHistory to chart data for CreditScoreLineChart
  const creditScoreTrend = creditScoreHistory.length > 0
    ? creditScoreHistory.map((item: any) => ({
        date: item.timestamp
          ? new Date(item.timestamp).toLocaleString("default", { month: "short", year: "numeric" })
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
  const topVideo = isFetched
    ? dashboardData.topVideo
    : {
        title: "How to Grow on YouTube in 2025",
        thumbnailUrl: "/credenzaLogo.svg",
        views: 120000,
        estimatedRevenue: 320.5,
      };
  const youtubeConnected = true;

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
          <div className="flex flex-1 flex-wrap gap-y-2 gap-x-3.5 w-full items-stretch">
            <Card className="bg-[#9E00F9] rounded-xl flex-1 min-w-[220px] min-h-[160px] h-full">
              <div className="flex flex-col h-full justify-between p-3">
                <div>
                  <p className="text-[#F4F4F5] text-xs font-bold leading-4 opacity-60 font-['Inter']">
                    Credit Score →
                  </p>
                  <p className="text-[#F4F4F5] text-3xl font-['Space_Grotesk'] font-medium leading-9">
                    {creditScoreData.overallScore}
                  </p>
                </div>
                <p className="text-[#F4F4F5] text-sm font-['Inter'] leading-[14px]">
                  Based on your consistency, engagement, and income
                </p>
              </div>
            </Card>
            <Card className="bg-[#080808] rounded-xl flex-1 min-w-[220px] min-h-[160px] h-full">
              <div className="flex flex-col h-full justify-between p-3">
                <div>
                  <p className="text-[#F4F4F5] text-xs font-bold leading-4 opacity-60 font-['Inter']">
                    Monthly Income Estimate (YouTube)
                  </p>
                  <p className="text-[#F4F4F5] text-3xl font-['Space_Grotesk'] font-medium leading-9">
                    $
                    {ytIncome.monthlyIncome?.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <p className="text-[#D4D4D8] text-sm font-['Inter'] leading-[14px]">
                  Estimated from current CPM and view trends
                </p>
              </div>
            </Card>
            <Card className="bg-[#080808] rounded-xl flex-1 min-w-[220px] min-h-[160px] h-full">
              <div className="flex flex-col h-full justify-between p-3">
                <div>
                  <p className="text-[#F4F4F5] text-xs font-bold leading-4 opacity-60 font-['Inter']">
                    YouTube Views (Latest Month)
                  </p>
                  <p className="text-[#F4F4F5] text-3xl font-['Space_Grotesk'] font-medium leading-9">
                    {ytMetrics.views?.toLocaleString()}
                  </p>
                </div>
                <p className="text-[#D4D4D8] text-sm font-['Inter'] leading-[14px]">
                  Total views for the most recent month
                </p>
              </div>
            </Card>
            <Card className="bg-[#080808] rounded-xl flex-1 min-w-[220px] min-h-[160px] h-full">
              <div className="flex flex-col h-full justify-between p-3">
                <div>
                  <p className="text-[#F4F4F5] text-xs font-bold leading-4 opacity-60 font-['Inter']">
                    Subscribers Gained (YTD)
                  </p>
                  <p className="text-[#F4F4F5] text-3xl font-['Space_Grotesk'] font-medium leading-9">
                    {subscribersGained?.toLocaleString()}
                  </p>
                </div>
                <p className="text-[#D4D4D8] text-sm font-['Inter'] leading-[14px]">
                  Net audience growth this year
                </p>
              </div>
            </Card>
          </div>
          {/* Line graph Section */}
          <div className="flex-1 min-h-[350px] w-full flex">
            <div className="flex-1 flex">
              <CreditScoreLineChart data={creditScoreTrend} />
            </div>
          </div>
          {/* Chart Section */}
          <div className="flex-1 min-h-[350px] w-full flex gap-6">
            <div className="flex-1 flex">
              <YouTubeBarChart data={barChartData} />
            </div>
          </div>
          {/* Progress Bars Section */}
          <div className="flex flex-row gap-6 w-full mt-2">
            <ScoreProgress
              color="#9E00F9"
              description="Based on upload frequency and schedule"
              label="Consistency Score"
              max={100}
              value={creditScoreData?.scoreFactors?.consistency ?? 0}
            />
            <ScoreProgress
              color="#9E00F9"
              description="Avg engagement vs. audience size"
              label="Engagement Score"
              max={100}
              value={creditScoreData?.scoreFactors?.engagement ?? 0}
            />
          </div>
        </div>
      </DashboardMain>
    </div>
  );
}
