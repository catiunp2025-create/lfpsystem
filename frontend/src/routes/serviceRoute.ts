import type { Service } from "../../../packages/shared/src";
import api from "../services/api";

export const serviceRoute = {
  async create(name: string, value: number, description?: string) {
    const response = await api.post<Service>("/services", {
      name,
      value,
      description,
    });

    return response.data;
  },

  async list() {
    const response = await api.get<Service[]>("/services");
    return response.data;
  },

  async findById(id: string) {
    const response = await api.get<Service>(`/services/${id}`);
    return response.data;
  },
};
