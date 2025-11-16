import { useQuery } from "@tanstack/react-query";
import { fetchEventImages } from "@/actions";

export const useEventImages = (eventId: string) =>
  useQuery({
    queryKey: ["event-images", { eventId }],
    queryFn: () => fetchEventImages(eventId),
  });
