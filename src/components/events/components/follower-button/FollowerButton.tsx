'use client';

import { UserPlus } from "lucide-react";
import { Button } from "@/components";
import { useFollow } from "@/hooks";
import { Event } from "@/interfaces";
import { useFollowStore } from "@/store";

interface Props {
  event: Event;
}

export const FollowerButton = ({ event }: Props) => {

  const { toggleFollow, isPending } = useFollow();
  const { toggleLocalFollow } = useFollowStore();

  const handleFollow = () => {
    toggleFollow(event.user.id, {
      onSuccess: (data) => {
        toggleLocalFollow(event.user.id, data.isFollowing);
      },
    });
  };

  return (
    <Button
      variant={event.isFollowing ? "secondary" : "outline"}
      size="sm"
      onClick={handleFollow}
    >
      <UserPlus className="mr-1.5 h-4 w-4" />
      {event.isFollowing ? "Siguiendo" : "Seguir"}
    </Button>
  )
}
