import api from "../../../services/api";
import type { AllOrderService } from "../types";
import { getLastMonthRange } from "../utils/dateRange";

export async function getDashboardOrders(): Promise<AllOrderService[]> {
  const { startDate, endDate } = getLastMonthRange(12);

  const response = await api.get("/order-services");
  const data = response.data.map((os: AllOrderService & { date: string }) => ({
    ...os,
    date: new Date(os.date),
  }));

  return data.filter(
    (os: AllOrderService) => os.date > startDate && os.date < endDate,
  );
}
