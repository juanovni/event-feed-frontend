//'use client';

import { mockTickets } from "@/data/mockData";
import { TicketGrid, TicketEmpty, Title } from "@/components";
//import { useProtectedRoute } from "@/hooks";

export default function TicketsPage() {
  //useProtectedRoute();

  return (

    <div className="space-y-4">

      <Title title="Tickets">{''}</Title>

      <TicketGrid tickets={mockTickets} />

      {mockTickets.length === 0 && (
        <TicketEmpty />
      )}

    </div>
  );
}