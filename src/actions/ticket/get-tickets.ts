import { eventApi } from "@/api/event.api";

export const getTickets = async () => {
  try {
    const { data } = await eventApi.get("/tickets/user");

    return data;

  } catch (error) {
    console.log(error)

    throw new Error("No se pudo consultar los tickets");
  }

};