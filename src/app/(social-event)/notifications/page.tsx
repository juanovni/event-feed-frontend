'use client';

import { getUserNotifications } from "@/actions";
import { NotificationGrid, Title } from "@/components";
import { mockNotifications } from "@/data/mockData";
import { useNotifications } from "@/hooks";
import { useQuery } from "@tanstack/react-query";

export default function NotificationPage() {

  const userId = '0cd748f2-f7a6-4f80-a777-9339d79fafd3';

  // ✅ Llamada inicial controlada
  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications", userId],
    queryFn: () => getUserNotifications(userId),
    //refetchOnMount: false,
    //refetchOnWindowFocus: false,
    //staleTime: 1000 * 60 * 5, // 5 min
  });
  
  // ✅ Activar socket
  useNotifications(userId);


  return (
    <div className="space-y-4">

      <Title title="Notificaciones">
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          Marcar todas como leídas
        </button>
      </Title>

      <h3>Notificaciones</h3>
      {notifications.length === 0 ? (
        <p className="text-gray-500">No tienes notificaciones.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
         {/*  {notifications.map((n: any) => (
            <li key={n.id} className="py-2">
              <strong>{n.title}</strong> — {n.message}
            </li>
          ))} */}
        </ul>
      )}


      <NotificationGrid
        notificationsData={mockNotifications}
      />
    </div>
  );
}