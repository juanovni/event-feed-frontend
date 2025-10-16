import { Event } from "@/interfaces";
import { FeedGridItem } from "./FeedGridItem";

interface Props {
  events: Event[];
}

export const FeedGrid = ({ events }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-10 mb-10">
      {events.map(event => (
        <FeedGridItem key={event.id} event={event} />
      ))}
    </div>
  )
}
