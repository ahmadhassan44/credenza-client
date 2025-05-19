"use client";

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface CreditScoreChartProps {
  historyData: any[];
  rawHistoryForClickHandler: any[];
}

const CreditScoreChart: React.FC<CreditScoreChartProps> = ({ historyData, rawHistoryForClickHandler }) => {
  // Process the history data for the chart
  
  const chartData = historyData.map(item => {
    const date = new Date(item.timestamp || item.date);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      score: item.overallScore,
      rawData: item
    };
  });

  // Sort data chronologically
  chartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#27272A] p-3 rounded-md shadow-lg border border-[#3F3F46]">
          <p className="text-white font-medium">{`${label}`}</p>
          <p className="text-[#9E00F9] font-bold">{`Credit Score: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  const CustomDot = (props: any) => {
    const { cx, cy, stroke, payload } = props;
    return (
      <circle 
        cx={cx} 
        cy={cy} 
        r={6} 
        fill="#18181b" 
        stroke="#9E00F9" 
        strokeWidth={2}
      />
    );
  };

  return (
    <div className="bg-[#18181b] rounded-xl p-6 shadow-lg">
      <h2 className="text-white text-xl font-['Space_Grotesk'] font-bold mb-6">Credit Score History</h2>
      
      <div className="w-full h-64 md:h-80">
        {chartData.length > 0 ? (
          <ResponsiveContainer>
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 20, left: 10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#3F3F46" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#D4D4D8', fontSize: 12 }} 
                axisLine={{ stroke: '#3F3F46' }}
              />
              <YAxis 
                domain={[0, 100]} 
                tick={{ fill: '#D4D4D8', fontSize: 12 }} 
                axisLine={{ stroke: '#3F3F46' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="score"
                stroke="url(#colorScore)"
                strokeWidth={3}
                dot={<CustomDot />}
                activeDot={{ r: 8, fill: '#9E00F9' }}
              />
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6E21DB" />
                  <stop offset="100%" stopColor="#9E00F9" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-[#A1A1AA] text-lg">No history data available</p>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-center text-sm text-[#A1A1AA]">
        <p>Credit score trends over the past {chartData.length} months</p>
      </div>
    </div>
  );
};

export default CreditScoreChart;
