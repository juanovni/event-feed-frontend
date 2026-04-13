import { getTicketById } from "@/actions";
import { useQuery } from "@tanstack/react-query";

export const useTicket = (ticketId: string, enabled = true) => {
  return useQuery({
    queryKey: ["ticket-by-id", { ticketId }],
    queryFn: () => getTicketById(ticketId),
    enabled,
    staleTime: 1000 * 60 * 15, // 15 minutos
  });
};