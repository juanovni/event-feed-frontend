import { Ticket } from "@/interfaces";

export function getTicketStatus(ticket: Ticket) {
  const eventDate = new Date(ticket.event.eventDate);
  const now = new Date();

  if (!ticket.isPaid) return "pending"; // no pagado
  if (eventDate < now) return "redeemed"; // evento pasado
  return "upcoming"; // evento futuro
}