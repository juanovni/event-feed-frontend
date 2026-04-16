'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  Bell,
  HomeIcon,
  LogOut,
  Plus,
  TicketCheckIcon,
  UserPlus
} from 'lucide-react';
import { SidebarItem } from './SidebarItem';
import { AvatarProfile, CreateEventDialog } from '@/components';
import { useAuthStore, useEventDialogStore, useEventsStore, useInterestStore } from '@/store';
import { Logo } from "../logo/Logo";
import Image from "next/image";

export const Sidebar = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, logout } = useAuthStore();
  const { openDialog, isOpen, closeDialog } = useEventDialogStore();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMobileOpen(false);
    // Limpia Zustand
    useEventsStore.getState().reset();
    useInterestStore.getState().reset();
    // Limpia cache de React Query
    queryClient.clear();
    router.replace('/auth/login');
  }

  if (!user) return null;

  const menuItems = [
    {
      label: 'Inicio',
      path: '/',
      icon: <HomeIcon />
    },
   /*  {
      label: 'Notificaciones',
      path: '/notifications',
      icon: <Bell />,
    }, */
    {
      label: 'Tickets',
      path: '/tickets',
      icon: <TicketCheckIcon />
    },
    {
      label: 'Perfil',
      path: `/profile/${user.id}`,
      icon: <UserPlus />
    },
  ];

  return (
    <>

      {/* BOTÓN HAMBURGUESA */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white border p-2 rounded-lg shadow"
      >
        ☰
      </button>

      {/* OVERLAY */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}


      <div
        className={`
      fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 z-50
      transform transition-transform duration-300
      ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
      md:translate-x-0
    `}
      >

        <div className="p-8 h-10 md:p-8 border-b border-gray-200">
          <Logo className="top-4.5 md:top-4 left-6 md:left-6" />
        </div>

        {user && (
          <div className="border-b border-sidebar-border p-4">
            <AvatarProfile
              userId={user.id}
              name={user.name}
              username={user.username}
              image={user.avatar || ''}
              className='h-10 w-10'
            />
          </div>
        )}

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.path}
                {...item}
                onClick={() => setIsMobileOpen(false)}
              />
            ))}
          </ul>

          {user.role === "publisher" && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={openDialog}
                className="w-full flex items-center space-x-3 px-4 py-3 cursor-pointer rounded-full bg-foreground hover:bg-foreground/90k text-white hover:bg-gray-800 transition-colors duration-200">
                <Plus className="w-5 h-5" />
                <span className="font-medium">Crear Evento</span>
              </button>
            </div>
          )}

          <div className="mt-4">
            <button
              onClick={handleLogout}
              className="cursor-pointer w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Cerrar Sesión</span>
            </button>
          </div>
        </nav>
        <CreateEventDialog open={isOpen} onOpenChange={closeDialog} />
      </div>

    </>

  )
}
