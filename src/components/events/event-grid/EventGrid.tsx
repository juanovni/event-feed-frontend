import { Event } from "@/interfaces";
import { EventGridItem } from "./EventGridItem";

interface Props {
  events: Event[];
  distances?: Record<string, number>;
}

export const EventGrid = ({ events, distances }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {events.map(event => (
        <EventGridItem key={event.id} event={event} distanceKm={distances?.[event.id]} />
      ))}
    </div>
  )
}
