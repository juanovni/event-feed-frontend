import { Event } from "./event.interface";

export interface Ticket {
  id: string;
  ticketNumber: string,
  subTotal: number;
  tax: number;
  total: number;
  itemsInOrder: number;
  isPaid: boolean;
  paidAt: Date;
  event: Event;
}
