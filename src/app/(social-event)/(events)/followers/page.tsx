'use client';

import { EventEmpty, EventGrid, HeaderButton, Title } from "@/components";
import { useEvents } from "@/hooks";

export default function FollowersPage() {
  const { data: events, isLoading, isError } = useEvents(true);

  if (isLoading) return <p>Cargando eventos...</p>;
  if (isError) return <p>Error al cargar los eventos.</p>;

  return (
    <div className="space-y-4">
      <Title title="Eventos">
        <HeaderButton />
      </Title>
      {events.length === 0 ? (
        <EventEmpty type="followers" />
      ) : (
        <EventGrid events={events} />
      )}
    </div>
  )
}
