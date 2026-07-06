import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type BarProps,
} from "recharts";
import type {
  Formatter,
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import type { AxisDomain } from "recharts/types/util/types";

interface BarChartProps<T> {
  data: T[];
  dataKey: BarProps["dataKey"];
  xAxisKey: BarProps["dataKey"];
  formatter?: Formatter<ValueType, NameType>;
  barColor?: string;
  activeBarColor?: string;
  label?: BarProps["label"];
  yAxisDomain?: AxisDomain;
  backgroundColor?: string;
}

export function RechartsBarChart<T extends object>({
  data,
  dataKey,
  xAxisKey,
  formatter,
  barColor,
  activeBarColor,
  label,
  yAxisDomain,
  backgroundColor,
}: BarChartProps<T>) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: backgroundColor,
        borderRadius: 12,
        padding: 16,
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          width={500}
          height={300}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barCategoryGap="10%"
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#2a3447"
            vertical={false}
          />

          <XAxis
            dataKey={xAxisKey}
            tick={{
              fill: "#9ca3af",
              fontSize: 14,
            }}
            interval={0}
            angle={-30}
            textAnchor="end"
            height={46}
          />

          <YAxis
            tick={{
              fill: "#9ca3af",
              fontSize: 14,
            }}
            axisLine={false}
            tickLine={false}
            domain={yAxisDomain}
          />

          <Tooltip
            cursor={false}
            contentStyle={{
              backgroundColor: "#1E293B",
              border: "1px solid rgba(251, 191, 36, 0.15)",
              borderRadius: "10px",
              boxShadow: "0 8px 20px rgba(0,0,0,.35)",
            }}
            labelStyle={{ color: "#dbd4e3" }}
            formatter={formatter}
          />

          <Bar
            dataKey={dataKey}
            radius={[8, 8, 0, 0]}
            maxBarSize={50}
            fill={barColor}
            activeBar={activeBarColor ? { fill: activeBarColor } : undefined}
            label={label}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
