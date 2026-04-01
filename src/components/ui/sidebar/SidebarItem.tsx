'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation';

interface Props {
  label: string;
  path: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export const SidebarItem = ({ label, icon, path, onClick }: Props) => {
  const currentPath = usePathname();
  return (
    <li>
      <Link
        href={path}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${currentPath === path
          ? 'text-black bg-gray-100'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        onClick={onClick}
      >
        {icon}
        <span className="font-bold">{label}</span>
        {/* {item.count && item.count > 0 && (
          <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {item.count}
          </span>
        )} */}
      </Link>
    </li>
  )
}
