import { Comment } from "./comment.interface";
import { User } from "./user.interface";

export interface Event {
  id: string;
  user: User;
  title: string;
  description: string;
  mediaType: MediaType;
  mediaUrl: string;
  cost: number;
  currency: string;
  comments: Comment[];
  gallery?: string[];
  location: string;
  eventDate: Date;
  timestamp: Date;
  category?: EventCategory;
  attendees: number;
  interested: number;
  isFollowing: boolean;
  isInterested: boolean;
  isAttending: boolean;
  hasPaid: boolean;
  userStatus: UserStatus;
  eventTicketTypes: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    validUntil: string | null;
  }[];
}
export type UserStatus = 'attending' | 'interested' | 'none';
export type EventCategory =
  | "restaurant"
  | "music"
  | "bar"
  | "discotheque"
  | "sports"
  | "art"
  | "theater"
  | "technology"
  | "fashion"
  | "networking"
  | "festival"
  | "food"
  | "cinema"
  | "education"
  | "wellness";

export type MediaType = 'image' | 'video';