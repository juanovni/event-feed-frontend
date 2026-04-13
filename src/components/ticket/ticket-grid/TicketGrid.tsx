import { TicketGridItem } from "@/components";
import { AccessPass } from "@/interfaces";

interface Props {
  tickets: AccessPass[];
}

export const TicketGrid = ({ tickets }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
      {tickets.map((ticket) => (
        <TicketGridItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  )
}
