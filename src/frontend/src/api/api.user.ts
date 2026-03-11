import { apiClient } from "./api.service";
import type { User } from "./types/user";

export const userService = {
  async me(): Promise<User> {
    const response = await apiClient.get<User>("/me");

    return response.data;
  },
};
