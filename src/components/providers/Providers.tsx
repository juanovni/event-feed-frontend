"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from "sonner";

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  const [client] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>
      {children}
      <Toaster
        position="top-right"
        richColors
        closeButton
/*         toastOptions={{
          style: {
            background: "#1f2937", // gris oscuro elegante
            color: "#fff",
            borderRadius: "10px",
          },
        }}
 */      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}