'use client';

import { UserPlus } from "lucide-react";
import { Button } from "@/components";
import { useFollow } from "@/hooks";
import { Event } from "@/interfaces";
import { useFollowStore } from "@/store";
import { cn } from "@/lib/utils";

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
      onClick={handleFollow}
    >
      <UserPlus className={cn("mr-2 h-4 w-4", event.isFollowing && "fill-current")}
      />
      {event.isFollowing ? "Siguiendo" : "Seguir"}
    </Button>
  )
}
