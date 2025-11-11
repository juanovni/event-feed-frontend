'use client';

import { useConfirmedFriends } from '@/hooks';
import { EventConfirmedTooltip } from '@/components/events/event-confirmed-friends/EventConfirmedTooltip';

export const AvatarsFriendsWidget = () => {
  const { data: users, isLoading, isError } = useConfirmedFriends("906a3d9a-aff1-4f06-be5c-f4ce231e87a3");

  if (isLoading) return <p>Cargando.</p>;
  if (isError) return <p>Error al cargar los eventos.</p>;

  return (
    <div className="flex items-center gap-2">
      {users && (
        <EventConfirmedTooltip users={users} />
      )}
      <p className="text-muted-foreground text-sm">tus amigos ya confirmaron</p>
    </div>
  )
}
