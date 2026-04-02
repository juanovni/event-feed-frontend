'use client';

import { getEventBySlug } from "@/actions";
import { useQuery } from "@tanstack/react-query";

export const useEventBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["event-by-slug", { slug }],
    queryFn: () => getEventBySlug(slug),
    staleTime: 1000 * 60 * 15,
    enabled: !!slug,
  });
};
