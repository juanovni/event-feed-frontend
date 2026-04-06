"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Event } from "@/interfaces";
import { useRequireAuth, useToggleAttend } from "@/hooks";

interface Props {
  event: Event;
  totalCost: number;
  onRequirePayment?: () => void;
}

export const AttendButton = ({ event, totalCost, onRequirePayment }: Props) => {
  const { requireAuth } = useRequireAuth();
  const [assist, setAssist] = useState(event.isAttending ?? false);
  const { mutateAsync: attendEvent } = useToggleAttend();


  const handleAttend = async () => {
    requireAuth(
      async () => {
        if (totalCost === 0) {
          try {
            const resp = await attendEvent(event.id);
            if (resp.attending) setAssist(true);
          } catch (err) {
            console.error("Error al confirmar asistencia", err);
          }
        } else {
          if (!assist) {
            onRequirePayment?.();
          }
        }
      },
      {
        event,
        action: "JOIN",
      });


  };

  return (
    <Button
      onClick={handleAttend}
      variant={assist ? "secondary" : "outline"}
    >
      <Users className={cn("h-4 w-4", assist && "fill-current")} />
      <span className="hidden md:block">
        {assist ? "Confirmado" : "Asistiré"}
      </span>
    </Button>
  );
};