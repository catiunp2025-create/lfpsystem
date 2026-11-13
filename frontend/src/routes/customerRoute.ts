import type { Customer } from "../../../packages/shared/src";
import api from "../services/api";

export const customerRoute = {
  async create(name: string, type: string, value: string) {
    const response = await api.post<Customer>("/customers", {
      name,
      type,
      value,
    });

    return response.data;
  },

  async list() {
    const response = await api.get<Customer[]>("/customers");
    return response.data;
  },

  async findById(id: string) {
    const response = await api.get<Customer>(`/customers/${id}`);
    return response.data;
  },
};
