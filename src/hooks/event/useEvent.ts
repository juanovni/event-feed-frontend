import { useQuery } from "@tanstack/react-query";
import { getEvents } from "@/actions";

export const useEvents = (
  isFollowing?: boolean,
  enabled = true
) => {
  return useQuery({
    queryKey: ["events", { isFollowing }],
    queryFn: () => getEvents(isFollowing),
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};