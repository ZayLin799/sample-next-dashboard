/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RTooltip,
  Label,
} from "recharts";

const data = [
  { day: "Jan 16", old: 4.0, newv: 8.0, last: 70, avg: 78 },
  { day: "Jan 18", old: 6.0, newv: 6.0, last: 80, avg: 84 },
  { day: "Jan 19", old: 6.5, newv: 8.8, last: 86, avg: 86 },
  { day: "Jan 20", old: 4.5, newv: 8.5, last: 82, avg: 85 },
  { day: "Jan 22", old: 5.0, newv: 9.0, last: 86, avg: 90 },
  { day: "Jan 24", old: 6.0, newv: 8.0, last: 84, avg: 88 },
  { day: "Jan 26", old: 3.2, newv: 8.5, last: 87, avg: 91 },
  { day: "Jan 28", old: 5.2, newv: 6.0, last: 86, avg: 88 },
  { day: "Jan 30", old: 4.2, newv: 7.2, last: 80, avg: 86 },
];

const COLORS = {
  old: "#f6ad7b", // light orange
  newv: "#fb923c", // dark orange
  last: "#10b981", // teal
  avg: "#ef476f", // pink
};

export default function VisitorsCard() {
  return (
    <Card className="shadow-sm xl:col-span-2 pt-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Visitors</CardTitle>
        <CardDescription>
          For more details about usage, please refer to the licences.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Legend like screenshot */}
        <div className="mb-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <LegendDot color={COLORS.old} label="old Visitor" />
          <LegendDot color={COLORS.newv} label="New visitor" />
          <LegendLine color={COLORS.last} label="Last Month Visitor" />
          <LegendLine color={COLORS.avg} dashed label="Average Visitor" />
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              {/* Left axis: $M scale */}
              <YAxis
                yAxisId="left"
                domain={[0, 10]}
                tickFormatter={(v) => `$${v}M`}
              >
                <Label
                  value="Visitors"
                  angle={-90}
                  position="insideLeft"
                  offset={10}
                />
              </YAxis>
              {/* Right axis: 70–95 */}
              <YAxis yAxisId="right" orientation="right" domain={[70, 95]}>
                <Label
                  value="New Visitors"
                  angle={-90}
                  position="insideRight"
                />
              </YAxis>

              <RTooltip
                formatter={(value: any, name: string | undefined) => [value, name]}
                labelFormatter={(l) => l}
              />

              {/* Bars */}
              <Bar
                yAxisId="left"
                dataKey="old"
                name="old Visitor"
                fill={COLORS.old}
                radius={[4, 4, 0, 0]}
                opacity={0.9}
              />
              <Bar
                yAxisId="left"
                dataKey="newv"
                name="New visitor"
                fill={COLORS.newv}
                radius={[4, 4, 0, 0]}
                opacity={0.9}
              />

              {/* Lines */}
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="last"
                name="Last Month Visitor"
                stroke={COLORS.last}
                strokeWidth={3}
                dot={{
                  r: 3,
                  strokeWidth: 2,
                  stroke: COLORS.last,
                  fill: "#fff",
                }}
                activeDot={{ r: 5 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="avg"
                name="Average Visitor"
                stroke={COLORS.avg}
                strokeWidth={3}
                strokeDasharray="6 6"
                dot={{ r: 3, strokeWidth: 2, stroke: COLORS.avg, fill: "#fff" }}
                activeDot={{ r: 5 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

/* --- tiny legend helpers to match the screenshot --- */
function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="inline-block h-3 w-5 rounded"
        style={{ background: color }}
      />
      <span className="text-slate-600">{label}</span>
    </div>
  );
}
function LegendLine({
  color,
  label,
  dashed = false,
}: {
  color: string;
  label: string;
  dashed?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="inline-block h-[3px] w-6 rounded"
        style={{
          background: color,
          borderTop: dashed ? `2px dashed ${color}` : `2px solid ${color}`,
          backgroundColor: "transparent",
        }}
      />
      <span className="text-slate-600">{label}</span>
    </div>
  );
}
