
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { verifyCode } from "@/actions";

export const useVerifyCode = () => {

  return useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) => verifyCode(email, code),

    onSuccess: (data) => {
      toast("Código de verificación verificado ✅");
    },

    onError: () => {
      toast("Error al verificar el código de verificación");
    },
  });
};