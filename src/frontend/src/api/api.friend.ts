import { apiClient } from "./api.service";
import type { Friend } from "./types/friend";

export const friendService = {
  async getFriends(): Promise<Friend[]> {
    const response = await apiClient.get<Friend[]>("/friends");

    return response.data;
  },

  async addFriend(username: string): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>("/friend", {
      username: username,
    });

    return response.data;
  },

  async removeFriend(username: string): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>("/friend", {
      data: {
        username: username,
      },
    });

    return response.data;
  },
};
