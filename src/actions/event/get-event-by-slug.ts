import { eventApi } from "@/api/event.api";

export const getEventBySlug = async (slug: string) => {
  try {
    const { data } = await eventApi.get(`/events/slug/${slug}`);
    return data;
  } catch (error) {
    console.log(error)
    throw new Error("No se pudo consultar el evento");
  }
};
