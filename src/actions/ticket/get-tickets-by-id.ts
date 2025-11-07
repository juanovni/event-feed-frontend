import { eventApi } from "@/api/event.api";

export const getTicketById = async (ticketId: string) => {
  try {
    const { data } = await eventApi.get(`/tickets/user/ticket/${ticketId}`);

    return data;

  } catch (error) {
    console.log(error)

    throw new Error("No se pudo consultar el ticket");
  }

};