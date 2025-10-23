"use client";

import { useQuery } from "@tanstack/react-query";
import { eventApi } from "@/api/event.api";

export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data } = await eventApi.get("/events");
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};