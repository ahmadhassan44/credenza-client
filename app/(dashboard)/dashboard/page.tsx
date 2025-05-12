"use client";

import { Card } from "@heroui/react";
import { useState } from "react";

import YouTubeBarChart from "./youtubeBarChart";
import CreditScoreLineChart from "./creditScoreLineChart";

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
  const creditScore = dummyData.creditScore;
  const ytIncome = dummyData.incomeSources.find(
    (i) => i.platform === "YOUTUBE",
  );
  const ytMetrics = dummyData.platformMetrics.find(
    (m) => m.platform === "YOUTUBE",
  );
  const subscribersGained = 2400; // Example static value

  // Use bar chart data from dummyData
  const barChartData = dummyData.youtubeMonthlyStats;

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
          {/* Chart Section */}
          <div className="flex-1 min-h-[350px] w-full flex">
            <div className="flex-1 flex">
              <CreditScoreLineChart data={creditScore.trendData} />
            </div>
          </div>
          {/* Bar Chart Section */}
          <div className="flex-1 min-h-[350px] w-full flex">
            <div className="flex-1 flex">
              <YouTubeBarChart data={barChartData} />
            </div>
          </div>
        </div>
      </DashboardMain>
    </div>
  );
}

