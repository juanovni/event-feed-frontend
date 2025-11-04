// src/store/ticket.store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Ticket } from "@/interfaces";

interface TicketStore {
  tickets: Ticket[];
  addTicket: (ticket: Ticket) => void;
  clearTickets: () => void;
}

export const useTicketStore = create<TicketStore>()(
  persist(
    (set) => ({
      tickets: [],
      addTicket: (ticket) =>
        set((state) => ({
          tickets: [...state.tickets, ticket],
        })),
      clearTickets: () => set({ tickets: [] }),
    }),
    { name: "tickets-storage" }
  )
);
