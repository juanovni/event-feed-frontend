import { User } from "./user.interface";

export interface Comment {
  id: string;
  user: User;
  content: string;
  timestamp: Date;
  likes: number;
  replies?: Comment[];
  //eventId: string;
}