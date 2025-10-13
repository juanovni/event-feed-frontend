'use client';

import {
  IoCalendarOutline,
  IoHomeOutline,
  IoNotificationsOutline,
  IoPersonAddOutline,
  IoPulseOutline,
  IoSettingsOutline,
  IoTrendingUpOutline
} from 'react-icons/io5';

interface Props {
  activeSection: string;
  /* onSectionChange: (section: string) => void; */
  notificationCount: number;
}

export const Sidebar = ({ activeSection, notificationCount }: Props) => {

  const menuItems = [
    {
      id: 'feed',
      label: 'Inicio',
      icon: <IoHomeOutline />
    },
    {
      id: 'events',
      label: 'Eventos',
      icon: <IoCalendarOutline />
    },
    {
      id: 'notifications',
      label: 'Notificaciones',
      icon: <IoNotificationsOutline />,
      count: notificationCount
    },
    {
      id: 'trending',
      label: 'Tendencias',
      icon: <IoTrendingUpOutline />
    },
    {
      id: 'profile',
      label: 'Perfil',
      icon: <IoPersonAddOutline />
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

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                /* onClick={() => onSectionChange(item.id)} */
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeSection === item.id
                  ? 'bg-blue-50 text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
                {item.count && item.count > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.count}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200">
            <IoPulseOutline className="w-5 h-5" />
            <span className="font-medium">Crear Post</span>
          </button>
        </div>

        <div className="mt-4">
          <button
            /* onClick={() => onSectionChange('settings')} */
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
          >
            <IoSettingsOutline className='w-5 h-5' />
            <span className="font-medium">Configuración</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
