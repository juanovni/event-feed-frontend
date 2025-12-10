import { AvatarsFriendsWidget } from "@/components/ui/widgets/AvatarsFriendsWidget";
import { NavigationWidget } from "@/components/ui/widgets/NavigationWidget";
import { currencyFormat, formatDate, formatTime } from "@/utils";
import { Calendar, Clock, DollarSign, Map, Users } from "lucide-react";
import { Event } from "@/interfaces";

interface Props {
  event: Event;
}

export const EventInformation = ({ event }: Props) => {
  const distanceKm = 4;

  return (
    <div className="mt-2 p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-balance">{event.title}</h2>
        <p className="whitespace-pre-line text-sm text-gray-700">
          {event.description}
        </p>
      </div>
      <div className="text-sm space-y-2">
        <div className="flex items-center gap-2 text-smtext-muted-foreground">
          <Map size={16} className="h-4 w-4 shrink-0 text-primary font-bold" />
          <span className="font-medium">{event.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar size={16} className="h-4 w-4 shrink-0 text-primary font-bold" />
          <span className="font-medium">{formatDate(event.eventDate)}</span>
          <Clock className="w-4 h-4 text-primary font-bold" />
          <span className="font-medium">{formatTime(event.eventDate)}</span>
        </div>

        <div className="flex items-start gap-2 text-sm">
          {/* Evento gratuito */}
          {event.cost === 0 && (!event.eventTicketTypes || event.eventTicketTypes.length === 0) && (
            <p className="font-medium">Entrada gratuita</p>
          )}

          {/* Un solo tipo de ticket */}
          {event.eventTicketTypes && event.eventTicketTypes.length === 1 && (
            <div className="flex flex-col">
              <span className="font-medium">
               ${currencyFormat(event.eventTicketTypes[0].price)} {event.currency}
              </span>
              <span className="text-xs text-muted-foreground">
                {event.eventTicketTypes[0].name}
              </span>
            </div>
          )}

          {/* Múltiples tipos de tickets */}
          {event.eventTicketTypes && event.eventTicketTypes.length > 1 && (
            <div className="flex flex-col">
              <span className="font-medium">
                Precios Desde{" "}
                ${currencyFormat(
                  Math.min(...event.eventTicketTypes.map((t) => t.price))
                )}{" "}
                {event.currency}
              </span>

              <ul className="text-xs text-muted-foreground space-y-1 mt-1">
                {event.eventTicketTypes.map((ticket) => (
                  <li key={ticket.id}>
                    <span className="font-medium text-foreground">{ticket.name}:</span>{" "}
                    ${currencyFormat(ticket.price)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Users size={16} className="h-4 w-4 shrink-0 text-primary font-bold" />
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">{event.interested}</span> interesados •{" "}
            <span className="font-medium text-foreground">{event.attendees}</span> asistirán
          </p>
        </div>

        <AvatarsFriendsWidget eventId={event.id} />

      </div>

      {/* <NavigationWidget distanceKm={distanceKm} /> */}

    </div>
  )
}
