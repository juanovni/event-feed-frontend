import { Comment } from "./comment.interface";
import { User } from "./user.interface";

export interface Post {
  id: string;
  user: User;
  content: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  likes: number;
  isLiked: boolean;
  comments: Comment[];
  timestamp: Date;
}