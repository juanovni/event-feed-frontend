"use client";

import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNotificationStore } from "@/store";

// Define un tipo claro para las notificaciones
interface NotificationData {
  id: string;
  title: string;
  message: string;
  createdAt?: string;
  [key: string]: unknown; // permite campos adicionales
}

let socket: Socket | null = null;

export function useNotifications(userId?: string, token?: string) {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  useEffect(() => {
    if (!userId) return;

    // Evita múltiples conexiones
    if (!socket) {
      socket = io(process.env.NEXT_PUBLIC_SOCKET_URL ?? "", {
        auth: token ? { token } : undefined,
        transports: ["websocket"],
      });
    }

    socket.connect();

    socket.on("connect", () => {
      console.log("🔌 Socket conectado:", socket?.id);
      socket?.emit("join_user", userId);
    });

    // ✅ Escucha nuevas notificaciones (sin any)
    socket.on("notification:new", (notification: NotificationData) => {
      queryClient.setQueryData<NotificationData[]>(
        ["notifications", userId],
        (old = []) => {
          const exists = old.some((n) => n.id === notification.id);
          if (exists) return old;
          return [notification, ...old];
        }
      );

      // ✅ Actualiza contador global (Zustand)
      addNotification(notification);

      // ✅ Muestra toast visual (Sonner)
      toast(notification.title, {
        description: notification.message,
        action: {
          label: "Ver",
          onClick: () => (window.location.href = "/notifications"),
        },
      });
    });

    socket.on(
      "notification:count",
      (payload: { userId: number; count: number }) => {
        queryClient.setQueryData(["notifications_count", userId], payload.count);
      }
    );

    return () => {
      socket?.emit("leave_user", userId);
      // No desconectes si compartes el socket globalmente
    };
  }, [userId, token, queryClient, addNotification]);

  return {};
}
