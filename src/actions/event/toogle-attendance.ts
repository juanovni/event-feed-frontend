import { eventApi } from "@/api/event.api";

export const toggleAttendace = async (eventId: string) => {
  const { data } = await eventApi.post(`/events/${eventId}/attend`);
  return data;
};