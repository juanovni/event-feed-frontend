'use client';

import { useState } from "react";
import { Notification } from "@/interfaces";
import { NotNotification } from "../not-notification/NotNotification";
import { NotificationGridItem } from "./NotificationGridItem";

interface Props {
  notificationsData: Notification[];
}

export function NotificationGrid({ notificationsData }: Props) {
  const [notifications, setNotifications] = useState<Notification[]>(notificationsData);

  const handleMarkNotificationAsRead = (notificationId: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleDismissNotification = (notificationId: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(notification => notification.id !== notificationId)
    );
  };

  if (notifications.length === 0) {
    return (
      <NotNotification />
    );
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <NotificationGridItem
          key={notification.id}
          notification={notification}
          onDismiss={handleDismissNotification}
          onMarkAsRead={handleMarkNotificationAsRead}
        />
      ))}
    </div>
  )
}
