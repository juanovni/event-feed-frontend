export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isFollowing?: boolean;
  interests: string[];
}