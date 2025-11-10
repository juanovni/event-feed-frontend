import { toggleAttendace } from "@/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useToggleAttend = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventId: string) => toggleAttendace(eventId),
    onSuccess: () => {
      // 👇 Refresca la lista de eventos automáticamente
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
