"use client";

import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";

let socket: Socket | null = null;

export function useNotifications(userId?: string, token?: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userId) return;

    // Evita múltiples conexiones
    if (!socket) {
      socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
        auth: token ? { token } : undefined,
        transports: ["websocket"],
      });
    }

    socket.connect();

    socket.on("connect", () => {
      console.log("🔌 Socket conectado:", socket?.id);
      socket?.emit("join_user", userId);
    });

    // ✅ Escucha de nuevas notificaciones, evitando duplicados
    socket.on("notification:new", (notification: any) => {
      queryClient.setQueryData(["notifications", userId], (old: any[] = []) => {
        const exists = old.some((n) => n.id === notification.id);
        if (exists) return old;
        return [notification, ...old];
      });
    });


    return () => {
      socket?.emit("leave_user", userId);
      // No desconectes si compartes el socket globalmente
    };
  }, [userId, token, queryClient]);

  return {};
}
