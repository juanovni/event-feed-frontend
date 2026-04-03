'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Si no hay usuario autenticado, redirigir al login
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  // Si no hay usuario, no renderizar nada (evita flash de contenido)
  if (!user) {
    return null;
  }

  // Si hay usuario, renderizar el contenido
  return <>{children}</>;
};