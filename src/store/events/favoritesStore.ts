// store/useFavoritesStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Event } from "@/interfaces";

interface FavoritesState {
  favorites: Event[];
  toggleFavorite: (event: Event) => void;
  isFavorite: (eventId: string) => boolean;
  removeFavorite: (eventId: string) => void;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (event) => {
        const { favorites } = get();
        const isAlreadyFavorite = favorites.some((e) => e.id === event.id);

        const updatedFavorites = isAlreadyFavorite
          ? favorites.filter((e) => e.id !== event.id)
          : [...favorites, event];

        set({ favorites: updatedFavorites });
      },

      isFavorite: (eventId) => get().favorites.some((e) => e.id === eventId),

      removeFavorite: (eventId) =>
        set((state) => ({
          favorites: state.favorites.filter((e) => e.id !== eventId),
        })),

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "favorites-storage", // persistencia en localStorage
    }
  )
);
