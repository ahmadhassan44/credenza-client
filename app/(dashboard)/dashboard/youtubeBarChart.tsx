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

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;
  const views = payload.find((p: any) => p.dataKey === "views");
  const cpm = payload.find((p: any) => p.dataKey === "cpm");

  return (
    <div
      style={{
        background: "#18181b",
        borderRadius: 8,
        padding: 12,
        color: "#F4F4F5",
        minWidth: 100,
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>
      {views && (
        <div
          style={{
            color: "#9E00F9",
            fontFamily: "Space Grotesk",
            fontSize: 14,
          }}
        >
          Views: {views.value.toLocaleString()}
        </div>
      )}
      {cpm && (
        <div
          style={{
            color: "#CA2EE9",
            fontFamily: "Space Grotesk",
            fontSize: 14,
          }}
        >
          CPM: ${cpm.value}
        </div>
      )}
    </div>
  );
}

export default function YouTubeBarChart({
  data,
  channels,
}: {
  data: any[];
  channels?: string[];
}) {
  // If multi-channel, render a bar for each channel's views per month
  // Otherwise, fallback to single-channel
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
            barGap={6}
            data={data}
            margin={{ top: 20, right: 40, left: 40, bottom: 40 }}
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
              tickFormatter={(v) => v.toLocaleString()}
              yAxisId="left"
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
            {channels && channels.length > 1
              ? channels.map((channel, idx) => (
                  <Bar
                    key={channel}
                    barSize={18}
                    dataKey={`views_${channel}`}
                    fill={["#9E00F9", "#CA2EE9", "#00C2F9", "#F9A602"][idx % 4]}
                    name={`Views (${channel})`}
                    radius={[6, 6, 0, 0]}
                    yAxisId="left"
                  />
                ))
              : (
                <Bar
                  barSize={28}
                  dataKey="views"
                  fill="#9E00F9"
                  name="Views"
                  radius={[6, 6, 0, 0]}
                  yAxisId="left"
                />
              )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
