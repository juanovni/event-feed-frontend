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

export interface UpdateUserPayload {
  name: string;
  lastName: string;
  username: string;
  description?: string;
  gender: string;
  birthdate: string;
  location?: string;
  phone?: string;
  avatar: string;
  categories: (string | number)[];
  avatarFile?: File | null;
}

export type UserRole = "user" | "publisher" | "promoter";