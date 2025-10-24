import { eventApi } from "@/api/event.api";

export const toggleInterest = async (eventId: string) => {
  const { data } = await eventApi.post(`/events/${eventId}/toggle-interest`);
  return data;
};