'use client';

import { EventEmpty, EventGrid, EventSkeletonCard, HeaderButton, Title } from "@/components";
import { useEvents } from "@/hooks";

export default function EventsPage() {
  const { data: events, isLoading, isError } = useEvents();

  if (isLoading) {
    return (
      <EventSkeletonCard  />
    );
  }
  if (isError) return <p>Error al cargar los eventos.</p>;

  return (
    <div className="space-y-4">
      <Title title="Eventos">
        <HeaderButton />
      </Title>
      {events.length === 0 ? (
        <EventEmpty type="event" />
      ) : (
        <EventGrid events={events} />
      )}
    </div>
  )
}
