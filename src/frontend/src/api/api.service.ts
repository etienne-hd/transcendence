import axios, { type AxiosInstance } from "axios";

export const apiClient: AxiosInstance = axios.create({
  // PROD
  baseURL: "http://127.0.0.1:3000", // "/api",
  headers: {},
});

apiClient.interceptors.request.use(
  (config) => {
    const jwtToken = localStorage.getItem("accessToken");
    if (jwtToken) config.headers.Authorization = `Bearer ${jwtToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
