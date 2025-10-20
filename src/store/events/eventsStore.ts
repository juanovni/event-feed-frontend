// store/useEventsStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Event } from "@/interfaces";

interface EventsState {
  events: Event[];
  interestedEvents: string[]; // IDs de eventos marcados como interesados
  setEvents: (events: Event[]) => void;
  toggleInterested: (eventId: string) => void;
  isInterested: (eventId: string) => boolean;
  updateEventInterestCount: (eventId: string, increment: boolean) => void;
  clearEvents: () => void;
}

export const useEventsStore = create<EventsState>()(
  persist(
    (set, get) => ({
      events: [],
      interestedEvents: [],

      setEvents: (events) => set({ events }),

      toggleInterested: (eventId) => {
        const { interestedEvents, updateEventInterestCount } = get();
        const isAlreadyInterested = interestedEvents.includes(eventId);

        // Actualizar el contador local del evento
        updateEventInterestCount(eventId, !isAlreadyInterested);

        const updated = isAlreadyInterested
          ? interestedEvents.filter((id) => id !== eventId)
          : [...interestedEvents, eventId];

        set({ interestedEvents: updated });
      },

      isInterested: (eventId) => get().interestedEvents.includes(eventId),

      updateEventInterestCount: (eventId, increment) => {
        set((state) => ({
          events: state.events.map((e) =>
            e.id === eventId
              ? {
                ...e,
                interested: increment ? e.interested + 1 : e.interested - 1,
                userStatus: increment ? "interested" : "none",
              }
              : e
          ),
        }));
      },

      clearEvents: () => set({ events: [], interestedEvents: [] }),
    }),
    {
      name: "events-storage", // Se guarda en localStorage
    }
  )
);