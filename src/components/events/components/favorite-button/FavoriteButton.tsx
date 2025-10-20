'use client';

import { Bookmark } from "lucide-react";
import { Event } from "@/interfaces";
import { useFavoritesStore } from "@/store";
import { Button } from "@/components";
import { cn } from "@/lib/utils";

interface Props {
  event: Event;
}

export const FavoriteButton = ({
  event,
}: Props) => {
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const favorite = isFavorite(event.id);
  return (
    <Button
      onClick={() => toggleFavorite(event)}
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
