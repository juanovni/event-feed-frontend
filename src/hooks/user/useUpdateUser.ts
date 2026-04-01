import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateUser } from "@/actions/user/update-user";
import { AxiosError } from "axios";
import { useAuthStore } from "@/store/auth/authStore";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: updateUser,

    onSuccess: (data) => {
      // 🧠 actualizar zustand
      setUser(data.user);

      // 🔄 refrescar cache
      queryClient.invalidateQueries({ queryKey: ["user"] });

      toast("Perfil actualizado correctamente ✅");
    },

    onError: (error: AxiosError<{ message?: string }>) => {
      const msg =
        error.response?.data?.message ||
        "Error al actualizar el perfil";

      toast(msg);
    },
  });
};