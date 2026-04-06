import { AvatarsFriendsWidget } from "@/components/ui/widgets/AvatarsFriendsWidget";
import { NavigationWidget } from "@/components/ui/widgets/NavigationWidget";
import { currencyFormat, formatDate, formatTime } from "@/utils";
import { Calendar, Clock, Heart, Map, Users } from "lucide-react";
import { Event } from "@/interfaces";
import { useAuthStore } from '@/store';
import { Badge } from "@/components/ui/badge";
import { PublisherBadge } from "../components/publisher-badge/PublisherBadge";

interface Props {
  event: Event;
}

export const EventInformation = ({ event }: Props) => {
  const { user } = useAuthStore();
  const distanceKm = 4;
  const isEventOwner = user?.id === event.user.id;

  return (
    <div className="mt-2 p-4">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-md md:text-xl font-bold text-balance flex-1">{event.title}</h2>
          {event.category && <Badge variant="secondary">{event.category}</Badge>}
        </div>
        {isEventOwner && <PublisherBadge isOwner={isEventOwner} />}
        <p className="whitespace-pre-line text-sm text-gray-700 mt-2">
          {event.description}
        </p>
      </div>
      <div className="text-sm space-y-2">
        <div className="flex items-center gap-2 text-smtext-muted-foreground">
          <Map size={18} className="shrink-0 text-primary font-bold" />
          <span className="font-medium">{event.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar size={18} className="shrink-0 text-primary font-bold" />
          <span className="font-medium">{formatDate(event.eventDate)}</span>
          <Clock size={18} className="shrink-0 text-primary font-bold" />
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

        <div className="flex items-center gap-2 text-sm mt-2">
          <div className="flex items-center gap-1">
            <Heart size={18} className="text-primary font-bold" />
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground">{event.interested}</span> interesados
            </p>
          </div>

          <div className="flex items-center gap-1">
            <Users size={18} className="text-primary font-bold" />
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground">{event.attendees}</span> confirmados
            </p>
          </div>
        </div>

        {user && (
          <AvatarsFriendsWidget eventId={event.id} />
        )}

      </div>

      {user && user?.role !== "publisher" && (
        <NavigationWidget distanceKm={distanceKm} />
      )}

    </div>
  )
}
