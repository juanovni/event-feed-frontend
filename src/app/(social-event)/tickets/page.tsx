"use client";

import { TicketGrid, TicketEmpty, Title } from "@/components";
import { useTickets } from "@/hooks";

export default function TicketsPage() {
  const { data: tickets, isLoading, isError } = useTickets();

  if (isLoading) return <p>Cargando tickets...</p>;
  if (isError) return <p>Error al cargar los tickets.</p>;

  return (

    <div className="space-y-4">

      <Title title="Tickets">{''}</Title>

      {tickets.length === 0 ? (
        <TicketEmpty />
      ) : (
        <TicketGrid tickets={tickets} />
      )}
    </div>
  );
}