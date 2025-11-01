import { toggleInterest } from "@/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useToggleInterest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventId: string) => toggleInterest(eventId),
    onSuccess: () => {
      // 👇 Refresca la lista de eventos automáticamente
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};