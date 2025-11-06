import { getTickets } from "@/actions";
import { useQuery } from "@tanstack/react-query";

export const useTickets = () => {
  return useQuery({
    queryKey: ["tickets"],
    queryFn: () => getTickets(),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};