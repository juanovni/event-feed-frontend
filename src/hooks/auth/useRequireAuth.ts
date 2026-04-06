import { useAuthStore, useAuthModalStore } from "@/store";
import { AuthAction, Event } from "@/interfaces";

export const useRequireAuth = () => {
  const { user } = useAuthStore();
  const { openModal } = useAuthModalStore();

  const requireAuth = (
    callback?: () => void,
    payload?: { event?: Event; action?: AuthAction }
  ) => {
    if (!user) {
      openModal(callback, payload);
      return;
    }

    callback?.();
  };

  return { requireAuth };
};