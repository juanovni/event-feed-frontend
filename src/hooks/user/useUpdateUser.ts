import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateUser } from "@/actions/user/update-user";
import { useAuthStore } from "@/store/auth/authStore";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: updateUser,

    onSuccess: (data) => {
      setUser(data.user);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast("Perfil actualizado ✅");
    },

    onError: () => {
      toast("Error al actualizar perfil");
    },
  });
};