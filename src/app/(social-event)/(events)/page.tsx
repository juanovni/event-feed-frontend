'use client';

import { EventEmpty, EventGrid, EventSkeletonCard, HeaderButton, Title, AuthGuard } from "@/components";
import { useEvents } from "@/hooks";

export default function EventsPage() {
  const { data: events, isLoading, isError } = useEvents();

  return (
    <AuthGuard>
      {isLoading ? (
        <EventSkeletonCard />
      ) : isError ? (
        <p>Error al cargar los eventos.</p>
      ) : (
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
      )}
    </AuthGuard>
  );
}
