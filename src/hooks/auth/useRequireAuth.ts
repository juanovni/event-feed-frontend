
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store";

export const useRequireAuth = () => {
  const router = useRouter();
  const { user } = useAuthStore();

  const requireAuth = (callback?: () => void) => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    callback?.();
  };

  return { requireAuth };
};