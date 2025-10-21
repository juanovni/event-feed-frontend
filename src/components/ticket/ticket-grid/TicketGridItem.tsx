'use client';

import { redirect } from "next/navigation";
import { Calendar, MapPin, Clock, CreditCard, Map, DollarSign } from "lucide-react";
import { Ticket } from "@/interfaces";
import { formatDate, formatTime } from "@/utils";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  ticket: Ticket;
}

export const TicketGridItem = ({ ticket }: Props) => {
  return (
    <Card
      className="overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-[var(--shadow-glow)] backdrop-blur-sm bg-gradient-to-br from-card/50 to-card/30 border-border/50"
      onClick={() => redirect(`/ticket/${ticket.id}`)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={ticket.event.mediaUrl}
          alt={ticket.event.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/25 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-foreground line-clamp-2">{ticket.event.title}</h3>
        </div>
      </div>

      <CardContent className="text-sm space-y-2">
        <div className="flex items-center gap-2 text-smtext-muted-foreground">
          <Map size={16} className="h-4 w-4 shrink-0 text-primary font-bold" />
          <span className="font-medium">{ticket.event.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 text-primary" />
          <span>{formatDate(ticket.event.eventDate)}</span>
          <Clock className="w-4 h-4 text-primary" />
          <span>{formatTime(ticket.event.eventDate)}</span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-2 text-sm">
            <CreditCard className="w-4 h-4 text-accent" />
            <span className="text-muted-foreground">Ticket:</span>
            <span className="font-mono text-xs text-foreground">{ticket.ticketNumber}</span>
          </div>
          <div className="flex items-center gap-2 text-lg">
            <DollarSign size={16} className="h-4 w-4 shrink-0 text-primary font-bold" />
            <p className="font-semibold">
              {ticket.cost === 0 ? "Entrada gratuita" : `${ticket.cost} ${ticket.event.currency}`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
