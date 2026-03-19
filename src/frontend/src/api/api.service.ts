import axios, { type AxiosInstance } from "axios";

export const apiClient: AxiosInstance = axios.create({
  baseURL: `http://${import.meta.env.VITE_BACKEND_URL}`,
  headers: {},
});

apiClient.interceptors.request.use(
  (config) => {
    const jwtToken = localStorage.getItem("accessToken");
    if (jwtToken) config.headers.Authorization = `Bearer ${jwtToken}`;
    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  },
);
