
import { create } from "zustand";
import { AuthAction, Event } from "@/interfaces";

interface AuthModalState {
  isOpen: boolean;
  callback?: () => void;
  payload?: {
    event?: Event;
    action?: AuthAction;
  };
  openModal: (
    cb?: () => void,
    payload?: AuthModalState["payload"]
  ) => void;

  closeModal: () => void;
}

export const useAuthModalStore = create<AuthModalState>((set) => ({
  isOpen: false,
  callback: undefined,
  payload: undefined,

  openModal: (cb, payload) =>
    set({
      isOpen: true,
      callback: cb,
      payload,
    }),

  closeModal: () =>
    set({
      isOpen: false,
      callback: undefined,
      payload: undefined,
    }),
}));