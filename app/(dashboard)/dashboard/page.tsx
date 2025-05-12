"use client";

import { Button, Card } from "@heroui/react";
import { useState, useEffect } from "react";
import { fetchYouTubeMetrics } from "@/services/api/metrics";
import { useRouter } from "next/navigation";

import YouTubeBarChart from "./youtubeBarChart";
import CreditScoreLineChart from "./creditScoreLineChart";
import ScoreProgress from "./ScoreProgress";

import { dummyData } from "@/data/dummyData";
import DashboardSidebar from "@/app/(dashboard)/dashboard/sidebar";
import DashboardMain from "@/app/(dashboard)/dashboard/main";

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
  const [active, setActive] = useState("Dashboard");
  const router = useRouter();
  const creditScore = dummyData.creditScore;
  const ytIncome = dummyData.incomeSources.find(
    (i) => i.platform === "YOUTUBE",
  );
  const ytMetrics = dummyData.platformMetrics.find(
    (m) => m.platform === "YOUTUBE",
  );
  const subscribersGained = 2400; // Example static value

  // Simulate YouTube connection and top video for demo
  const youtubeConnected = true; // or false to test the fallback UI
  const topVideo = youtubeConnected
    ? {
        title: "How to Grow on YouTube in 2025",
        thumbnailUrl: "/credenzaLogo.svg",
        views: 120000,
        estimatedRevenue: 320.5,
      }
    : null;

  // Use bar chart data from dummyData (limit to last 6 months for better fit)
  const barChartData = dummyData.youtubeMonthlyStats.slice(-6);

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
                    {creditScore.overallScore}
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
                    ${ytIncome ? ytIncome.monthlyIncome.toLocaleString() : "-"}
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
                    Views
                  </p>
                  <p className="text-[#F4F4F5] text-3xl font-['Space_Grotesk'] font-medium leading-9">
                    {ytMetrics ? ytMetrics.views.toLocaleString() : "-"}
                  </p>
                </div>
                <p className="text-[#D4D4D8] text-sm font-['Inter'] leading-[14px]">
                  Views across your entire channel
                </p>
              </div>
            </Card>
            <Card className="bg-[#080808] rounded-xl flex-1 min-w-[220px] min-h-[160px] h-full">
              <div className="flex flex-col h-full justify-between p-3">
                <div>
                  <p className="text-[#F4F4F5] text-xs font-bold leading-4 opacity-60 font-['Inter']">
                    Subscribers (Gained This Month)
                  </p>
                  <p className="text-[#F4F4F5] text-3xl font-['Space_Grotesk'] font-medium leading-9">
                    +{subscribersGained.toLocaleString()}
                  </p>
                </div>
                <p className="text-[#D4D4D8] text-sm font-['Inter'] leading-[14px]">
                  New subscribers in last 30 days
                </p>
              </div>
            </Card>
          </div>
          {/* Line graph Section */}
          <div className="flex-1 min-h-[350px] w-full flex">
            <div className="flex-1 flex">
              <CreditScoreLineChart data={creditScore.trendData} />
            </div>
          </div>
          {/* Chart Section with Top Video Card */}
          <div className="flex-1 min-h-[350px] w-full flex gap-6">
            <div className="flex-1 flex">
              <YouTubeBarChart data={barChartData} />
            </div>
            <Card className="flex flex-col justify-between bg-[#080808] rounded-xl p-6 shadow-lg w-[350px] min-w-[300px] max-w-[400px] min-h-[350px] h-full">
              {youtubeConnected && topVideo ? (
                <>
                  <span className="text-xs text-purple-400 font-bold mb-1">NEW</span>
                  <h3 className="text-white text-xl font-bold mb-2">Top Video</h3>
                  <p className="text-white/80 text-lg mb-2">"{topVideo.title}"</p>
                  <img src={topVideo.thumbnailUrl} alt="Top Video Thumbnail" className="rounded-lg w-full h-32 object-cover mb-3" />
                  <div className="flex flex-col gap-1 mb-4">
                    <span className="text-white/70 text-sm">Views: {topVideo.views.toLocaleString()}</span>
                    <span className="text-white/70 text-sm">Est. Revenue: ${topVideo.estimatedRevenue}</span>
                  </div>
                  <Button
                    className="w-full"
                    style={{ backgroundColor: "#9E00F9", color: "#fff" }}
                    variant="flat"
                  >
                    View Metrics
                  </Button>
                </>
              ) : (
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <span className="text-xs text-purple-400 font-bold mb-1">YOUTUBE</span>
                    <h3 className="text-white text-xl font-bold mb-2">Top Video</h3>
                    <p className="text-white/80 text-lg mb-4">No channel connected</p>
                  </div>
                  <Button
                    className="w-full mt-auto"
                    style={{ backgroundColor: "#9E00F9", color: "#fff" }}
                    variant="solid"
                    onClick={() => router.push("/income")}
                  >
                    Link YouTube Channel
                  </Button>
                </div>
              )}
            </Card>
          </div>
          {/* Progress Bars Section */}
          <div className="flex flex-row gap-6 w-full mt-2">
            <ScoreProgress
              label="Consistency Score"
              value={creditScore.scoreFactors.consistency}
              max={100}
              color="#9E00F9"
              background="#232329"
              description="Based on upload frequency and schedule"
            />
            <ScoreProgress
              label="Engagement Score"
              value={creditScore.scoreFactors.engagement}
              max={100}
              color="#9E00F9"
              background="#232329"
              description="Avg engagement vs. audience size"
            />
          </div>
        </div>
      </DashboardMain>
    </div>
  );
}

