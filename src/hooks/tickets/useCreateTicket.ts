import { placeOrder } from "@/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: placeOrder,
    onSuccess: () => {
      // 👇 Refresca la lista de eventos automáticamente
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};