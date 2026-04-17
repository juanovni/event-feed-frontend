
import { create } from "zustand";
import { AuthAction, Event } from "@/interfaces";

export interface AuthModalPayload {
  event?: Event;
  action?: AuthAction;
  redirectTo?: string;
}

interface AuthModalState {
  isOpen: boolean;
  callback?: () => void;
  payload?: AuthModalPayload;
  openModal: (
    cb?: () => void,
    payload?: AuthModalPayload
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
