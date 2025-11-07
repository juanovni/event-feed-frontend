import { Calendar, Clock, MapPin, CreditCard } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Ticket } from '@/interfaces';
import { formatDate, formatTime } from '@/utils';

interface Props {
  ticket: Ticket;
}

export const TicketDetails = ({ ticket }: Props) => {
  return (
    <Card className="backdrop-blur-sm bg-gradient-to-br from-card/80 to-card/60 border-border/50">
      <CardHeader>
        <CardTitle className="text-lg">Detalles del ticketo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="font-medium text-foreground capitalize">
              {formatDate(ticket.event.eventDate)}
            </p>
            <p className="text-sm text-muted-foreground">Fecha del ticketo</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="font-medium text-foreground">{formatTime(ticket.event.eventDate)}</p>
            <p className="text-sm text-muted-foreground">Hora de inicio</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="font-medium text-foreground">{ticket.event.location}</p>
            <p className="text-sm text-muted-foreground">Ubicación del evento</p>
          </div>
        </div>

        {/*  {(ticket.section || ticket.seat) && (
          <div className="flex items-start gap-3">
            <Ticket className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-foreground">
                {ticket.section && `Sección: ${ticket.section}`}
                {ticket.section && ticket.seat && " • "}
                {ticket.seat && `Asiento: ${ticket.seat}`}
              </p>
              <p className="text-sm text-muted-foreground">Ubicación</p>
            </div>
          </div>
        )} */}

        <div className="flex items-start gap-3 pt-4 border-t border-border/50">
          <CreditCard className="w-5 h-5 text-primary mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Precio pagado</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ${ticket.total} {ticket.event.currency}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
