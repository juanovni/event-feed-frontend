"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store";

export const useProtectedRoute = () => {
  const router = useRouter();
  const { user, accessToken, refreshAccessToken } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      // Si no hay usuario ni token, intentar refrescar
      if (!user && !accessToken) {
        await refreshAccessToken();
      }

      // Luego de intentar refrescar, revisamos de nuevo
      const hasSession = useAuthStore.getState().accessToken;
      if (!hasSession) {
        router.replace("/login"); // redirige a login
      }
    };

    checkAuth();
  }, [user, accessToken, refreshAccessToken, router]);
};
