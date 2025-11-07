'use client';

/* import { getUserNotifications } from "@/actions"; */
import { NotificationGrid, Title } from "@/components";
import { mockNotifications } from "@/data/mockData";
import { useNotifications } from "@/hooks";
import { useNotificationStore } from "@/store";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function NotificationPage() {
  const queryClient = useQueryClient();
  const { count, resetCount } = useNotificationStore();

  const userId = '36901bb8-d078-4356-9e8f-253cb4a8de49';

  // ✅ Llamada inicial controlada
  /*  const { data: notifications = [] } = useQuery({
     queryKey: ["notifications", userId],
     queryFn: () => getUserNotifications(userId), */
  //refetchOnMount: false,
  //refetchOnWindowFocus: false,
  //staleTime: 1000 * 60 * 5, // 5 min
  /*  }); */

  // ✅ Activar socket
  useNotifications(userId);


  useEffect(() => {
    queryClient.setQueryData(["notifications_count", userId], 0);
  }, [userId, queryClient]);

  // 🧹 Resetear contador al entrar
  useEffect(() => {
    resetCount();
  }, [resetCount]);

  return (
    <div className="space-y-4">

      <Title title={`Notificaciones (${count})`}>
        <button
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          onClick={() => resetCount()}
        >
          Marcar todas como leídas
        </button>
      </Title>

      <h3>Notificaciones</h3>
      {/* {notifications.length === 0 ? (
        <p className="text-gray-500">No tienes notificaciones.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {notifications.map((n: any) => (
            <li key={n.id} className="py-2">
              <strong>{n.title}</strong> — {n.message}
            </li>
          ))}
        </ul>
      )} */}


      <NotificationGrid
        notificationsData={mockNotifications}
      />
    </div>
  );
}