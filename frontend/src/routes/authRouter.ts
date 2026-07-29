import type { User } from "../../../packages/shared/src";
import api from "../services/api";

export const authRoute = {
  async login(email: string, password: string, organizationId?: string) {
    const response = await api.post("/auth/login", {
      email,
      password,
      organizationId,
    });
    return response.data;
  },

  async me() {
    const response = await api.get<User>("/auth/me");
    return response.data;
  },
};
