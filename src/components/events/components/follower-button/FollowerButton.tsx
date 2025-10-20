'use client';

import { Button } from "@/components";
import { useFollowStore } from "@/store";
import { UserPlus } from "lucide-react";

interface Props {
  userId: string;
}

export const FollowerButton = ({ userId }: Props) => {
  const { toggleFollow, isFollowing } = useFollowStore();
  const following = isFollowing(userId);

  return (
    <Button
      variant={following ? "secondary" : "outline"}
      size="sm"
      onClick={() => toggleFollow(userId)}
    >
      <UserPlus className="mr-1.5 h-4 w-4" />
      {following ? "Siguiendo" : "Seguir"}
    </Button>
  )
}
