import axios from "axios";
import { useAuthStore } from "@/store";

export const eventApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
});

// Interceptor opcional para token
/* import { useUserStore } from "@/store/userStore"; */

// Interceptor para agregar token automáticamente
eventApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para refrescar token si expira
eventApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refreshToken")
    ) {
      originalRequest._retry = true;
      await useAuthStore.getState().refreshAccessToken();
      const token = useAuthStore.getState().accessToken;
      originalRequest.headers.Authorization = `Bearer ${token}`;
      return eventApi(originalRequest);
    }
    return Promise.reject(error);
  }
);