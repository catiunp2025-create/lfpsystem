import { useCallback, useState } from "react";
import type { AllOrderService } from "../types";
import { formatApiData, formatChartData } from "../utils/dashboardFormatter";
import { mostRequestedService } from "../utils/serviceAnalytics";
import { getDashboardOrders } from "../services/dashboardService";

export function useDashboard() {
  const [orders, setOrders] = useState<AllOrderService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const now = new Date();
  const currentMonth = now.getMonth() === 0 ? 11 : now.getMonth();
  const currentYear =
    now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
  const currentYearOrders = orders.filter(
    (os) => os.date.getFullYear() === currentYear,
  );
  const getMonth = new Date(currentYear, currentMonth).toLocaleDateString(
    "pt-BR",
    {
      month: "long",
    },
  );
  const dataMonth = getMonth.charAt(0).toUpperCase() + getMonth.slice(1);
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const apiData = formatApiData(orders);
  const chartData = formatChartData(apiData);

  const orderServicePerYear = currentYearOrders.length;
  const orderServiceCompleted = currentYearOrders.filter(
    (os) => os.status === "FINISHED",
  ).length;
  const orderServicePending = currentYearOrders.filter(
    (os) => os.status === "AVAILABLE",
  ).length;
  const [mostRequestedServiceName, mostRequestedServices] =
    mostRequestedService(currentYearOrders) ?? ["Sem dados", []];

  const currentCardData = apiData.find(
    (data) => data.month === currentMonth && data.year === currentYear,
  );
  const previousCardData = apiData.find(
    (data) => data.month === previousMonth && data.year === previousYear,
  );
  const percentage =
    currentCardData && previousCardData
      ? Math.round((currentCardData.total * 100) / previousCardData.total - 100)
      : null;

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getDashboardOrders();
      setOrders(data);
    } catch (error) {
      setError("Não foi possível carregar os dados.");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    chartData,
    loading,
    error,
    currentYear,
    dataMonth,
    orderServicePerYear,
    orderServiceCompleted,
    orderServicePending,
    currentCardData,
    previousCardData,
    mostRequestedServiceName,
    mostRequestedServices,
    percentage,
    refresh: load,
  };
}
