"use client";

import { ProfileView } from "@/components";
import { useAuthStore } from "@/store/auth/authStore";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return <ProfileView profile={user} isOwnProfile />;
}
