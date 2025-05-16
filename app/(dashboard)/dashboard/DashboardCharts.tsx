import React from "react";
import CreditScoreLineChart from "./creditScoreLineChart";
import YouTubeBarChart from "./youtubeBarChart";

interface DashboardChartsProps {
  creditScoreTrend: any[];
  barChartData: any[];
}

const DashboardCharts: React.FC<DashboardChartsProps> = ({ creditScoreTrend, barChartData }) => (
  <>
    <div className="flex-1 min-h-[350px] w-full flex">
      <div className="flex-1 flex">
        <CreditScoreLineChart data={creditScoreTrend} />
      </div>
    </div>
    <div className="flex-1 min-h-[350px] w-full flex gap-6">
      <div className="flex-1 flex">
        <YouTubeBarChart data={barChartData} />
      </div>
    </div>
  </>
);

export default DashboardCharts;
