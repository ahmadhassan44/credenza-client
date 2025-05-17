import React from "react";

import CreditScoreLineChart from "./creditScoreLineChart";
import YouTubeBarChart from "./youtubeBarChart";

interface DashboardChartsProps {
  barChartData: any[]; // Replace 'any' with a more specific type if available
  creditScoreHistory?: any[];
  creditScoreTrend: Array<{ date: string; score: number }>;
  channels?: string[];
}

const DashboardCharts: React.FC<DashboardChartsProps> = ({
  barChartData,
  creditScoreHistory,
  creditScoreTrend,
  channels,
}) => {
  return (
    <>
      <div className="flex-1 min-h-[350px] w-full flex">
        <div className="flex-1 flex">
          <CreditScoreLineChart
            creditScoreHistory={creditScoreHistory}
            data={creditScoreTrend}
          />
        </div>
      </div>
      <div className="flex-1 min-h-[350px] w-full flex gap-6">
        <div className="flex-1 flex">
          <YouTubeBarChart channels={channels} data={barChartData} />
        </div>
      </div>
    </>
  );
};

export default DashboardCharts;
