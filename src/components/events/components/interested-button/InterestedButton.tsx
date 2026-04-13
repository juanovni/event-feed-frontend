'use client';

import { useInterestStore } from "@/store";
import { ThumbsUp } from "lucide-react";
import { Event } from "@/interfaces";
import { cn } from "@/lib/utils";
import { useRequireAuth, useToggleInterest } from "@/hooks";
import { Button } from "@/components/ui/button";

interface Props {
  event: Event;
}

export const InterestedButton = ({ event }: Props) => {
  const { requireAuth } = useRequireAuth();
  const { mutate: toggleInterest } = useToggleInterest();
  const { toggleLocalInterest } = useInterestStore();

  const handleClick = () => {
    requireAuth(
      () => {
        toggleLocalInterest(event.id);
        toggleInterest(event.id);
      },
      {
        event,
        action: "INTEREST",
      });
  };

  return (
    <Button
      onClick={handleClick}
      className="h-11 rounded-full border-black/10 bg-white hover:bg-muted"
      variant={event.isInterested ? "secondary" : "outline"}
    >
      <ThumbsUp
        className={cn("h-4 w-4", event.isInterested && "fill-current")}
      />
      <span>{event.isInterested ? "Interesado" : "Me interesa"}</span>
    </Button>
  )
}
