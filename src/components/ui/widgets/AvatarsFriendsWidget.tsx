'use client';

import { useEventAttendees } from '@/hooks';
import { EventConfirmedTooltip } from '@/components/events/event-confirmed-friends/EventConfirmedTooltip';

interface Props {
  eventId: string;
}
export const AvatarsFriendsWidget = ({ eventId }: Props) => {
  const { data: attendees = [], isLoading, isError } = useEventAttendees(eventId);

  if (isLoading) return <p>Cargando.</p>;
  if (isError) return <p>Error al cargar los eventos.</p>;

  return (
    <div className="flex items-center gap-2 py-2">
      {attendees.length > 0 && (
        <>
          <EventConfirmedTooltip users={attendees} />
          <p className="text-black font-semibold text-sm">{attendees.length} asistirán</p>
        </>
      )}
    </div>
  )
}
