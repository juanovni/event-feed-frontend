import { toggleInterest } from "@/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useToggleInterest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventId: string) => toggleInterest(eventId),
    onSuccess: () => {
      console.log("Interés toggled, refrescando eventos...");
      queryClient.refetchQueries({ queryKey: ["event-by-slug"], exact: false });
    },
  });
};