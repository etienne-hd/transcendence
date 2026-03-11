import { apiClient } from "./api.service";

export const authService = {
  async login(username: string, password: string): Promise<string> {
    const response = await apiClient.post<{ accessToken: string }>(
      "/auth/login/",
      { username: username, password: password },
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
};
