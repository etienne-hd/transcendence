import { apiClient } from "./api.service";
import type { User } from "./types/user";

export const userService = {
  async getUserInfomation(id: number): Promise<User> {
    const url = "/user/" + id;

    const response = await apiClient.get<User>(url);

    console.log(response);

    return response.data;
  },
};
