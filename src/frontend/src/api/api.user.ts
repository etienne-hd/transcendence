import { apiClient } from "./api.service";
import type { User } from "./types/user";

const avatarCache: Map<string, Blob> = new Map();

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
      formData.append("file", avatar);
    }

    const response = await apiClient.put<User>("/me", formData);

    return response.data;
  },

  async loadAvatar(
    id: number,
    imgRef: HTMLImageElement,
  ): Promise<{ message: string }> {
    const cacheName = "avatar-cache-v1";
    const requestUrl = `/user/${id}/avatar`;

    let blob;

    if (avatarCache.get(requestUrl)) {
      blob = avatarCache.get(requestUrl);
    } else {
      const cache = await caches.open(cacheName);

      let response = await cache.match(requestUrl);

      if (!response) {
        const axiosResponse = await apiClient.get(requestUrl, {
          responseType: "blob",
        });

        response = new Response(axiosResponse.data, {
          headers: { "Content-Type": axiosResponse.headers["content-type"] },
        });

        await cache.put(requestUrl, response.clone());
      }

      blob = await response.blob();

      avatarCache.set(requestUrl, blob);
    }

    if (blob) {
      imgRef.src = URL.createObjectURL(blob);
    }

    return { message: "Avatar retreived" };
  },
};
