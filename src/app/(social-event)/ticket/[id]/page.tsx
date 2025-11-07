"use client";

import { TicketInstructions } from "../ui/TicketInstructions";
import { TicketQRCode } from "../ui/TicketQRCode";
import { useTicket } from "@/hooks";
import { TicketDetails } from "../ui/TicketDetails";
import { TicketEmpty } from "../ui/TicketEmpty";
import { TicketHeader } from "../ui/TicketHeader";
import { TicketSkeleton } from "../ui/TicketSkeleton";

interface Props {
  params: {
    id: string;
  };
}

export default function TicketPage({ params }: Props) {
  const { id } = params;
  const { data: ticket, isLoading, isError } = useTicket(id);

  if (isLoading) {
    return (
      <TicketSkeleton />
    );
  }

  if (isError) {
    return (
      <TicketEmpty />
    );
  }

  return (
    <div className="min-h-screen">
      <TicketHeader
        url={ticket.event.mediaUrl}
        title={ticket.event.title}
      />
      <div className="max-w-2xl mx-auto px-4 -mt-12 pb-8 space-y-4">
        <TicketQRCode ticket={ticket} />

        <TicketDetails ticket={ticket} />
        
        <TicketInstructions />
      </div>
    </div>
  );

}