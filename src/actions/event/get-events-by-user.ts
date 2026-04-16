import { eventApi } from "@/api/event.api";

export const getEventsByUser = async (userId: string) => {
  const { data } = await eventApi.get(`/events/user/${userId}`);
  return data as import("@/interfaces").Event[];
};
