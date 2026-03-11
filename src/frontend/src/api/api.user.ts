import { apiClient } from "./api.service";
import type { User } from "./types/user";

export const userService = {
  async me(): Promise<User> {
    const response = await apiClient.get<User>("/me");

    return response.data;
  },

  async updateMe(
    email?: string,
    username?: string,
    name?: string,
    password?: string,
    biography?: string,
  ): Promise<User> {
    const response = await apiClient.put<User>("/me", {
      name: name,
      username: username,
      email: email,
      password: password,
      biography: biography,
    });

    return response.data;
  },
};
