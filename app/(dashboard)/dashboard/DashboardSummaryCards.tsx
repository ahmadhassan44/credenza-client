import { Card } from "@heroui/react";
import React from "react";

interface DashboardSummaryCardsProps {
  creditScore: number;
  ytIncome: number;
  ytViews: number;
  subscribersGained: number;
  channelMetrics?: Record<string, any[]>;
  months?: string[];
  channels?: string[];
}

const DashboardSummaryCards: React.FC<DashboardSummaryCardsProps> = ({
  creditScore,
  ytIncome,
  ytViews,
  subscribersGained,
  channelMetrics,
  months,
  channels,
}) => {
  return (
    <div className="flex flex-1 flex-wrap gap-y-2 gap-x-3.5 w-full items-stretch">
      <Card className="bg-[#9E00F9] rounded-xl flex-1 min-w-[220px] min-h-[160px] h-full">
        <div className="flex flex-col h-full justify-between p-3">
          <div>
            <p className="text-[#F4F4F5] text-xs font-bold leading-4 opacity-60 font-['Inter']">
              Credit Score →
            </p>
            <p className="text-[#F4F4F5] text-3xl font-['Space_Grotesk'] font-medium leading-9">
              {creditScore}
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
              ${ytIncome.toLocaleString(undefined, { maximumFractionDigits: 2 })}
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
              {ytViews.toLocaleString()}
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
              {subscribersGained.toLocaleString()}
            </p>
          </div>
          <p className="text-[#D4D4D8] text-sm font-['Inter'] leading-[14px]">
            Net audience growth this year
          </p>
        </div>
      </Card>
      {/* Per-channel breakdown for latest month */}
      {channels && months && channelMetrics && months.length > 0 && (
        <div className="w-full flex flex-wrap gap-2 mt-2">
          {channels.map((channel) => {
            const metricsArr = channelMetrics[channel] || [];
            const latest = metricsArr.find((m: any) => m.month === months[months.length - 1]);
            return (
              <Card key={channel} className="bg-[#18181b] rounded-xl min-w-[180px] flex-1">
                <div className="p-3">
                  <p className="text-[#F4F4F5] text-xs font-bold opacity-60 font-['Inter']">{channel}</p>
                  <p className="text-[#F4F4F5] text-lg font-['Space_Grotesk'] font-medium">
                    Income: ${latest?.estimatedRevenueUsd?.toLocaleString(undefined, { maximumFractionDigits: 2 }) || 0}
                  </p>
                  <p className="text-[#F4F4F5] text-lg font-['Space_Grotesk'] font-medium">
                    Views: {latest?.views?.toLocaleString() || 0}
                  </p>
                  <p className="text-[#F4F4F5] text-sm font-['Inter'] opacity-70">
                    Subs: {latest?.audienceSize?.toLocaleString() || 0}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DashboardSummaryCards;
