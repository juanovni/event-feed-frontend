import { eventApi } from "@/api/event.api";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PreRegisterData, RegisterData } from "@/interfaces/user.interface";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  lastName?: string;
  username: string;
  role?: string;
  avatar?: string;
  email: string;
  description?: string;
  gender: string;
  birthdate: string;
  location?: string;
  phone?: string;
  createdAt: string;
  categories?: { id: string; name: string }[];
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  preRegister: (data: PreRegisterData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,

      setUser: (user) => set({ user }),

      async login(email, password) {
        const { data } = await eventApi.post("/auth/login", { email, password });
        set({
          user: data.user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });
      },

      async preRegister(data: PreRegisterData) {
        try {
          const { data: resp } = await eventApi.post("/auth/pre-register", data);
          set({
            user: resp.user,
          });
        } catch (error: any) {
          toast.error(error?.response?.data?.message || "Error en pre-registro");
          throw new Error("Error en pre-registro");
        }
      },

      async register(data: RegisterData) {
        const { data: resp } = await eventApi.post("/auth/complete-register", data);

        set({
          user: resp.user,
          accessToken: resp.accessToken,
          refreshToken: resp.refreshToken,
        });
      },

      async logout() {
        const { refreshToken } = get();
        if (refreshToken) {
          await eventApi.post("/auth/logout", { refreshToken });
        }
        set({ user: null, accessToken: null, refreshToken: null });
        // Limpiar localStorage
        localStorage.removeItem("auth-storage");
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
