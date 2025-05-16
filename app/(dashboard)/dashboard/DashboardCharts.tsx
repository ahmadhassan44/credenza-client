import React from "react";
import CreditScoreLineChart from "./creditScoreLineChart";
import YouTubeBarChart from "./youtubeBarChart";

interface DashboardChartsProps {
  creditScoreTrend: any[];
  barChartData: any[];
  channels?: string[];
}

const DashboardCharts: React.FC<DashboardChartsProps> = ({ creditScoreTrend, barChartData, channels }) => {
  return (
    <>
      <div className="flex-1 min-h-[350px] w-full flex">
        <div className="flex-1 flex">
          <CreditScoreLineChart data={creditScoreTrend} />
        </div>
      </div>
      <div className="flex-1 min-h-[350px] w-full flex gap-6">
        <div className="flex-1 flex">
          <YouTubeBarChart data={barChartData} channels={channels} />
        </div>
      </div>
    </>
  );
};

export default DashboardCharts;
