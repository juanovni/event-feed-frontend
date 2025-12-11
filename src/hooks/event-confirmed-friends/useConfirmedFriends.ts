import { useQuery } from "@tanstack/react-query";
import { getConfirmedFriends } from "@/actions";

export const useConfirmedFriends = (eventId: string) => {
  return useQuery({
    queryKey: ["confirmed-friends", { eventId }],
    queryFn: () => getConfirmedFriends(eventId),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};