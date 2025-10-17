'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components";

const bottonLinks: { label: string; path: string }[] = [
  {
    label: 'Para ti',
    path: '/'
  },
  {
    label: 'Siguiendo',
    path: '/followers'
  }
];

export const HeaderButton = () => {
  const pathname = usePathname();

  return (
    <>
      {bottonLinks.map(item => (
        <Button
          key={item.label}
          size="icon-lg"
          variant={`${pathname === item.path ? 'default' : 'outline'}`}
          className="rounded-full w-30"
        >
          <Link href={item.path}>{item.label}</Link>
        </Button>
      ))}
    </>
  )
}
