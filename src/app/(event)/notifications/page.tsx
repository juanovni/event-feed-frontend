import { NotificationGrid, Title } from "@/components";
import { mockNotifications } from "@/data/mockData";

export default function NotificationPage() {
  return (
    <div className="space-y-4">
      
      <Title title="Notificaciones">
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          Marcar todas como leídas
        </button>
      </Title>

      <NotificationGrid
        notificationsData={mockNotifications}
      />
    </div>
  );
}