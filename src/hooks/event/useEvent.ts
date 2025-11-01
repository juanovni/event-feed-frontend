import { useQuery } from "@tanstack/react-query";
import { getEvents } from "@/actions";

export const useEvents = (
  isFollowing?: boolean
) => {
  return useQuery({
    queryKey: ["events", { isFollowing }],
    queryFn: () => getEvents(isFollowing),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};