import { Event } from "./event.interface";

export interface Ticket {
  id: string;
  subTotal: number;
  tax: number;
  total: number;
  itemsInOrder: number;
  isPaid: Boolean;
  paidAt: Date;
  event: Event;
}
