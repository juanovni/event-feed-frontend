import { TicketGridItem } from "@/components";
import { Ticket } from "@/interfaces";

interface Props {
  tickets: Ticket[];
}

export const TicketGrid = ({ tickets }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-10 mb-10">
      {tickets.map((ticket) => (
        <TicketGridItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  )
}
