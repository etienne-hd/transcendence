import { apiClient } from "./api.service";
import type { Friend } from "./types/friend";

export const friendService = {
  async getFriends(): Promise<Friend[]> {
    const response = await apiClient.get<Friend[]>("/friends");

    return response.data;
  },

  async addFriend(username: string): Promise<string> {
    const response = await apiClient.post<string>("/friends", {
      username: username,
    });

    return response.data;
  },
};
