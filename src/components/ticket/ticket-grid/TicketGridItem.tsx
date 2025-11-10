'use client';

import Image from "next/image";
import { redirect } from "next/navigation";
import { Calendar, Clock, CreditCard, Map, DollarSign, CheckCircle, Ticket as TickeIcon, Clock3 } from "lucide-react";
import { Ticket } from "@/interfaces";
import { formatDate, formatTime, getTicketStatus } from "@/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Props {
  ticket: Ticket;
}

export const TicketGridItem = ({ ticket }: Props) => {
  const status = getTicketStatus(ticket);

  const statusConfig = {
    redeemed: {
      label: "Canjeado",
      color: "bg-green-50 text-green-800 border-green-200",
      icon: <CheckCircle className="w-4 h-4 text-green-600" />,
    },
    pending: {
      label: "Por canjear",
      color: "bg-yellow-50 text-yellow-800 border-yellow-200",
      icon: <TickeIcon className="w-4 h-4 text-yellow-600" />,
    },
    upcoming: {
      label: "Próximo",
      color: "bg-blue-50 text-blue-800 border-blue-200",
      icon: <Clock3 className="w-4 h-4 text-blue-600" />,
    },
  }[status];

  return (
    <Card
      className="py-0 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-[var(--shadow-glow)] backdrop-blur-sm bg-gradient-to-br from-card/50 to-card/30 border-border/50"
      onClick={() => redirect(`/ticket/${ticket.id}`)}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          width={200}
          height={200}
          src={ticket.event.mediaUrl}
          alt={ticket.event.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/25 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-foreground line-clamp-2">{ticket.event.title}</h3>
        </div>

        <div className="absolute top-3 right-3 flex items-center gap-1">
          <Badge className={`${statusConfig.color} border px-2 py-1 text-xs font-medium`}>
            <div className="flex items-center gap-1">
              {statusConfig.icon}
              <span>{statusConfig.label}</span>
            </div>
          </Badge>
        </div>

      </div>

      <CardContent className="text-sm space-y-2 py-4">
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
            <CreditCard className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Ticket:</span>
            <span className="font-mono text-xs text-foreground">{ticket.ticketNumber}</span>
          </div>
          <div className="flex items-center gap-2 text-lg">
            <DollarSign size={16} className="h-4 w-4 shrink-0 text-primary font-bold" />
            <p className="font-semibold">
              {ticket.total === 0 ? "Entrada gratuita" : `${ticket.total} ${ticket.event.currency}`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
