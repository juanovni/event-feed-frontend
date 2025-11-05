import { create } from "zustand";

interface InterestStore {
  interestedEvents: Set<string>;
  toggleLocalInterest: (eventId: string) => void;
  reset: () => void;
}

export const useInterestStore = create<InterestStore>((set, get) => ({

  interestedEvents: new Set(),

  toggleLocalInterest: (eventId) => {
    const current = new Set(get().interestedEvents);
    if (current.has(eventId)) {
      current.delete(eventId);
    } else {
      current.add(eventId);
    }
    set({ interestedEvents: current });
  },

  reset: () => set({ interestedEvents: new Set() }),

}));