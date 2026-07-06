import type { OrderServiceStatus } from "../../../../packages/shared/src";

export type Service = {
  id: string;
  name: string;
  value: number;
  description: string;
};

export type AllOrderService = {
  id: string;
  date: Date;
  status: OrderServiceStatus;
  services: { service: Service }[];
};

export type ApiData = {
  month: number;
  year: number;
  total: number;
};

export type ChartData = {
  dateKey: string;
  total: string;
};
