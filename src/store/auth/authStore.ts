import { eventApi } from "@/api/event.api";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  username: string;
  rol: string;
  avatar: string;
  email: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,

      async login(email, password) {
        const { data } = await eventApi.post("/auth/login", { email, password });
        set({
          user: data.user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });
      },

      async register(name, email, password) {
        const { data } = await eventApi.post("/auth/register", { name, email, password });
        set({
          user: data.user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });
      },

      async logout() {
        const { refreshToken } = get();
        if (refreshToken) {
          await eventApi.post("/auth/logout", { refreshToken });
        }
        set({ user: null, accessToken: null, refreshToken: null });
      },

      async refreshAccessToken() {
        const { refreshToken } = get();
        if (!refreshToken) return;

        try {
          const { data } = await eventApi.post("/auth/refresh", { refreshToken });
          set({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          });
        } catch (err) {
          console.error("Refresh token inválido:", err);
          get().logout();
        }
      },
    }),
    {
      name: "auth-storage", // 🔹 nombre de la key en localStorage
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
