"use client";

import { use, useMemo } from "react";
import { TicketInstructions } from "../ui/TicketInstructions";
import { TicketQRCode } from "../ui/TicketQRCode";
import { useEvents, useTicket } from "@/hooks";
import { TicketDetails } from "../ui/TicketDetails";
import { TicketEmpty } from "../ui/TicketEmpty";
import { TicketHeader } from "../ui/TicketHeader";
import { TicketSkeleton } from "../ui/TicketSkeleton";
import { findAccessPassById, isAttendanceAccessPassId } from "@/utils";

interface Props {
  params: Promise<{ id: string }>;
}

export default function TicketPage({ params }: Props) {
  const { id } = use(params);
  const isAttendancePass = isAttendanceAccessPassId(id);
  const { data: ticket, isLoading: isLoadingTicket, isError: isErrorTicket } = useTicket(id, !isAttendancePass);
  const shouldLoadEvents = isAttendancePass || isErrorTicket;
  const { data: events = [], isLoading: isLoadingEvents } = useEvents(undefined, shouldLoadEvents);

  const accessPass = useMemo(
    () => findAccessPassById(id, ticket ? [ticket] : [], events),
    [id, ticket, events]
  );

  const isLoading = (!isAttendancePass && isLoadingTicket) || (shouldLoadEvents && isLoadingEvents && !accessPass);

  if (isLoading) {
    return (
      <TicketSkeleton />
    );
  }

  if (!accessPass) {
    return (
      <TicketEmpty />
    );
  }

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-4 pt-8 pb-8 space-y-6">
      <TicketHeader event={accessPass.event} />
      <div className="space-y-4">
        <TicketQRCode ticket={accessPass} />

        <TicketInstructions />
      </div>
    </div>
  );

}
