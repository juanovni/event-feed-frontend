'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

const bottonLinks = [
  { label: 'Para ti', path: '/' },
  { label: 'Siguiendo', path: '/followers' }
];

export const HeaderButton = () => {
  const pathname = usePathname();

  return (
    <div className="w-full border-gray-200">
      <div className="flex w-full gap-4 justify-center md:justify-start">
        {bottonLinks.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.label}
              href={item.path}
              className={clsx(
                "flex-1 text-center py-3 text-sm font-medium relative transition",
                isActive
                  ? "text-black"
                  : "text-gray-400"
              )}
            >
              {item.label}

              {/* Indicador activo */}
              {isActive && (
                <span className="absolute bottom-0 left-1/4 w-1/2 h-1 bg-gray-800 rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};