export type AllOrderService = {
  id: string;
  vehicleUserId: string;
  date: Date;
  addressId: string;
  status: string;
  services: Service[];
};

export type Service = {
  id: string;
  name: string;
  value: number;
  description: string;
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
