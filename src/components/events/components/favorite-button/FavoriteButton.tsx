'use client';

import { Bookmark } from "lucide-react";
import { Event } from "@/interfaces";
import { useFavoritesStore } from "@/store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRequireAuth } from "@/hooks";

interface Props {
  event: Event;
}

export const FavoriteButton = ({
  event,
}: Props) => {
  const { requireAuth } = useRequireAuth();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const favorite = isFavorite(event.id);

  const handleClick = () => {
    requireAuth(
      () => {
        toggleFavorite(event)
      },
      {
        event,
        action: "FAVORITE",
      });
  };

  return (
    <Button
      onClick={handleClick}
      variant='outline'
      size="icon-lg"
      className={`p-2 rounded-full transition-all duration-200 ${favorite ? "text-black font-extrabold" : "fill-transparent"}`}
    >
      <Bookmark
        className={cn("h-4 w-4", favorite && "fill-current")}
      />
    </Button>
  );
};
