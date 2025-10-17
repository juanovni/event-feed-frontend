'use client';

import {
  Activity,
  Bell,
  HomeIcon,
  LogOut,
  Settings,
  TrendingUp,
  UserPlus
} from 'lucide-react';
import { SidebarItem } from './SidebarItem';
import { Avatar, AvatarFallback, AvatarImage } from '../avatar';
import { AvatarIcon, AvatarProfile } from '@/components';

export const Sidebar = () => {
  const user = true;
  const menuItems = [
    {
      label: 'Inicio',
      path: '/',
      icon: <HomeIcon />
    },
    /*     {
          label: 'Notificaciones',
          path: '/notifications',
          icon: <Bell />,
        },
        {
          label: 'Tendencias',
          path: '/trending',
          icon: <TrendingUp />
        }, */
    {
      label: 'Perfil',
      path: '/profile',
      icon: <UserPlus />
    },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 z-10">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
          <h1 className="text-xl font-bold text-gray-900">SocialHub</h1>
        </div>
      </div>

      {user && (
        <div className="border-b border-sidebar-border p-4">
          <AvatarProfile
            name="Juan Constantine"
            username='juanovni'
            image="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150"
            className='h-10 w-10'
          />
        </div>
      )}

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <SidebarItem key={item.path} {...item} />
          ))}
        </ul>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200">
            <Activity className="w-5 h-5" />
            <span className="font-medium">Crear Post</span>
          </button>
        </div>

        <div className="mt-4">
          <button
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
          >
            <Settings className='w-5 h-5' />
            <span className="font-medium">Configuración</span>
          </button>

          <button
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
