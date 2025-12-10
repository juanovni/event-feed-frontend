'use client';

import { useInterestStore } from "@/store";
import { ThumbsUp } from "lucide-react";
import { Event } from "@/interfaces";
import { cn } from "@/lib/utils";
import { useToggleInterest } from "@/hooks";
import { Button } from "@/components/ui/button";

interface Props {
  event: Event;
}

export const InterestedButton = ({ event }: Props) => {
  const { mutate: toggleInterest } = useToggleInterest();
  const { toggleLocalInterest } = useInterestStore();

  const handleClick = () => {
    toggleLocalInterest(event.id);
    toggleInterest(event.id);
  };

  return (
    <Button
      onClick={handleClick}
      variant={event.isInterested ? "secondary" : "outline"}
    >
      <ThumbsUp
        className={cn("h-4 w-4", event.isInterested && "fill-current")}
      />
      {event.isInterested ? "Interesado" : "Me interesa"}
    </Button>
  )
}
