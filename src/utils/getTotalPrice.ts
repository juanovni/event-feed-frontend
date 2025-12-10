import { Event } from "@/interfaces";

export function getTotalPrice(event: Event): number {
  return event.eventTicketTypes?.reduce((acc, ticket) => acc + (ticket.price || 0), 0) || 0;
}