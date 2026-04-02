'use client';

import { use } from "react";
import { useEventBySlug } from "@/hooks";
import { EventGridItem } from "@/components";
import { EventSkeletonCard } from "@/components";

interface Props {
  params: Promise<{ slug: string }>;
}

export function EventPageContent({ params }: Props) {
  const { slug } = use(params);
  const { data: event, isLoading, isError } = useEventBySlug(slug);

  if (isLoading) {
    return (
      <EventSkeletonCard />
    );
  }

  if (isError) return <p>Error al cargar los eventos.</p>;

  return <EventGridItem event={event} />
}