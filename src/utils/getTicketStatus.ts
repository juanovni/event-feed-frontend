import { Ticket } from "@/interfaces";

export function getTicketStatus(ticket: Ticket) {
  const redeemed = ticket.redeemedCount ?? 0;
  const total = Math.max(ticket.itemsInOrder || 1, 1);
  if (redeemed >= total) return "redeemed";
  if (redeemed > 0) return "partial";
  if (new Date(ticket.event.eventDate) > new Date()) return "upcoming";
  return "pending";
}
