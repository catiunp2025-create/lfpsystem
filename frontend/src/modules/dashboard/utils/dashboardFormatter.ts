import type { AllOrderService, ApiData, ChartData } from "../types";

export function formatApiData(orders: AllOrderService[]): ApiData[] {
  const apiData = orders.reduce<Record<string, ApiData>>((acc, os) => {
    const date = new Date(os.date);

    const month = date.getMonth();
    const year = date.getFullYear();

    const key = `${year}-${month}`;

    const osTotal = os.services.reduce(
      (sum, { service }) => sum + service.value,
      0,
    );

    if (!acc[key]) {
      acc[key] = {
        month,
        year,
        total: 0,
      };
    }

    acc[key].total += osTotal;

    return acc;
  }, {});

  return Object.values(apiData).sort(
    (a, b) =>
      new Date(a.year, a.month).getTime() - new Date(b.year, b.month).getTime(),
  );
}

export function formatChartData(data: ApiData[]): ChartData[] {
  return data.map((item) => ({
    dateKey:
      new Date(item.year, item.month)
        .toLocaleString("pt-BR", { month: "short" })
        .replace(".", "") +
      "-" +
      new Date(item.year, item.month).toLocaleString("pt-BR", {
        year: "numeric",
      }),
    total: item.total.toFixed(2),
  }));
}
