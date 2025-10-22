import axios from "axios";

export const eventApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
});

// Interceptor opcional para token
/* import { useUserStore } from "@/store/userStore"; */

eventApi.interceptors.request.use((config) => {
  /* const token = useUserStore.getState().token; */
  /* if (token) config.headers.Authorization = `Bearer ${token}`; */
  return config;
});
