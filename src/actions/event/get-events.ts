import { eventApi } from "@/api/event.api";

export const getEvents = async (
  isFollowing?: boolean
) => {
  try {
    const { data } = await eventApi.get("/events", {
      params: {
        isFollowing: isFollowing
      }
    });
    return data;
  } catch (error) {
    console.log(error)

    throw new Error("No se pudo consultar los eventos");
  }

};