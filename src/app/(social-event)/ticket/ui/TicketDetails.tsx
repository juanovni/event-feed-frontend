import { Calendar, CheckCircle2, Clock, CreditCard, MapPin } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { AccessPass } from '@/interfaces';
import { formatDate, formatTime } from '@/utils';

interface Props {
  ticket: AccessPass;
}

export const TicketDetails = ({ ticket }: Props) => {
  const isAttendancePass = ticket.source === "attendance";

  return (
    <Card className="backdrop-blur-sm bg-gradient-to-br from-card/80 to-card/60 border-border/50">
      <CardHeader>
        <CardTitle className="text-lg">{isAttendancePass ? "Detalles del acceso" : "Detalles del ticket"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="font-medium text-foreground capitalize">
              {formatDate(ticket.event.eventDate)}
            </p>
            <p className="text-sm text-muted-foreground">Fecha del evento</p>
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

        <div className="flex items-start gap-3 pt-4 border-t border-border/50">
          {isAttendancePass ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" />
          ) : (
            <CreditCard className="w-5 h-5 text-primary mt-0.5" />
          )}
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">
              {isAttendancePass ? "Estado del acceso" : "Precio pagado"}
            </p>
            {isAttendancePass ? (
              <p className="text-2xl font-bold text-emerald-700">Asistencia confirmada</p>
            ) : (
              <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ${ticket.total} {ticket.event.currency}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
