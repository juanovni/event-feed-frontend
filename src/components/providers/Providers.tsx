"use client";

import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from "sonner";
import { useAuthStore } from "@/store";

interface Props {
  children: React.ReactNode;
}

const AuthHydrationWrapper = ({ children }: Props) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const { refreshAccessToken } = useAuthStore();

  useEffect(() => {
    // Esperar a que el store se hidrate desde localStorage
    const timer = setTimeout(() => {
      setIsHydrated(true);

      // Intentar refrescar el token si existe
      const state = useAuthStore.getState();
      if (state.refreshToken && !state.accessToken) {
        refreshAccessToken();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [refreshAccessToken]);

  // Mostrar loading mientras se hidrata
  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export const Providers = ({ children }: Props) => {
  const [client] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>
      <AuthHydrationWrapper>
        {children}
      </AuthHydrationWrapper>
      <Toaster
        position="bottom-right"
        richColors
        closeButton
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}