import { eventApi } from "@/api/event.api";
import { InterestedEventsResponse } from "@/interfaces/interested-events.interface";

export const getInterestedEvents = async (): Promise<InterestedEventsResponse> => {
  try {
    const { data } = await eventApi.get("/events/me/interests");
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo consultar los eventos de interés");
  }
};
