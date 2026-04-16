'use client';

import { use } from "react";
import { ProfileView } from "@/components";
import { useAuthStore } from "@/store/auth/authStore";
import { useUserById } from "@/hooks";

interface Props {
  params: Promise<{ id: string }>;
}

export function ProfileByIdPageContent({ params }: Props) {
  const { id } = use(params);
  const authUser = useAuthStore((state) => state.user);
  const isOwnProfile = authUser?.id === id;
  const { data: user, isLoading, isError } = useUserById(id);

  if (isOwnProfile && authUser) {
    return <ProfileView profile={authUser} isOwnProfile />;
  }

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-6xl px-2 py-6 md:px-0">
        <div className="space-y-6">
          <div className="h-64 animate-pulse rounded-2xl border border-gray-100 bg-white" />
          <div className="h-40 animate-pulse rounded-2xl border border-gray-100 bg-white" />
        </div>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl items-center justify-center px-4 py-16 text-center sm:px-6">
        <section className="space-y-3 rounded-[28px] border border-black/8 bg-white/80 px-8 py-10 shadow-[0_30px_90px_-45px_rgba(15,23,42,0.45)] backdrop-blur-sm">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Perfil no disponible
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            No fue posible cargar este perfil
          </h1>
          <p className="max-w-xl text-sm text-muted-foreground">
            Verifica el enlace o intenta nuevamente en unos minutos.
          </p>
        </section>
      </div>
    );
  }

  return <ProfileView profile={user} />;
}
