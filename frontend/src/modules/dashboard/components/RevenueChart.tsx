import { formatCurrency } from "../../../utils/FormatCurrency";
import { RechartsBarChart } from "../../../components/charts/RechartsBarChart";
import type { NameType } from "recharts/types/component/DefaultTooltipContent";
import type { ChartData } from "../types";

interface RevenueChartProps {
  data: ChartData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <RechartsBarChart
      data={data}
      dataKey="total"
      xAxisKey="dateKey"
      formatter={(value) => [
        formatCurrency(Number(value)),
        "Faturamento" as NameType,
      ]}
      barColor="#FBBF24"
      activeBarColor="#FCD34D"
      label={{ position: "top", fill: "#9ca3af", fontSize: "14" }}
      yAxisDomain={[0, (dataMax: number) => Math.ceil(dataMax * 1.1)]}
    />
  );
}
