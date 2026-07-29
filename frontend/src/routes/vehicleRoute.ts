import type { Vehicle } from "../../../packages/shared/src";
import api from "../services/api";

export const vehicleRoute = {
  async create(model: string, plate: string, color: string) {
    const response = await api.post<Vehicle>("/vehicles", {
      model,
      plate,
      color,
    });

    return response.data;
  },

  async update(
    id: string,
    data: { model: string; plate: string; color: string },
  ) {
    const response = await api.put<Vehicle>(`/vehicles/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    const response = await api.delete<void>(`/vehicles/${id}`);
    return response.data;
  },

  async list() {
    const response = await api.get<Vehicle[]>("/vehicles");
    return response.data;
  },

  async findById(id: string) {
    const response = await api.get<Vehicle>(`/vehicles/${id}`);
    return response.data;
  },
};
