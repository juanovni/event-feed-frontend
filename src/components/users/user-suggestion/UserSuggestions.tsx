'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useFollow, useUserSuggestions } from "@/hooks";

export const UserSuggestions = () => {
  const { data, isLoading, isError } = useUserSuggestions();
  const { toggleFollow, isPending } = useFollow();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {/* <p className="font-semibold">Sugerencias para ti</p> */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-3 animate-pulse">
            <div className="w-10 h-10 bg-gray-200 rounded-full" />
            <div className="flex-1 h-3 bg-gray-200 rounded" />
            <div className="w-16 h-7 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (isError || !data) return <p>Error al cargar sugerencias</p>;

  return (
    <div className="space-y-3">
      {/* <p className="font-semibold">Sugerencias para ti</p> */}
      {data.map((user: any) => (
        <div key={user.id} className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src={user.avatar || "/default-avatar.png"}
              alt={user.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-900">{user.username}</p>
              <p className="text-xs text-gray-500">
                {user.followsYou ? "Te sigue" : ""}
              </p>
            </div>
          </div>
          <Button
            size="sm"
            variant={user.isFollowing ? "secondary" : "default"}
            disabled={isPending}
            onClick={() => toggleFollow(user.id)}
          >
            {user.isFollowing ? "Siguiendo" : "Seguir"}
          </Button>
        </div>
      ))}
    </div>
  );
};
