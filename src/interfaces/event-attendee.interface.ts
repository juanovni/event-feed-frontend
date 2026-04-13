export interface EventAttendee {
  id: string;
  name: string;
  username: string;
  lastName: string;
  avatar: string;
  isAttending: boolean;
  confirmedAt?: string | null;
}