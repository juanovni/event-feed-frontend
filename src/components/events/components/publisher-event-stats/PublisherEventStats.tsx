'use client';

import { Event } from "@/interfaces";
import { Badge } from "@/components/ui/badge";
import { Users, ImageIcon, Heart } from "lucide-react";

interface Props {
  event: Event;
  totalPhotos: number;
}

export const PublisherEventStats = ({ event, totalPhotos }: Props) => {
  return (
    <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 rounded-b-2xl">
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="gap-1.5">
          <Heart className="h-3 w-3" />
          <span>{event.interested}</span>
          <span className="text-xs text-muted-foreground">interesados</span>
        </Badge>

        <Badge variant="outline" className="gap-1.5">
          <Users className="h-3 w-3" />
          <span>{event.attendees}</span>
          <span className="text-xs text-muted-foreground">confirmados</span>
        </Badge>

        {totalPhotos > 0 && (
          <Badge variant="outline" className="gap-1.5">
            <ImageIcon className="h-3 w-3" />
            <span>{totalPhotos}</span>
            <span className="text-xs text-muted-foreground">
              {totalPhotos === 1 ? "foto" : "fotos"}
            </span>
          </Badge>
        )}
      </div>
    </div>
  );
}
