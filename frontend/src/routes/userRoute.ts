import type { User } from "../../../packages/shared/src";
import api from "../services/api";

export const userRoute = {
  async create(name: string, role: User["role"], email: string, password: string) {
    const response = await api.post<User>("/users", {
      name,
      role,
      email,
      password,
    });

    return response.data;
  },

  async list() {
    const response = await api.get<User[]>("/users");
    return response.data;
  },

  async findById(id: string) {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },
};
