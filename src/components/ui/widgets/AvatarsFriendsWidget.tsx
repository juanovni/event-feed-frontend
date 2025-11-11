'use client';

import { useConfirmedFriends } from '@/hooks';
import { EventConfirmedTooltip } from '@/components/events/event-confirmed-friends/EventConfirmedTooltip';

interface Props {
  eventId: string;
}
export const AvatarsFriendsWidget = ({ eventId }: Props) => {
  const { data: users, isLoading, isError } = useConfirmedFriends(eventId);

  if (isLoading) return <p>Cargando.</p>;
  if (isError) return <p>Error al cargar los eventos.</p>;

  return (
    <div className="flex items-center gap-2">
      {users.length > 0 && (
        <>
          <EventConfirmedTooltip users={users} />
          <p className="text-muted-foreground text-sm">tus amigos ya confirmaron</p>
        </>
      )}
    </div>
  )
}
