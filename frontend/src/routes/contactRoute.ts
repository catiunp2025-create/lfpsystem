import type { Contact } from "../../../packages/shared/src";
import api from "../services/api";

export const contactRoute = {
  async create(customerId: string, type: string, value: string) {
    const response = await api.post<Contact>(`/customers/${customerId}/contacts`, {
      type,
      value,
    });

    return response.data;
  },
};
