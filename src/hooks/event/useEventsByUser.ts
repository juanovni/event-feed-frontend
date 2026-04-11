import { useQuery } from "@tanstack/react-query";
import { getEventsByUser } from "@/actions";

export const useEventsByUser = (userId: string) => {
  return useQuery({
    queryKey: ["events-by-user", { userId }],
    queryFn: () => getEventsByUser(userId),
    staleTime: 1000 * 60 * 5,
    enabled: !!userId,
  });
};
