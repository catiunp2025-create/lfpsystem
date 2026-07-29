import type { Address } from "../../../packages/shared/src";
import api from "../services/api";

export const addressRoute = {
  async create(
    customerId: string,
    street: string,
    number: string,
    complement: string | undefined,
    neighborhood: string,
    postCode: string,
    city: string,
    state: string,
  ) {
    const response = await api.post<Address>(
      `/customers/${customerId}/address`,
      {
        street,
        number,
        complement,
        neighborhood,
        postCode,
        city,
        state,
      },
    );

    return response.data;
  },
};
