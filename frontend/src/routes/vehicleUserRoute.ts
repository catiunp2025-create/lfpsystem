import type { VehicleUser } from "../../../packages/shared/src";
import api from "../services/api";

export const vehicleUserRoute = {
  async create(vehicleId: string, userId: string, type: string) {
    const response = await api.post<VehicleUser>(`/vehicles/${vehicleId}/users`, {
      userId,
      type,
    });

    return response.data;
  },

  async list() {
    const response = await api.get<VehicleUser[]>("/vehicle-users");
    return response.data;
  },
};
