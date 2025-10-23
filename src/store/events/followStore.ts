import { create } from "zustand";

interface FollowState {
  followingIds: Set<string>;
  toggleLocalFollow: (id: string, isFollowing: boolean) => void;
}

export const useFollowStore = create<FollowState>((set) => ({
  followingIds: new Set(),

  toggleLocalFollow: (id, isFollowing) =>
    set((state) => {
      const newSet = new Set(state.followingIds);
      if (isFollowing) newSet.add(id);
      else newSet.delete(id);
      return { followingIds: newSet };
    }),
}));