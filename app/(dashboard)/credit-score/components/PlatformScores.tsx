"use client";

import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from 'recharts';

interface PlatformScoresProps {
  scoreData: any;
}

interface PlatformScore {
  platformId: string;
  platformType: string;
  platformHandle: string;
  score: number;
  factors: {
    factor: string;
    score: number;
    weight: number;
    description: string;
  }[];
}

const PlatformScores: React.FC<PlatformScoresProps> = ({ scoreData }) => {
  const platformScores: PlatformScore[] = scoreData?.platformScores || [];

  // Format data for bar chart
  const barChartData = platformScores.map(platform => ({
    name: platform.platformHandle || platform.platformType,
    score: platform.score,
    type: platform.platformType
  }));
  // Format data for radar chart (factor breakdown per platform)
  // Define interface for radar data entry with dynamic platform keys
  interface RadarDataEntry {
    factor: string;
    [platformType: string]: string | number; // Allow dynamic platform type keys
  }
  
  const radarData: RadarDataEntry[] = [];
  
  platformScores.forEach(platform => {
    platform.factors.forEach(factor => {
      const existingEntry = radarData.find(entry => entry.factor === factor.factor);
      
      if (existingEntry) {
        existingEntry[platform.platformType] = factor.score;
      } else {
        const newEntry: RadarDataEntry = { factor: factor.factor };
        newEntry[platform.platformType] = factor.score;
        radarData.push(newEntry);
      }
    });
  });

  const platformColors: Record<string, string> = {
    YOUTUBE: '#FF0000',  // YouTube red
    INSTAGRAM: '#E1306C', // Instagram pink/purple
    TIKTOK: '#69C9D0',   // TikTok teal
    TWITTER: '#1DA1F2',  // Twitter blue
    DEFAULT: '#9E00F9'   // Default purple
  };

  const CustomBarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#27272A] p-3 rounded-md shadow-lg border border-[#3F3F46] text-sm">
          <p className="text-white font-medium">{data.name || data.type}</p>
          <p className="text-[#9E00F9] font-bold">{`Score: ${data.score}`}</p>
        </div>
      );
    }
    return null;
  };

  const CustomRadarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#27272A] p-3 rounded-md shadow-lg border border-[#3F3F46] text-sm">
          <p className="text-white font-medium">{`${payload[0].payload.factor}`}</p>
          {payload.map((p: any, index: number) => (
            <p key={index} style={{ color: p.stroke }}>{`${p.name}: ${p.value}`}</p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#18181b] rounded-xl p-6 shadow-lg">
      <h2 className="text-white text-xl font-['Space_Grotesk'] font-bold mb-6">Platform Scores</h2>
      
      {platformScores.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#202022] rounded-lg p-4">
            <h3 className="text-white text-lg font-medium mb-3">Overall Platform Scores</h3>
            <div className="h-64">
              <ResponsiveContainer>
                <BarChart
                  data={barChartData}
                  margin={{ top: 10, right: 10, left: 10, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#3F3F46" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#D4D4D8', fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    tick={{ fill: '#D4D4D8', fontSize: 12 }}
                  />
                  <Tooltip content={<CustomBarTooltip />} />
                  <Bar 
                    dataKey="score" 
                    fill="#9E00F9"
                    background={{ fill: '#27272A' }}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-[#202022] rounded-lg p-4">
            <h3 className="text-white text-lg font-medium mb-3">Factor Comparison</h3>
            <div className="h-64">
              {radarData.length > 0 ? (
                <ResponsiveContainer>
                  <RadarChart
                    outerRadius={90}
                    data={radarData}
                  >
                    <PolarGrid stroke="#3F3F46" />
                    <PolarAngleAxis 
                      dataKey="factor"
                      tick={{ fill: '#D4D4D8', fontSize: 10 }}
                    />
                    <PolarRadiusAxis 
                      angle={30}
                      domain={[0, 100]}
                      tick={{ fill: '#D4D4D8', fontSize: 10 }}
                    />
                    <Tooltip content={<CustomRadarTooltip />} />
                    {platformScores.map((platform, index) => (
                      <Radar
                        key={platform.platformId}
                        name={platform.platformType}
                        dataKey={platform.platformType}
                        stroke={platformColors[platform.platformType] || platformColors.DEFAULT}
                        fill={platformColors[platform.platformType] || platformColors.DEFAULT}
                        fillOpacity={0.2}
                      />
                    ))}
                    <Legend 
                      formatter={(value) => <span className="text-[#D4D4D8] text-sm">{value}</span>}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-[#A1A1AA]">No factor data available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-[#A1A1AA] my-8">No platform data available</p>
      )}
      
      {platformScores.length > 0 && (
        <div className="mt-6">
          <h3 className="text-white text-lg font-medium mb-3">Detailed Platform Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {platformScores.map((platform) => (
              <div key={platform.platformId} className="bg-[#202022] rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ 
                      backgroundColor: platformColors[platform.platformType] || platformColors.DEFAULT
                    }} 
                  />
                  <h4 className="text-white font-medium">
                    {platform.platformHandle || platform.platformType}
                  </h4>
                </div>
                <p className="text-[#9E00F9] text-2xl font-bold">{platform.score}</p>
                <div className="mt-3 space-y-2">
                  {platform.factors.map((factor, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-[#D4D4D8] text-xs mb-1">
                        <span>{factor.factor}</span>
                        <span>{factor.score}/100</span>
                      </div>
                      <div className="h-2 w-full bg-[#27272A] rounded-full">
                        <div 
                          className="h-full rounded-full" 
                          style={{ 
                            width: `${factor.score}%`,
                            backgroundColor: platformColors[platform.platformType] || platformColors.DEFAULT
                          }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlatformScores;
