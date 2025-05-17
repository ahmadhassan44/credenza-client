"use client";

import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip 
} from 'recharts';

interface FactorBreakdownProps {
  scoreData: any;
}

interface Factor {
  factor: string;
  score: number;
  weight: number;
  description: string;
}

const FactorBreakdown: React.FC<FactorBreakdownProps> = ({ scoreData }) => {
  // Extract all unique factors from platform scores
  const allFactors: Factor[] = [];
  
  if (scoreData?.platformScores) {
    scoreData.platformScores.forEach((platform: any) => {
      if (platform.factors) {
        platform.factors.forEach((factor: Factor) => {
          // Check if this factor type already exists in our collection
          const existingFactor = allFactors.find(f => f.factor === factor.factor);
          if (!existingFactor) {
            allFactors.push(factor);
          }
        });
      }
    });
  }

  // Colors for the pie chart
  const COLORS = ['#6E21DB', '#9E00F9', '#4ADE80', '#FACC15', '#F87171', '#60A5FA'];
  
  // Format data for the pie chart
  const pieData = allFactors.map((factor, index) => ({
    name: factor.factor,
    value: factor.weight,
    description: factor.description,
    color: COLORS[index % COLORS.length]
  }));

  const renderTooltip = (props: any) => {
    const { active, payload } = props;
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#27272A] p-3 rounded-md shadow-lg border border-[#3F3F46] text-sm">
          <p className="text-white font-medium">{`${data.name}`}</p>
          <p className="text-[#A1A1AA]">{`Weight: ${(data.value * 100).toFixed(0)}%`}</p>
          {data.description && (
            <p className="text-[#A1A1AA] mt-1">{data.description}</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#18181b] rounded-xl p-6 shadow-lg">
      <h2 className="text-white text-xl font-['Space_Grotesk'] font-bold mb-4">Factor Weights</h2>
      
      {allFactors.length > 0 ? (
        <>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {
                    pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))
                  }
                </Pie>
                <Tooltip content={renderTooltip} />
                <Legend 
                  layout="vertical" 
                  verticalAlign="middle" 
                  align="right"
                  formatter={(value) => <span className="text-[#D4D4D8] text-sm">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4">
            <p className="text-center text-sm text-[#A1A1AA]">
              Credit score is calculated based on these weighted factors
            </p>
          </div>
        </>
      ) : (
        <p className="text-center text-[#A1A1AA] my-8">No factor data available</p>
      )}
    </div>
  );
};

export default FactorBreakdown;
