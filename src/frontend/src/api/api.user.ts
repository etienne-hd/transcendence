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
    avatar?: File,
  ): Promise<User> {
    const formData = new FormData();

    if (name) formData.append("name", name);
    if (username) formData.append("username", username);
    if (email) formData.append("email", email);
    if (password) formData.append("password", password);
    if (biography) formData.append("biography", biography);

    if (avatar) {
      formData.append("file", avatar);
    }

    const response = await apiClient.put<User>("/me", formData);

    return response.data;
  },
};
