import { create } from "zustand";

interface Notification {
  id: string;
  title: string;
  message: string;
}

interface NotificationStore {
  notifications: Notification[];
  count: number;
  addNotification: (n: Notification) => void;
  resetCount: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  count: 0,

  addNotification: (n) =>
    set((state) => {
      const exists = state.notifications.some((x) => x.id === n.id);
      if (exists) return state;
      return {
        notifications: [n, ...state.notifications],
        count: state.count + 1,
      };
    }),

  resetCount: () => set({ count: 0 }),
}));
