import { eventApi } from "@/api/event.api";

interface TicketItemPayload {
  eventId: string;
  quantity: number;
  price: number;
}

interface TicketPayload {
  items: TicketItemPayload[];
}

export const placeOrder = async (payload: TicketPayload) => {
  try {
    const { data } = await eventApi.post("/tickets", payload);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo crear la orden del ticket");
  }
};
