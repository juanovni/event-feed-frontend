'use client';

import { UserPlus } from "lucide-react";
import { useFollow } from "@/hooks";
import { Event } from "@/interfaces";
import { useFollowStore } from "@/store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Props {
  event: Event;
}

export const FollowerButton = ({ event }: Props) => {

  const { toggleFollow } = useFollow();
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
      className="rounded-full border-black/10 bg-white hover:bg-muted text-xs md:text-sm"
      onClick={handleFollow}
      variant={event.isFollowing ? "secondary" : "outline"}
      size={"sm"}
    >
      {event.isFollowing ? "Siguiendo" : "Seguir"}
    </Button>
  )
}
