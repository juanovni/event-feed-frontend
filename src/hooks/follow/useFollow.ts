// hooks/useFollow.ts
import { eventApi } from "@/api/event.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useFollow = () => {
  const queryClient = useQueryClient();

  const { mutate: toggleFollow, isPending } = useMutation({
    mutationFn: async (followingId: string) => {
      const { data } = await eventApi.post(`/follow/${followingId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["user-suggestions"] });
    },
  });

  return { toggleFollow, isPending };
};
