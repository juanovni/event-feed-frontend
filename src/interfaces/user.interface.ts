export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isFollowing?: boolean;
  interests: string[];
  role: UserRole
}

export interface RegisterData {
  name: string;
  lastName: string;
  email: string;
  password: string;
  birthdate: string;
  gender: string;
  categories: string[]; // IDs
}

export type UserRole = "user" | "publisher" | "promoter";