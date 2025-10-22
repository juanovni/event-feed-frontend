/* 'use client'; */

import { getEvents } from "@/actions";
import { EventGrid, HeaderButton, Title } from "@/components";
/* import { useEvents } from "@/hooks";
 */
export default async function EventsPage() {
  const events = await getEvents();
 /*  const { data: events, isLoading, isError } = useEvents();

  if (isLoading) return <p>Cargando eventos...</p>;
  if (isError) return <p>Error al cargar los eventos.</p>;
 */
  return (
    <div className="space-y-4">
      <Title title="Eventos">
        <HeaderButton />
      </Title>
      <EventGrid events={events} />
    </div>
  )
}
