import { apiClient } from "./api.service";
import type { User } from "./types/user";

export const authService = {
  async login(email: string, password: string): Promise<string> {
    const response = await apiClient.post<{ accessToken: string }>(
      "/auth/login/",
      { email: email, password: password },
    );

    const token = response.data.accessToken;

    localStorage.setItem("accessToken", token);

    return token;
  },

  async register(
    name: string,
    username: string,
    email: string,
    password: string,
  ): Promise<string> {
    const response = await apiClient.post<{ accessToken: string }>(
      "/auth/register/",
      { name: name, username: username, email: email, password: password },
    );

    const token = response.data.accessToken;

    localStorage.setItem("accessToken", token);

    return token;
  },

  async getMyUser(): Promise<User> {
    const response = await apiClient.get<User>("/auth/me/");

    return response.data;
  },
};
