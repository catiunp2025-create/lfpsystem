import type { OrderServiceStatus, OrderServices } from "../../../packages/shared/src";
import api from "../services/api";

export const orderServiceRoute = {
  async create(
    vehicleUserIds: string[],
    date: string,
    addressId: string,
    serviceIds: string[],
  ) {
    const response = await api.post<OrderServices>("/order-services", {
      vehicleUserIds,
      date,
      addressId,
      serviceIds,
    });

    return response.data;
  },

  async list() {
    const response = await api.get<OrderServices[]>("/order-services");
    return response.data;
  },

  async findById(id: string) {
    const response = await api.get<OrderServices>(`/order-services/${id}`);
    return response.data;
  },

  async updateStatus(id: string, status: OrderServiceStatus) {
    const response = await api.patch<OrderServices>(`/order-services/${id}/status`, {
      status,
    });

    return response.data;
  },

  async generatePdf(id: string) {
    const response = await api.get<Blob>(`/order-services/${id}/pdf`, {
      responseType: "blob",
    });

    return response.data;
  },
};
