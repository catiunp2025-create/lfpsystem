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
}: BarChartProps<T>) {
  return (
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
          tick={{
            fill: "#9ca3af",
            fontSize: 14,
          }}
          dataKey={xAxisKey}
        />

        <YAxis
          tick={{
            fill: "#9ca3af",
            fontSize: 14,
          }}
          axisLine={false}
          tickLine={false}
          interval={0}
          angle={-30}
          textAnchor="end"
          height={46}
          domain={yAxisDomain}
        />

        <Tooltip
          contentStyle={{
            backgroundColor: "#0F172A",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
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
  );
}
