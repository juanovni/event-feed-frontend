// store/useFollowStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FollowState {
  following: string[]; // array de IDs de usuarios seguidos
  toggleFollow: (userId: string) => void;
  isFollowing: (userId: string) => boolean;
  setFollowing: (users: string[]) => void;
  clearFollowing: () => void;
}

export const useFollowStore = create<FollowState>()(
  persist(
    (set, get) => ({
      following: [],

      toggleFollow: (userId) => {
        const { following } = get();
        const isAlreadyFollowing = following.includes(userId);

        set({
          following: isAlreadyFollowing
            ? following.filter((id) => id !== userId)
            : [...following, userId],
        });
      },

      isFollowing: (userId) => get().following.includes(userId),

      setFollowing: (users) => set({ following: users }),

      clearFollowing: () => set({ following: [] }),
    }),
    {
      name: "follow-storage", // se guarda en localStorage
    }
  )
);
