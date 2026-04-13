import { Ticket } from "./ticket.interface";

export interface AccessPass extends Ticket {
  source: "ticket" | "attendance";
}