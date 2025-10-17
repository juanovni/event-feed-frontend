import { NotificationGrid } from "@/components";
import { mockNotifications } from "@/data/mockData";

export default function NotificationPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Notificaciones</h2>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          Marcar todas como leídas
        </button>
      </div>
      <NotificationGrid
        notificationsData={mockNotifications}
      />
    </div>
  );
}