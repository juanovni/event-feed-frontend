import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { Ticket, Event } from "@/interfaces";

interface TicketStore {
  tickets: Ticket[];
  generateTicket: (event: Event, cost: number, seat?: string, section?: string) => Ticket;
  clearTickets: () => void;
}

export const useTicketStore = create<TicketStore>((set, get) => ({
  tickets: [],

  generateTicket: (event, cost, seat, section) => {
    const newTicket: Ticket = {
      id: uuidv4(),
      event,
      cost,
      ticketNumber: `T-${Math.floor(Math.random() * 1000000)}`,
      seat,
      section,
      createdAt: new Date(),
    };

    set((state) => ({
      tickets: [...state.tickets, newTicket],
    }));

    return newTicket; // puedes usarlo después para mostrarlo o enviarlo al backend
  },

  clearTickets: () => set({ tickets: [] }),
}));
