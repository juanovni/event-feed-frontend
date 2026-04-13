import { useQuery } from "@tanstack/react-query";
import { getEventAttendees } from "@/actions";

export const useEventAttendees = (eventId?: string, enabled = true) => {
  return useQuery({
    queryKey: ["event-attendees", { eventId }],
    queryFn: () => getEventAttendees(eventId!),
    enabled: enabled && !!eventId,
    staleTime: 1000 * 60 * 5,
  });
};