import { useAuthStore, useAuthModalStore, AuthModalPayload } from "@/store";

export const useRequireAuth = () => {
  const { user } = useAuthStore();
  const { openModal } = useAuthModalStore();

  const requireAuth = (
    callback?: () => void,
    payload?: AuthModalPayload
  ) => {
    if (!user) {
      openModal(callback, payload);
      return;
    }

    callback?.();
  };

  return { requireAuth };
};
