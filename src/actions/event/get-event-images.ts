import { eventApi } from "@/api/event.api";

export const fetchEventImages = async (eventId: string) => {
  const { data } = await eventApi.get(`/events/${eventId}/images`);
  return data;
};
