'use client';

import { Notification } from "@/interfaces";
import { mockNotifications } from "@/data/mockData";
import { useState } from "react";
import { NotificationPanel } from "@/components";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

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

  return (
    <NotificationPanel
      notifications={notifications}
      onMarkAsRead={handleMarkNotificationAsRead}
      onDismiss={handleDismissNotification}
    />
  );
}