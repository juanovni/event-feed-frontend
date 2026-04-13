import { Event } from "@/interfaces";
import { EventGridItem } from "./EventGridItem";

interface Props {
  events: Event[];
}

export const EventGrid = ({ events }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {events.map(event => (
        <EventGridItem key={event.id} event={event} />
      ))}
    </div>
  )
}
