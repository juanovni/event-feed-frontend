'use client';

import { getUserById } from "@/actions";
import { useQuery } from "@tanstack/react-query";

export const useUserById = (userId: string) => {
  return useQuery({
    queryKey: ["user-by-id", { userId }],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};
