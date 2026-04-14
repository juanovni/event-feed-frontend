import { create } from "zustand";

interface InterestStore {
  interestOverrides: Record<string, boolean>;
  toggleLocalInterest: (eventId: string, currentValue: boolean) => void;
  setLocalInterest: (eventId: string, value: boolean) => void;
  clearLocalInterest: (eventId: string) => void;
  reset: () => void;
}

export const useInterestStore = create<InterestStore>((set, get) => ({
  interestOverrides: {},

  toggleLocalInterest: (eventId, currentValue) => {
    const current = get().interestOverrides[eventId] ?? currentValue;
    const next = !current;

    set((state) => ({
      interestOverrides: {
        ...state.interestOverrides,
        [eventId]: next,
      },
    }));
  },

  setLocalInterest: (eventId, value) =>
    set((state) => ({
      interestOverrides: {
        ...state.interestOverrides,
        [eventId]: value,
      },
    })),

  clearLocalInterest: (eventId) =>
    set((state) => {
      const next = { ...state.interestOverrides };
      delete next[eventId];

      return { interestOverrides: next };
    }),

  reset: () => set({ interestOverrides: {} }),

}));