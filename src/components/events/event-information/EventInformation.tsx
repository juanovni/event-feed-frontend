import { AvatarsFriendsWidget } from "@/components/ui/widgets/AvatarsFriendsWidget";
import { NavigationWidget } from "@/components/ui/widgets/NavigationWidget";
import { formatDate, formatTime } from "@/utils";
import { Calendar, DollarSign, Map, Users } from "lucide-react";
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
        <p className="mt-1.5 text-sm text-muted-foreground text-pretty">{event.description}</p>
      </div>
      <div className="text-sm space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Map size={16} className="h-4 w-4 shrink-0 text-blue-800 font-bold" />
          <span className="font-medium">{event.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar size={16} className="h-4 w-4 shrink-0 text-blue-800 font-bold" />
          <span className="font-medium">{formatDate(event.eventDate)}</span><span className="font-medium"> • {formatTime(event.eventDate)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <DollarSign size={16} className="h-4 w-4 shrink-0 text-blue-800 font-bold" />
          <p className="font-medium">
            {event.cost === 0 ? "Entrada gratuita" : `${event.cost} ${event.currency}`}
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Users size={16} className="h-4 w-4 shrink-0 text-blue-800 font-bold" />
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">{event.attendees}</span> asistirán •{" "}
            <span className="font-medium text-foreground">{event.interested}</span> interesados
          </p>
        </div>

        <AvatarsFriendsWidget />

      </div>

      <NavigationWidget distanceKm={distanceKm} />

    </div>
  )
}
