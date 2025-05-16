import { Card } from "@heroui/react";
import React from "react";

interface DashboardSummaryCardsProps {
  creditScore: number;
  ytIncome: number;
  ytViews: number;
  subscribersGained: number;
}

const DashboardSummaryCards: React.FC<DashboardSummaryCardsProps> = ({
  creditScore,
  ytIncome,
  ytViews,
  subscribersGained,
}) => (
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
  </div>
);

export default DashboardSummaryCards;
