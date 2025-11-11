import { eventApi } from "@/api/event.api";

export const getConfirmedFriends = async (eventId: string) => {
  const { data } = await eventApi.get(`/events/${eventId}/confirmed-friends`);
  return data;
};