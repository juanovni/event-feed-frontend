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
  const localInterest = useInterestStore((state) => state.interestOverrides[event.id]);
  const { setLocalInterest } = useInterestStore();
  const isInterested = localInterest ?? event.isInterested;

  const handleClick = () => {
    const previousValue = isInterested;
    const nextValue = !isInterested;

    requireAuth(
      async () => {
        setLocalInterest(event.id, nextValue);
        toggleInterest(event.id, {
          onError: () => {
            setLocalInterest(event.id, previousValue);
          },
        });
      },
      {
        event,
        action: "INTEREST",
        redirectTo: `/p/${event.slug}`,
      });
  };

  return (
    <Button
      onClick={handleClick}
      className="h-11 rounded-full border-black/10 bg-white hover:bg-muted"
      variant={isInterested ? "secondary" : "outline"}
    >
      <ThumbsUp
        className={cn("h-4 w-4", isInterested && "fill-current")}
      />
      <span>{isInterested ? "Interesado" : "Me interesa"}</span>
    </Button>
  )
}
