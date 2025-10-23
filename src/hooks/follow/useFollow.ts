import { eventApi } from "@/api/event.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useFollow = () => {
  const queryClient = useQueryClient();

  const { mutate: toggleFollow, isPending } = useMutation({
    mutationFn: async (followingId: string) => {
      const { data } = await eventApi.post(`/follow/${followingId}`);
      return data;
    },
    onSuccess: (data, followingId) => {
      // 🔁 Actualiza el estado del evento o lista
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  return { toggleFollow, isPending };
};
