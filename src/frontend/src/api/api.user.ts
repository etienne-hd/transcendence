import { apiClient } from "./api.service";
import type { User } from "./types/user";

const avatarCache: Map<number, Blob> = new Map();

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
    avatar?: File | string,
  ): Promise<User> {
    const formData = new FormData();

    if (name) formData.append("name", name);
    if (username) formData.append("username", username);
    if (email) formData.append("email", email);
    if (password) formData.append("password", password);
    if (biography) formData.append("biography", biography);

    if (avatar) {
      if (typeof avatar == "string") {
        formData.append("avatar", avatar);
      } else {
        formData.append("file", avatar);
      }
    }

    const response = await apiClient.put<User>("/me", formData);

    return response.data;
  },

  async removeAvatarCache(id: number): Promise<void> {
    avatarCache.delete(id);
  },

  async loadAvatar(id: number): Promise<Blob> {
    const requestUrl = `/user/${id}/avatar`;

    if (avatarCache.get(id) != undefined) {
      return avatarCache.get(id)!;
    }

    const response = await apiClient.get(requestUrl, {
      responseType: "blob",
    });

    avatarCache.set(id, response.data);

    return response.data;
  },
};
