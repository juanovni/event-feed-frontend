import { useQuery } from "@tanstack/react-query";
import { getInterestedEvents } from "@/actions";

export const useInterestedEvents = () => {
  return useQuery({
    queryKey: ["interested-events"],
    queryFn: () => getInterestedEvents(),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
