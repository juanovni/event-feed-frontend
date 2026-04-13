import { create } from "zustand";

interface EventAttendeesDialogPayload {
  eventId: string;
  eventTitle: string;
}

interface EventAttendeesDialogState {
  isOpen: boolean;
  eventId?: string;
  eventTitle?: string;
  openDialog: (payload: EventAttendeesDialogPayload) => void;
  closeDialog: () => void;
}

export const useEventAttendeesDialogStore = create<EventAttendeesDialogState>((set) => ({
  isOpen: false,
  eventId: undefined,
  eventTitle: undefined,
  openDialog: ({ eventId, eventTitle }) => set({ isOpen: true, eventId, eventTitle }),
  closeDialog: () => set({ isOpen: false, eventId: undefined, eventTitle: undefined }),
}));