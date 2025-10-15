import { Comment } from "./comment.interface";
import { User } from "./user.interface";

export interface Post {
  id: string;
  user: User;
  title: string;
  content: string;
  mediaType: MediaType;
  mediaUrl: string;
  likes: number;
  isLiked: boolean;
  cost: number;
  currency: string;
  comments: Comment[];
  gallery?: string[];
  location: string;
  eventDate: Date;
  timestamp: Date;
}

export type MediaType = 'image' | 'video';