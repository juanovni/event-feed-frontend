import { eventApi } from "@/api/event.api";

export const getEvents = async () => {
  try {
    const response = await eventApi.get("/events");
    return response.data;
  } catch (error) {
    console.log(error)

    throw new Error("No se pudo consultar los eventos");
  }

};