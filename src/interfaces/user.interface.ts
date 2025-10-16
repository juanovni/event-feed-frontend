export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isFollowing?: boolean;
  interests: string[];
  role: UserRole
}

export type UserRole = "user" | "publisher" | "promoter";