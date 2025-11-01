import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createEvent } from "@/actions";

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast("Evento creado exitosamente 🎉");
    },
    onError: (error: any) => {
      const msg =
        error.response?.data?.message ||
        "Ocurrió un error al crear el evento";
      //toast.error(msg);
    },
  });
};
