
import { Calendar, MessageCircle, Heart, Bell, Clock, X } from "lucide-react";
import { Notification } from "@/interfaces";

interface Props {
  notification: Notification;
  onMarkAsRead: (notificationId: string) => void;
  onDismiss: (notificationId: string) => void;
}

export const NotificationGridItem = ({ notification, onDismiss, onMarkAsRead }: Props) => {

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-4 transition-all duration-200 hover:shadow-md ${!notification.read ? 'ring-2 ring-blue-100' : ''
        }`}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 mt-1">
          {getIcon(notification.type)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-900 mb-1">
                {notification.title}
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                {notification.message}
              </p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>{formatTime(notification.timestamp)}</span>
                {!notification.read && (
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                )}
              </div>
            </div>

            <button
              onClick={() => onDismiss(notification.id)}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {!notification.read && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <button
                onClick={() => onMarkAsRead(notification.id)}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                Marcar como leída
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const getIcon = (type: string) => {
  switch (type) {
    case 'event_reminder':
      return <Calendar className="w-5 h-5 text-blue-500" />;
    case 'comment':
      return <MessageCircle className="w-5 h-5 text-green-500" />;
    case 'like':
      return <Heart className="w-5 h-5 text-red-500" />;
    default:
      return <Bell className="w-5 h-5 text-gray-500" />;
  }
};

const formatTime = (date: Date) => {
  const now = new Date();
  const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

  if (diffMinutes < 1) return 'Ahora mismo';
  if (diffMinutes < 60) return `${diffMinutes}m`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d`;
};