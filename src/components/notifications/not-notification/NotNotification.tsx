
import { Bell } from 'lucide-react';

export const NotNotification = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
      <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">No hay notificaciones</h3>
      <p className="text-gray-500">Te mantendremos informado sobre las últimas actualizaciones</p>
    </div>
  )
}
