'use client';

import { Button } from "@/components";
import { useEventsStore } from "@/store";
import { ThumbsUp } from "lucide-react";
import { Event } from "@/interfaces";
import { cn } from "@/lib/utils";

interface Props {
  event: Event;
}

export const InterestedButton = ({ event }: Props) => {
  const { toggleInterested, isInterested } = useEventsStore();
  const interested = isInterested(event.id);

  return (
    <Button
      onClick={() => toggleInterested(event.id)}
      variant={interested ? "secondary" : "outline"}
    >
      <ThumbsUp
        className={cn("mr-2 h-4 w-4", interested && "fill-current")}
      />
      {interested ? "Interesado" : "Me interesa"}
    </Button>
  )
}
