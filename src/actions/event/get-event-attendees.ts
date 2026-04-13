import { eventApi } from "@/api/event.api";
import { EventAttendee } from "@/interfaces";

interface EventAttendeeResponse {
  id: string;
  user: string;
  username: string;
  lastName: string;
  avatar: string;
}

const mapAttendee = (attendee: EventAttendeeResponse): EventAttendee => {
  return {
    id: attendee.id,
    name: attendee.user,
    username: attendee.username,
    lastName: attendee.lastName,
    avatar: attendee.avatar,
    isAttending: true,
    confirmedAt: null,
  };
};

export const getEventAttendees = async (eventId: string): Promise<EventAttendee[]> => {
  const { data } = await eventApi.get<EventAttendeeResponse[]>(`/events/${eventId}/attendees`);

  return data.map(mapAttendee);
};