import { Card } from "@heroui/react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// CustomTooltip for better currency and data display
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#18181b",
          borderRadius: 8,
          padding: "12px",
          color: "#F4F4F5",
          minWidth: 150,
          border: "1px solid #333",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        <p style={{ fontWeight: 600, marginBottom: 8 }}>{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color, fontSize: 14, marginBottom: 4 }}>
            {`${entry.name}: ${entry.dataKey.toLowerCase().includes('cpm') ? '$' : ''}${entry.value.toLocaleString(undefined, entry.dataKey.toLowerCase().includes('cpm') ? { minimumFractionDigits: 2, maximumFractionDigits: 2 } : {})}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export default function YouTubeBarChart({
  data,
  channels,
}: {
  data: any[];
  channels?: string[];
}) {
  const viewChannelColors = ["#9E00F9", "#CA2EE9", "#00C2F9", "#F9A602"];
  const cpmChannelColors = ["#4CAF50", "#FFC107", "#2196F3", "#E91E63"]; // CPM colors

  const commonBarProps = {
    radius: [6, 6, 0, 0] as [number, number, number, number], // Explicitly type radius
    barSize: channels && channels.length > 1 ? 18 : 28,
  };

  return (
    <Card className="bg-[#080808] rounded-xl w-full h-[373px] flex flex-col items-center justify-center mt-8">
      <div className="w-full flex flex-col items-start px-8 pt-8">
        <span className="text-[#F4F4F5] font-['Space_Grotesk'] text-base mb-2">
          YouTube Views & CPM by Month
        </span>
      </div>
      <div className="w-full h-[240px] flex flex-row">
        <ResponsiveContainer height="100%" width="95%">
          <BarChart
            barCategoryGap={24}
            barGap={4} // Adjusted for potentially more bars
            data={data}
            margin={{ top: 20, right: 60, left: 40, bottom: 40 }} // Increased right margin for CPM axis
          >
            <XAxis
              dataKey="month"
              interval={0}
              label={{
                value: "Month",
                position: "insideBottom",
                style: {
                  fill: "#F4F4F5",
                  fontSize: 14,
                  fontFamily: "Space Grotesk",
                },
                dy: 24,
              }}
              tick={{
                fill: "#F4F4F5",
                fontSize: 12,
                fontFamily: "Space Grotesk",
              }}
            />
            <YAxis
              yAxisId="left" // For Views
              label={{
                value: "Views",
                angle: -90,
                position: "insideLeft",
                style: {
                  fill: "#F4F4F5",
                  fontSize: 14,
                  fontFamily: "Space Grotesk",
                },
                dx: -10,
                dy: 40,
              }}
              tick={{
                fill: "#F4F4F5",
                fontSize: 12,
                fontFamily: "Space Grotesk",
              }}
              tickFormatter={(value: number) => value.toLocaleString()}
            />
            <YAxis
              yAxisId="right" // For CPM
              orientation="right"
              label={{
                value: "CPM ($)",
                angle: -90,
                position: "insideRight",
                style: {
                  fill: "#F4F4F5",
                  fontSize: 14,
                  fontFamily: "Space Grotesk",
                },
                dx: 15, 
                dy: 40, 
              }}
              tick={{
                fill: "#F4F4F5",
                fontSize: 12,
                fontFamily: "Space Grotesk",
              }}
              tickFormatter={(value: number) => `$${value.toFixed(2)}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              align="center"
              height={36}
              iconType="rect"
              verticalAlign="top"
              wrapperStyle={{
                color: "#F4F4F5",
                fontFamily: "Space Grotesk",
                fontSize: 13,
                paddingTop: 16,
                display: "flex",
                justifyContent: "center",
              }}
            />

            {/* View Bars */}
            {channels && channels.length > 1
              ? channels.map((channel, idx) => (
                  <Bar
                    {...commonBarProps}
                    key={`views-${channel}`}
                    dataKey={`views_${channel}`}
                    fill={viewChannelColors[idx % viewChannelColors.length]}
                    name={`Views (${channel})`}
                    yAxisId="left"
                  />
                ))
              : (
                <Bar
                  {...commonBarProps}
                  key="views"
                  dataKey="views"
                  fill={viewChannelColors[0]}
                  name="Views"
                  yAxisId="left"
                />
              )
            }

            {/* CPM Bars */}
            {channels && channels.length > 1
              ? channels.map((channel, idx) => (
                  <Bar
                    {...commonBarProps}
                    key={`cpm-${channel}`}
                    dataKey={`cpm_${channel}`}
                    fill={cpmChannelColors[idx % cpmChannelColors.length]}
                    name={`CPM (${channel})`}
                    yAxisId="right"
                  />
                ))
              : (
                <Bar
                  {...commonBarProps}
                  key="cpm"
                  dataKey="cpm"
                  fill={cpmChannelColors[0]}
                  name="CPM ($)"
                  yAxisId="right"
                />
              )
            }
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
