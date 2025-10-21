
import { mockTickets } from "@/data/mockData";
import { TicketGrid, TicketEmpty, Title } from "@/components";

export default function TicketsPage() {
  return (

    <div className="space-y-4">

      <Title title="Tickets">{''}</Title>

      <TicketGrid tickets={mockTickets} />

      {mockTickets.length === 0 && (
        <TicketEmpty/>
      )}

    </div>
  );
}